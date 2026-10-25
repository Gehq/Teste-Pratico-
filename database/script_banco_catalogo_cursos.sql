-- ==============================================================================
-- PROCESSO SELETIVO - DESENVOLVEDOR DE SISTEMAS I (SESI / CTED)
-- Script de Criação e População do Banco de Dados: catalogo_cursos (MySQL 8)
-- ==============================================================================

CREATE DATABASE IF NOT EXISTS `catalogo_cursos`
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `catalogo_cursos`;

-- ------------------------------------------------------------------------------
-- Tabela: Cursos
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `Cursos` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `NomeCompleto` VARCHAR(200) NOT NULL,
  `NomeBreve` VARCHAR(80) NOT NULL,
  `Descricao` VARCHAR(2000) NOT NULL,
  `Categoria` VARCHAR(60) NOT NULL,
  `Modalidade` VARCHAR(30) NOT NULL,
  `CargaHoraria` INT NOT NULL,
  `PublicoAlvo` VARCHAR(200) NOT NULL,
  `Status` VARCHAR(30) NOT NULL,
  `ImagemApresentacao` VARCHAR(300) NOT NULL,
  `DataDisponibilizacao` DATE NOT NULL,
  PRIMARY KEY (`Id`),
  INDEX `IX_Cursos_Categoria` (`Categoria`),
  INDEX `IX_Cursos_Modalidade` (`Modalidade`),
  INDEX `IX_Cursos_Status` (`Status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- Carga Inicial (Seed Data - 8 Cursos Fictícios)
-- ------------------------------------------------------------------------------
INSERT INTO `Cursos` (`Id`, `NomeCompleto`, `NomeBreve`, `Descricao`, `Categoria`, `Modalidade`, `CargaHoraria`, `PublicoAlvo`, `Status`, `ImagemApresentacao`, `DataDisponibilizacao`)
VALUES
  (1, 'Matemática Aplicada à Indústria 4.0', 'Matemática 4.0',
   'Explore conceitos de estatística, funções e matrizes aplicados à otimização de linhas de produção e análise preditiva de processos industriais.',
   'Matemática', 'EAD', 40, 'Trabalhadores da indústria e estudantes do ensino médio/técnico',
   'Inscrições abertas', '/assets/hero-image.png', '2026-03-01'),

  (2, 'Fundamentos de Álgebra Linear para Manufatura Avançada', 'Álgebra Linear Industrial',
   'Compreenda transformações lineares, cálculo matricial e sistemas lineares aplicados a braços robóticos e modelagem geométrica na indústria.',
   'Matemática', 'Híbrido', 60, 'Operadores de máquinas, projetistas e técnicos industriais',
   'Em breve', '/assets/hero-image.png', '2026-05-15'),

  (3, 'Comunicação Técnica e Escrita Assertiva na Indústria', 'Comunicação Técnica',
   'Desenvolva competências de redação técnica, elaboração de relatórios industriais e apresentação assertiva de indicadores para equipes multidisciplinares.',
   'Linguagens', 'EAD', 30, 'Supervisores, técnicos e colaboradores em geral da indústria',
   'Inscrições abertas', '/assets/hero-image.png', '2026-02-10'),

  (4, 'Inglês Técnico para Manutenção e Operações Globais', 'Inglês Técnico Industrial',
   'Aprenda vocabulário especializado para leitura de manuais, diagramas elétricos e procedimentos operacionais padrão no chão de fábrica moderno.',
   'Linguagens', 'Presencial', 80, 'Eletricistas, mecânicos de manutenção e operadores de processos',
   'Inscrições abertas', '/assets/hero-image.png', '2026-01-20'),

  (5, 'Termodinâmica e Eficiência Energética Industrial', 'Eficiência Energética',
   'Estudo dos princípios termodinâmicos voltados à redução de perdas de calor, cogeração de energia e operação eficiente de caldeiras e compressores.',
   'Ciências da Natureza', 'Presencial', 120, 'Engenheiros juniores, gestores de utilidades e técnicos em eletromecânica',
   'Encerrado', '/assets/hero-image.png', '2025-08-01'),

  (6, 'Biotecnologia e Inovação na Indústria Química e de Alimentos', 'Biotecnologia',
   'Introdução às aplicações da biotecnologia em fermentação, biocombustíveis e reaproveitamento de coprodutos agroindustriais com foco em sustentabilidade.',
   'Ciências da Natureza', 'Híbrido', 90, 'Pesquisadores de laboratório, analistas de controle de qualidade e estudantes de bioprocessos',
   'Inscrições abertas', '/assets/hero-image.png', '2026-04-05'),

  (7, 'Economia Circular e Gestão de Resíduos na Indústria', 'Economia Circular',
   'Capacitação prática em análise do ciclo de vida, logística reversa de embalagens e transformação de passivos ambientais em oportunidades de negócio.',
   'Sustentabilidade', 'Presencial', 160, 'Gerentes de planta, analistas ambientais e líderes de sustentabilidade',
   'Inscrições abertas', '/assets/hero-image.png', '2026-02-01'),

  (8, 'Sustentabilidade e ESG no Dia a Dia da Fábrica', 'ESG na Fábrica',
   'Conceitos de ESG (ambiental, social e governança) desmistificados com exemplos reais de aplicação no chão de fábrica e na relação com comunidades locais.',
   'Sustentabilidade', 'EAD', 24, 'Colaboradores de todos os níveis organizacionais da indústria',
   'Encerrado', '/assets/hero-image.png', '2025-06-02')
ON DUPLICATE KEY UPDATE `NomeCompleto` = VALUES(`NomeCompleto`);
