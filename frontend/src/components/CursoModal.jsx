import { useEffect, useRef } from 'react';

const formatarData = (iso) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });

export default function CursoModal({ curso: c, onFechar }) {
  const ref = useRef(null);
  const ultimoFoco = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    if (c && !dialog.open) {
      ultimoFoco.current = document.activeElement;
      dialog.showModal();
    } else if (!c && dialog.open) {
      dialog.close();
    }
  }, [c]);

  const aoFechar = () => {
    onFechar();
    ultimoFoco.current?.focus();
  };

  return (
    <dialog
      ref={ref}
      className="modal"
      aria-labelledby="detalhe-titulo"
      onClose={aoFechar}
      onClick={(e) => { if (e.target === ref.current) ref.current.close(); }}
    >
      {c && (
        <div className="modal-body">
          <div className="modal-media">
            <img src={c.imagemApresentacao} alt={`Imagem de apresentação do curso ${c.nomeBreve}`} />
            <button type="button" className="modal-fechar" aria-label="Fechar detalhes" onClick={() => ref.current.close()}>
              <img src="/assets/add_2.svg" alt="" />
            </button>
          </div>
          <div className="modal-conteudo">
            <span className="badge" data-status={c.status} style={{ justifySelf: 'start' }}>{c.status}</span>
            <h2 id="detalhe-titulo">{c.nomeCompleto}</h2>
            <p className="breve">{c.nomeBreve}</p>
            <p>{c.descricao}</p>
            <dl className="ficha">
              <div><dt>Categoria</dt><dd>{c.categoria}</dd></div>
              <div><dt>Modalidade</dt><dd>{c.modalidade}</dd></div>
              <div><dt>Carga horária</dt><dd>{c.cargaHoraria} horas</dd></div>
              <div><dt>Público-alvo</dt><dd>{c.publicoAlvo}</dd></div>
              <div>
                <dt>Disponível a partir de</dt>
                <dd><time dateTime={c.dataDisponibilizacao}>{formatarData(c.dataDisponibilizacao)}</time></dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </dialog>
  );
}
