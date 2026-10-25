namespace CatalogoCursos.Api.Models;

/// <summary>Curso do catálogo CTED (somente leitura pela API).</summary>
public class Curso
{
    public int Id { get; set; }
    public string NomeCompleto { get; set; } = string.Empty;
    public string NomeBreve { get; set; } = string.Empty;
    public string Descricao { get; set; } = string.Empty;
    public string Categoria { get; set; } = string.Empty;
    public string Modalidade { get; set; } = string.Empty;
    /// <summary>Carga horária em horas.</summary>
    public int CargaHoraria { get; set; }
    public string PublicoAlvo { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    /// <summary>Caminho público da imagem (servida em /assets).</summary>
    public string ImagemApresentacao { get; set; } = string.Empty;
    public DateOnly DataDisponibilizacao { get; set; }
}
