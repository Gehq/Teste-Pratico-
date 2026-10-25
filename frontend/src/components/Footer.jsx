const REDES = [
  { nome: 'Facebook', href: 'https://www.facebook.com/sesisp', icone: 'icon-facebook-24px.svg' },
  { nome: 'Instagram', href: 'https://www.instagram.com/sesisp', icone: 'icon-instagram-24px.svg' },
  { nome: 'LinkedIn', href: 'https://www.linkedin.com/company/sesi-sp', icone: 'icon-linkedIn-24px.svg' },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <img src="/assets/logo-sesi-industria-white.svg" alt="SESI Indústria" width="140" height="35" />
        <nav aria-label="Redes sociais" className="social">
          {REDES.map((r) => (
            <a key={r.nome} href={r.href} target="_blank" rel="noopener noreferrer" aria-label={`${r.nome} (abre em nova aba)`}>
              <img src={`/assets/${r.icone}`} alt="" width="24" height="24" />
            </a>
          ))}
        </nav>
        <small>© 2026 SESI-SP · Projeto de avaliação técnica</small>
      </div>
    </footer>
  );
}
