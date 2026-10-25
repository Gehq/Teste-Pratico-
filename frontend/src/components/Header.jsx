export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="/" className="brand" aria-label="SESI Indústria – página inicial">
          <img src="/assets/logo-sesi-industria-primary.svg" alt="SESI Indústria" width="160" height="40" />
        </a>
        <span className="header-tag">CTED · Catálogo de Cursos</span>
      </div>
    </header>
  );
}
