export const ICONES = {
  'Matemática': '/assets/icon-matematica-20px.svg',
  'Linguagens': '/assets/icon-linguagens-20px.svg',
  'Ciências da Natureza': '/assets/icon-ciencias-natureza-20px.svg',
  'Sustentabilidade': '/assets/icon-sustentabilidade-20px.svg',
};

export default function CursoCard({ curso: c, indice, onAbrir }) {
  return (
    <li>
      <button type="button" className="card" style={{ '--i': indice }} aria-haspopup="dialog" onClick={onAbrir}>
        <div className="card-media">
          <img src={c.imagemApresentacao} alt="" loading="lazy" decoding="async" width="640" height="360" />
          <span className="badge" data-status={c.status}>{c.status}</span>
        </div>
        <div className="card-body">
          <span className="card-cat">
            {ICONES[c.categoria] && <img src={ICONES[c.categoria]} alt="" />}
            {c.categoria}
          </span>
          <h3>{c.nomeCompleto}</h3>
          <p className="card-desc">{c.descricao}</p>
          <div className="meta">
            <span className="chip">{c.modalidade}</span>
            <span className="chip">{c.cargaHoraria}h</span>
            <span className="chip">{c.publicoAlvo}</span>
          </div>
          <span className="card-cta">Ver detalhes <img src="/assets/arrow-navigation.svg" alt="" /></span>
        </div>
      </button>
    </li>
  );
}

export function CursoSkeleton() {
  return (
    <li aria-hidden="true">
      <div className="card skeleton">
        <div className="card-media" />
        <div className="card-body">
          <div className="sk-line w40" /><div className="sk-line h20" /><div className="sk-line" /><div className="sk-line w60" />
        </div>
      </div>
    </li>
  );
}
