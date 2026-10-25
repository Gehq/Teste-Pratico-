// Cliente da API do catálogo. Mesma origem por padrão; pode ser sobrescrito com VITE_API_BASE.
const BASE = (import.meta.env.VITE_API_BASE ?? '') + '/api';
const TIMEOUT_MS = 10000;

export class ApiError extends Error {
  constructor(message, status) { super(message); this.status = status; }
}

async function get(path, signal) {
  const timeout = AbortSignal.timeout(TIMEOUT_MS);
  const combined = signal ? AbortSignal.any([signal, timeout]) : timeout;
  let res;
  try {
    res = await fetch(BASE + path, { signal: combined, headers: { Accept: 'application/json' } });
  } catch (err) {
    if (signal?.aborted) throw err; // cancelamento intencional (nova busca)
    if (err.name === 'TimeoutError') throw new ApiError('O servidor demorou demais para responder.', 0);
    throw new ApiError('Não foi possível conectar ao servidor. Verifique sua conexão.', 0);
  }
  if (!res.ok) {
    let detalhe = '';
    try { const p = await res.json(); detalhe = p.detail || p.title || ''; } catch { /* corpo não-JSON */ }
    throw new ApiError(detalhe || `Erro ${res.status} ao consultar a API.`, res.status);
  }
  return res.json();
}

export const listarCursos = (filtros, signal) => {
  const qs = new URLSearchParams(Object.entries(filtros).filter(([, v]) => v));
  return get(`/cursos${qs.size ? '?' + qs : ''}`, signal);
};
export const obterFiltros = (signal) => get('/filtros', signal);
