import { useCallback, useEffect, useRef, useState } from 'react';
import { listarCursos, obterFiltros } from './api.js';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Filtros from './components/Filtros.jsx';
import CursoCard, { CursoSkeleton } from './components/CursoCard.jsx';
import CursoModal from './components/CursoModal.jsx';
import Estado from './components/Estado.jsx';

const VAZIO = { busca: '', categoria: '', modalidade: '', status: '' };

function lerUrl() {
  const p = new URLSearchParams(location.search);
  return Object.fromEntries(Object.keys(VAZIO).map((k) => [k, p.get(k) ?? '']));
}

export default function App() {
  const [filtros, setFiltros] = useState(lerUrl);
  const [textoBusca, setTextoBusca] = useState(filtros.busca);
  const [opcoes, setOpcoes] = useState({ categorias: [], modalidades: [], status: [] });
  const [cursos, setCursos] = useState([]);
  const [status, setStatus] = useState('carregando'); // carregando | ok | erro
  const [erro, setErro] = useState('');
  const [selecionado, setSelecionado] = useState(null);
  const [tentativa, setTentativa] = useState(0);
  const buscaRef = useRef(null);

  const temFiltro = Object.values(filtros).some(Boolean);

  // Opções dos selects
  const carregarOpcoes = useCallback(() => {
    obterFiltros().then(setOpcoes).catch(() => { /* o erro principal é exibido pela listagem */ });
  }, []);
  useEffect(carregarOpcoes, [carregarOpcoes]);

  // Debounce da busca textual
  useEffect(() => {
    const t = setTimeout(() => setFiltros((f) => (f.busca === textoBusca.trim() ? f : { ...f, busca: textoBusca.trim() })), 300);
    return () => clearTimeout(t);
  }, [textoBusca]);

  // Sincroniza URL e carrega cursos (cancelando requisição anterior)
  useEffect(() => {
    const qs = new URLSearchParams(Object.entries(filtros).filter(([, v]) => v));
    history.replaceState(null, '', qs.size ? `?${qs}` : location.pathname);

    const controller = new AbortController();
    setStatus('carregando');
    listarCursos(filtros, controller.signal)
      .then(({ itens }) => { setCursos(itens); setStatus('ok'); })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setErro(err.message);
        setStatus('erro');
      });
    return () => controller.abort();
  }, [filtros, tentativa]);

  const alterarFiltro = (campo, valor) => setFiltros((f) => ({ ...f, [campo]: valor }));

  const limpar = () => {
    setTextoBusca('');
    setFiltros(VAZIO);
    buscaRef.current?.focus();
  };

  const tentarNovamente = () => {
    if (!opcoes.categorias.length) carregarOpcoes();
    setTentativa((n) => n + 1);
  };

  const n = cursos.length;

  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Header />

      <main id="conteudo" tabIndex={-1}>
        <section className="hero" aria-labelledby="titulo">
          <img className="hero-bg" src="/assets/hero-image.png" alt="" fetchPriority="high" />
          <div className="container hero-content">
            <p className="eyebrow">Educação para a indústria</p>
            <h1 id="titulo">Catálogo de Cursos CTED</h1>
            <p className="hero-sub">Qualificação gratuita e flexível para você crescer na carreira. Pesquise e filtre para encontrar o curso ideal.</p>

            <form className="search" role="search" onSubmit={(e) => { e.preventDefault(); alterarFiltro('busca', textoBusca.trim()); }}>
              <label htmlFor="busca" className="sr-only">Pesquisar curso por nome</label>
              <svg className="search-icon" aria-hidden="true" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14" /></svg>
              <input
                id="busca" ref={buscaRef} type="search" autoComplete="off"
                placeholder="Pesquisar pelo nome do curso"
                value={textoBusca} onChange={(e) => setTextoBusca(e.target.value)}
              />
            </form>
          </div>
        </section>

        <section className="container catalogo" aria-labelledby="titulo-catalogo">
          <h2 id="titulo-catalogo" className="sr-only">Cursos</h2>

          <Filtros filtros={filtros} opcoes={opcoes} onChange={alterarFiltro} onLimpar={limpar} podeLimpar={temFiltro} />

          <p className="contador" role="status" aria-live="polite">
            {status === 'carregando' && 'Carregando cursos…'}
            {status === 'ok' && <><strong>{n}</strong> {n === 1 ? 'curso encontrado' : 'cursos encontrados'}</>}
          </p>

          <div aria-live="polite">
            {status === 'erro' && <Estado tipo="erro" mensagem={erro} onAcao={tentarNovamente} />}
            {status === 'ok' && n === 0 && <Estado tipo="vazio" onAcao={limpar} />}
          </div>

          <ul className="grid" aria-busy={status === 'carregando'}>
            {status === 'carregando' && Array.from({ length: 6 }, (_, i) => <CursoSkeleton key={i} />)}
            {status === 'ok' && cursos.map((c, i) => (
              <CursoCard key={c.id} curso={c} indice={i} onAbrir={() => setSelecionado(c)} />
            ))}
          </ul>
        </section>
      </main>

      <Footer />
      <CursoModal curso={selecionado} onFechar={() => setSelecionado(null)} />
    </>
  );
}
