const CAMPOS = [
  { campo: 'categoria', rotulo: 'Categoria', chave: 'categorias', todos: 'Todas' },
  { campo: 'modalidade', rotulo: 'Modalidade', chave: 'modalidades', todos: 'Todas' },
  { campo: 'status', rotulo: 'Status', chave: 'status', todos: 'Todos' },
];

export default function Filtros({ filtros, opcoes, onChange, onLimpar, podeLimpar }) {
  return (
    <div className="filtros" role="group" aria-label="Filtros">
      {CAMPOS.map(({ campo, rotulo, chave, todos }) => (
        <div className="campo" key={campo}>
          <label htmlFor={`filtro-${campo}`}>{rotulo}</label>
          <select
            id={`filtro-${campo}`}
            className={filtros[campo] ? 'ativo' : undefined}
            value={filtros[campo]}
            onChange={(e) => onChange(campo, e.target.value)}
          >
            <option value="">{todos}</option>
            {opcoes[chave].map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>
      ))}
      <button type="button" id="limpar-filtros" className="btn btn-ghost" disabled={!podeLimpar} onClick={onLimpar}>
        <img src="/assets/remove.svg" alt="" width="16" height="16" /> Limpar filtros
      </button>
    </div>
  );
}
