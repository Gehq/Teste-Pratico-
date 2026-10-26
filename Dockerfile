# Build do Frontend (React + Vite)
FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# Build do Backend (.NET 8)
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS backend-build
WORKDIR /app
COPY backend/CatalogoCursos.Api/CatalogoCursos.Api.csproj backend/CatalogoCursos.Api/
RUN dotnet restore backend/CatalogoCursos.Api/CatalogoCursos.Api.csproj
COPY backend/CatalogoCursos.Api/ backend/CatalogoCursos.Api/
RUN dotnet publish backend/CatalogoCursos.Api/CatalogoCursos.Api.csproj -c Release -o /app/publish

# Imagem final de execução
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=backend-build /app/publish .
COPY --from=frontend-build /app/frontend/dist /app/frontend/dist
COPY ["Arquivos_Atividade prática_519_2026_DEV/SESI INDÚSTRIA", "/app/Arquivos_Atividade prática_519_2026_DEV/SESI INDÚSTRIA"]

# Ajusta caminhos para produção no container
ENV Paths__Frontend="/app/frontend/dist"
ENV Paths__Assets="/app/Arquivos_Atividade prática_519_2026_DEV/SESI INDÚSTRIA"
ENV ConnectionStrings__Catalogo="Data Source=/app/catalogo.db"
ENV ASPNETCORE_URLS="http://+:80"
EXPOSE 80

ENTRYPOINT ["dotnet", "CatalogoCursos.Api.dll"]
