# Uso de IA

## Ferramenta utilizada

Antigravity (agente de codificação do Google DeepMind) operando no IDE, com acesso ao terminal e ao sistema de arquivos local.

## Objetivo do uso

- Estruturar a documentação inicial (README e este arquivo).
- Gerar o back-end em .NET 8 (modelo, DbContext, seed e endpoints GET).
- Gerar o front-end responsivo e acessível utilizando os assets e fontes exportados do Figma.
- Executar testes locais (build, chamadas HTTP aos endpoints e simulação de falha do banco).
- Migrar o banco de SQLite para MySQL 8 (Pomelo) e o front-end de JavaScript puro para React 18 + Vite, após a instalação do Node.js e do MySQL no ambiente.

## Prompts relevantes

### Aproveitados

- Prompt principal em etapas: documentação → assets → back-end (.NET + banco open source, seed com ≥ 6 cursos, 3 categorias, 2 modalidades, 3 status) → front-end (busca, filtros combinados, contador, limpar filtros, detalhes, estados de loading/vazio/erro) → testes manuais.
- Restrição de buscar imagens, ícones e fontes apenas nas pastas locais `SESI INDÚSTRIA` e `_Font`.
- Pedido de migração: "resolver a questão do banco de dados e do Node.js agora que estão instalados (MySQL Workbench)", com a escolha de migrar para MySQL e refazer o front em React (Vite).

### Descartados

- Uso de React com Vite na primeira versão: adiado porque o ambiente não possuía Node.js/npm; inicialmente usou-se JavaScript com ES Modules e SQLite. Após a instalação de Node.js e MySQL, a solução foi migrada para React + Vite e MySQL.
- Teste visual automatizado via navegador controlado pelo agente: a ferramenta falhou ao baixar o driver do Playwright (HTTP 404), então a validação visual ficou como teste manual.

## Como o conteúdo foi validado

- `dotnet build` sem avisos ou erros.
- Chamadas HTTP aos endpoints conferindo: total de 8 cursos; busca sem acento ("matematica"); combinação de 3 filtros retornando exatamente 1 curso; valores distintos em `/api/filtros`.
- Requisições aos assets (`hero-image.png`, fontes `.ttf`) retornando 200.
- Simulação de banco indisponível retornando 503 com mensagem amigável.
- Revisão manual do código gerado (escape de HTML para evitar XSS, tratamento de cancelamento de requisições, acessibilidade do diálogo).
- Na migração: `npm run build` sem erros e `dotnet build` com o provider MySQL sem avisos ou erros.

### Inadequação encontrada na migração

O Vite gera os bundles por padrão em `dist/assets/`, mesmo prefixo de URL (`/assets`) usado pela API para servir as imagens do Figma — risco de conflito de rotas. Correção: `build.assetsDir = 'static'` no `vite.config.js`. Além disso, a API passou a verificar se `frontend/dist` existe antes de registrar os arquivos estáticos, evitando falha na inicialização quando o build ainda não foi gerado.

## Exemplo de erro/inadequação

Na primeira versão, a API executava `Database.EnsureCreated()` sem tratamento. Ao simular o banco "derrubado" (connection string para caminho inexistente), o processo inteiro encerraria na inicialização — o front-end nem seria servido e o usuário veria apenas uma falha de conexão genérica, em vez da mensagem de erro planejada.

## Correção realizada

A inicialização do banco foi envolvida em `try/catch` com log do erro, mantendo a API no ar. Um `UseExceptionHandler` converte falhas de banco em `503` (`application/problem+json`) com título e detalhe em português, que o front-end (`api.js`) lê e exibe no estado de erro com botão "Tentar novamente". O cenário foi retestado: `/api/cursos` → 503 e `/` → 200.
