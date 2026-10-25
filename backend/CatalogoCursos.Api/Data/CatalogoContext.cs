using CatalogoCursos.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace CatalogoCursos.Api.Data;

public class CatalogoContext(DbContextOptions<CatalogoContext> options) : DbContext(options)
{
    public DbSet<Curso> Cursos => Set<Curso>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        var curso = modelBuilder.Entity<Curso>();
        curso.ToTable("Cursos");
        curso.Property(c => c.NomeCompleto).HasMaxLength(200).IsRequired();
        curso.Property(c => c.NomeBreve).HasMaxLength(80).IsRequired();
        curso.Property(c => c.Descricao).HasMaxLength(2000).IsRequired();
        curso.Property(c => c.Categoria).HasMaxLength(60).IsRequired();
        curso.Property(c => c.Modalidade).HasMaxLength(30).IsRequired();
        curso.Property(c => c.PublicoAlvo).HasMaxLength(200).IsRequired();
        curso.Property(c => c.Status).HasMaxLength(30).IsRequired();
        curso.Property(c => c.ImagemApresentacao).HasMaxLength(300).IsRequired();
        curso.HasIndex(c => c.Categoria);
        curso.HasIndex(c => c.Modalidade);
        curso.HasIndex(c => c.Status);

        curso.HasData(SeedData.Cursos);
    }
}
