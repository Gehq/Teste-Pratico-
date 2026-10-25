export default function Estado({ tipo, mensagem, onAcao }) {
  if (tipo === 'erro') {
    return (
      <div className="estado erro" role="alert">
        <div className="estado-icone" aria-hidden="true">!</div>
        <h3>Não foi possível carregar os cursos</h3>
        <p>{mensagem}</p>
        <button type="button" className="btn btn-primary" onClick={onAcao}>Tentar novamente</button>
      </div>
    );
  }
  return (
    <div className="estado">
      <div className="estado-icone" aria-hidden="true">?</div>
      <h3>Nenhum curso encontrado</h3>
      <p>Não encontramos cursos com os critérios selecionados. Tente outros termos ou limpe os filtros.</p>
      <button type="button" className="btn btn-primary" onClick={onAcao}>Limpar filtros</button>
    </div>
  );
}
