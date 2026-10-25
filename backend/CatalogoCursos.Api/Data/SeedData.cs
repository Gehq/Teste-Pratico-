using CatalogoCursos.Api.Models;

namespace CatalogoCursos.Api.Data;

/// <summary>
/// Dados fictícios: 8 cursos, 4 categorias, 3 modalidades, 3 status,
/// cargas horárias de 20h a 160h e públicos-alvo variados.
/// </summary>
public static class SeedData
{
    public static readonly Curso[] Cursos =
    [
        new()
        {
            Id = 1,
            NomeCompleto = "Matemática Aplicada à Indústria 4.0",
            NomeBreve = "Matemática 4.0",
            Descricao = "Explore conceitos de estatística, funções e modelagem matemática aplicados a processos produtivos, controle de qualidade e análise de dados industriais.",
            Categoria = "Matemática",
            Modalidade = "EAD",
            CargaHoraria = 40,
            PublicoAlvo = "Estudantes do Ensino Médio",
            Status = "Inscrições abertas",
            ImagemApresentacao = "/assets/hero-image.png",
            DataDisponibilizacao = new DateOnly(2026, 3, 2)
        },
        new()
        {
            Id = 2,
            NomeCompleto = "Raciocínio Lógico e Resolução de Problemas",
            NomeBreve = "Raciocínio Lógico",
            Descricao = "Desenvolva o pensamento lógico-matemático por meio de desafios práticos, problemas abertos e situações reais do ambiente de trabalho.",
            Categoria = "Matemática",
            Modalidade = "Presencial",
            CargaHoraria = 60,
            PublicoAlvo = "Jovens aprendizes",
            Status = "Em breve",
            ImagemApresentacao = "/assets/banner-ava.png",
            DataDisponibilizacao = new DateOnly(2026, 11, 16)
        },
        new()
        {
            Id = 3,
            NomeCompleto = "Comunicação e Redação Técnica Profissional",
            NomeBreve = "Redação Técnica",
            Descricao = "Aprenda a produzir relatórios, e-mails corporativos e documentação técnica com clareza, coesão e adequação à norma-padrão da língua portuguesa.",
            Categoria = "Linguagens",
            Modalidade = "EAD",
            CargaHoraria = 30,
            PublicoAlvo = "Trabalhadores da indústria",
            Status = "Inscrições abertas",
            ImagemApresentacao = "/assets/video-thumb.png",
            DataDisponibilizacao = new DateOnly(2026, 2, 9)
        },
        new()
        {
            Id = 4,
            NomeCompleto = "Inglês Instrumental para o Ambiente Industrial",
            NomeBreve = "Inglês Instrumental",
            Descricao = "Leitura e interpretação de manuais, normas e catálogos técnicos em inglês, com foco no vocabulário da indústria.",
            Categoria = "Linguagens",
            Modalidade = "Híbrido",
            CargaHoraria = 80,
            PublicoAlvo = "Profissionais técnicos",
            Status = "Encerrado",
            ImagemApresentacao = "/assets/banner-ava.png",
            DataDisponibilizacao = new DateOnly(2025, 8, 4)
        },
        new()
        {
            Id = 5,
            NomeCompleto = "Química e Física dos Materiais Industriais",
            NomeBreve = "Ciência dos Materiais",
            Descricao = "Entenda as propriedades químicas e físicas de metais, polímeros e cerâmicas e como elas influenciam a escolha de materiais na produção.",
            Categoria = "Ciências da Natureza",
            Modalidade = "Presencial",
            CargaHoraria = 120,
            PublicoAlvo = "Estudantes do Ensino Médio",
            Status = "Inscrições abertas",
            ImagemApresentacao = "/assets/hero-image.png",
            DataDisponibilizacao = new DateOnly(2026, 4, 6)
        },
        new()
        {
            Id = 6,
            NomeCompleto = "Biotecnologia e Inovação na Indústria",
            NomeBreve = "Biotecnologia",
            Descricao = "Introdução às aplicações da biotecnologia em alimentos, fármacos e bioprocessos, com estudos de caso de inovação industrial.",
            Categoria = "Ciências da Natureza",
            Modalidade = "EAD",
            CargaHoraria = 20,
            PublicoAlvo = "Educadores",
            Status = "Em breve",
            ImagemApresentacao = "/assets/video-thumb.png",
            DataDisponibilizacao = new DateOnly(2026, 12, 1)
        },
        new()
        {
            Id = 7,
            NomeCompleto = "Gestão Ambiental e Economia Circular",
            NomeBreve = "Economia Circular",
            Descricao = "Práticas de gestão de resíduos, eficiência energética e economia circular para tornar a produção industrial mais sustentável.",
            Categoria = "Sustentabilidade",
            Modalidade = "Híbrido",
            CargaHoraria = 160,
            PublicoAlvo = "Gestores e líderes de equipe",
            Status = "Inscrições abertas",
            ImagemApresentacao = "/assets/banner-ava.png",
            DataDisponibilizacao = new DateOnly(2026, 5, 11)
        },
        new()
        {
            Id = 8,
            NomeCompleto = "Sustentabilidade e ESG no Dia a Dia da Fábrica",
            NomeBreve = "ESG na Fábrica",
            Descricao = "Conceitos de ESG (ambiental, social e governança) traduzidos em ações práticas para o chão de fábrica.",
            Categoria = "Sustentabilidade",
            Modalidade = "EAD",
            CargaHoraria = 24,
            PublicoAlvo = "Trabalhadores da indústria",
            Status = "Encerrado",
            ImagemApresentacao = "/assets/hero-image.png",
            DataDisponibilizacao = new DateOnly(2025, 6, 2)
        }
    ];
}
