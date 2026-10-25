using System.Globalization;
using System.Text;
using CatalogoCursos.Api.Data;
using CatalogoCursos.Api.Models;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<CatalogoContext>(opt =>
    opt.UseMySql(builder.Configuration.GetConnectionString("Catalogo"),
        new MySqlServerVersion(new Version(8, 0, 0)),
        mysql => mysql.EnableRetryOnFailure(3)));

builder.Services.AddCors(o => o.AddDefaultPolicy(p =>
    p.WithOrigins(builder.Configuration.GetSection("Cors:Origins").Get<string[]>() ?? [])
     .AllowAnyHeader()
     .WithMethods("GET")));

builder.Services.AddProblemDetails();

var app = builder.Build();

// Cria o banco e aplica o seed na primeira execução.
using (var scope = app.Services.CreateScope())
{
    try
    {
        scope.ServiceProvider.GetRequiredService<CatalogoContext>().Database.EnsureCreated();
    }
    catch (Exception ex)
    {
        // A API continua no ar e as rotas respondem 503 até o banco voltar.
        app.Logger.LogError(ex, "Falha ao inicializar o banco de dados.");
    }
}

// Qualquer falha não tratada (ex.: banco indisponível) vira um ProblemDetails JSON.
app.UseExceptionHandler(errorApp => errorApp.Run(async ctx =>
{
    var ex = ctx.Features.Get<IExceptionHandlerFeature>()?.Error;
    var isDb = ex is MySqlConnector.MySqlException or DbUpdateException or InvalidOperationException;
    app.Logger.LogError(ex, "Erro ao processar {Path}", ctx.Request.Path);
    ctx.Response.StatusCode = isDb ? StatusCodes.Status503ServiceUnavailable : StatusCodes.Status500InternalServerError;
    await Results.Problem(
        title: isDb ? "Banco de dados indisponível" : "Erro interno",
        detail: "Não foi possível carregar os cursos no momento. Tente novamente em instantes.",
        statusCode: ctx.Response.StatusCode).ExecuteAsync(ctx);
}));

app.UseCors();

// ---- Arquivos estáticos: front-end, imagens/ícones e fontes do protótipo Figma ----
var root = app.Environment.ContentRootPath;
string Resolve(string key) => Path.GetFullPath(Path.Combine(root, app.Configuration[key]!));

var frontendPath = Resolve("Paths:Frontend");
var assetsPath = Resolve("Paths:Assets");

// Build do React (frontend/dist). Em desenvolvimento use `npm run dev` (porta 5173).
if (Directory.Exists(frontendPath))
{
    app.UseDefaultFiles(new DefaultFilesOptions { FileProvider = new PhysicalFileProvider(frontendPath) });
    app.UseStaticFiles(new StaticFileOptions { FileProvider = new PhysicalFileProvider(frontendPath) });
}
else
{
    app.Logger.LogWarning("Build do front-end não encontrado em {Path}. Rode 'npm run build' em frontend/.", frontendPath);
}
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(assetsPath),
    RequestPath = "/assets",
    OnPrepareResponse = c => c.Context.Response.Headers.CacheControl = "public,max-age=86400"
});

// ---- Endpoints (somente leitura) ----
var api = app.MapGroup("/api");

api.MapGet("/cursos", async (CatalogoContext db, string? busca, string? categoria, string? modalidade, string? status) =>
{
    var query = db.Cursos.AsNoTracking();
    if (!string.IsNullOrWhiteSpace(categoria)) query = query.Where(c => c.Categoria == categoria);
    if (!string.IsNullOrWhiteSpace(modalidade)) query = query.Where(c => c.Modalidade == modalidade);
    if (!string.IsNullOrWhiteSpace(status)) query = query.Where(c => c.Status == status);

    var cursos = await query.OrderBy(c => c.NomeCompleto).ToListAsync();

    // Busca por nome insensível a maiúsculas e acentos (independe da collation do banco).
    if (!string.IsNullOrWhiteSpace(busca))
    {
        var termo = Normalizar(busca);
        cursos = cursos.Where(c => Normalizar(c.NomeCompleto).Contains(termo) || Normalizar(c.NomeBreve).Contains(termo)).ToList();
    }

    return Results.Ok(new { total = cursos.Count, itens = cursos });
})
.WithName("ListarCursos");

api.MapGet("/cursos/{id:int}", async (int id, CatalogoContext db) =>
    await db.Cursos.AsNoTracking().FirstOrDefaultAsync(c => c.Id == id) is Curso curso
        ? Results.Ok(curso)
        : Results.Problem(title: "Curso não encontrado", statusCode: 404))
.WithName("ObterCurso");

api.MapGet("/filtros", async (CatalogoContext db) => Results.Ok(new
{
    categorias = await db.Cursos.Select(c => c.Categoria).Distinct().OrderBy(x => x).ToListAsync(),
    modalidades = await db.Cursos.Select(c => c.Modalidade).Distinct().OrderBy(x => x).ToListAsync(),
    status = await db.Cursos.Select(c => c.Status).Distinct().OrderBy(x => x).ToListAsync()
}))
.WithName("ListarFiltros");

api.MapGet("/health", async (CatalogoContext db) =>
    await db.Database.CanConnectAsync() && await db.Cursos.AnyAsync()
        ? Results.Ok(new { status = "ok" })
        : Results.Problem(title: "Banco de dados indisponível", statusCode: 503));

app.Run();

static string Normalizar(string texto)
{
    var decomposto = texto.Trim().ToLowerInvariant().Normalize(NormalizationForm.FormD);
    var sb = new StringBuilder(decomposto.Length);
    foreach (var ch in decomposto)
        if (CharUnicodeInfo.GetUnicodeCategory(ch) != UnicodeCategory.NonSpacingMark) sb.Append(ch);
    return sb.ToString().Normalize(NormalizationForm.FormC);
}
