import { useState, useEffect } from "react";
import { getToken, getUsuarioSalvo } from "../utils/auth";
import "../styles/conhecimentos.css";

// Constantes de configuração da API e opções de categorias e níveis, centralizadas para fácil manutenção e consistência em toda a aplicação.
const API = "http://localhost:3000";

const CATEGORIAS = ["Música", "Tecnologia", "Educação", "Artes", "Idiomas", "Culinária", "Esportes", "Outros"];
const NIVEIS     = ["Básico", "Intermediário", "Avançado"];

const NIVEL_STYLE = {
  "Básico":        { cls: "badge-nivel--basico"        },
  "Intermediário": { cls: "badge-nivel--intermediario" },
  "Avançado":      { cls: "badge-nivel--avancado"      },
};

const nivelParaClasse = (nivel) =>
  nivel?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() ?? "";
// normaliza o nível para gerar a classe CSS correspondente, removendo acentos e convertendo para minúsculas (ex: "Básico" → "basico")

// Icones SVG inline personalizados para a página de listagem de conhecimentos, criados para manter uma identidade visual consistente.
const IcPlus = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const IcEdit = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const IcTrash = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/>
    <path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
  </svg>
);
const IcX = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const IcSearch = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const IcFilter = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
  </svg>
);
const IcBook = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    <line x1="12" y1="6" x2="16" y2="6"/><line x1="12" y1="10" x2="16" y2="10"/>
  </svg>
);
const IcUser = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
  </svg>
);
const IcTag = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
    <line x1="7" y1="7" x2="7.01" y2="7"/>
  </svg>
);
const IcLevel = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
    <polyline points="2 17 12 22 22 17"/>
    <polyline points="2 12 12 17 22 12"/>
  </svg>
);
const IcEmpty = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>
);
const IcCheck = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IcEye = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);
const IcMail = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/>
  </svg>
);
const IcPhone = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.59 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

// Função principal da página de listagem de conhecimentos, que inclui filtros, modais de detalhes e formulário, e operações de CRUD, com tratamento de estados de carregamento e erros.
function Conhecimentos() {

  // usuario reativo — atualiza quando o usuário faz login/logout
  const [usuario, setUsuario] = useState(getUsuarioSalvo);
  useEffect(() => {
    const sync = () => setUsuario(getUsuarioSalvo());
    window.addEventListener("authChange", sync);
    return () => window.removeEventListener("authChange", sync);
  }, []);

  // Listagem de conhecimentos e estados relacionados a carregamento, filtros, modais e feedbacks.
  const [conhecimentos, setConhecimentos] = useState([]);
  const [carregando,    setCarregando]    = useState(true);
  // recarregando=true faz refresh sem desmontar o grid (evita crash removeChild)
  const [recarregando,  setRecarregando]  = useState(false);
  const [erro,          setErro]          = useState("");

  // Filtros e busca (recarrega a lista ao mudar, com debounce na busca)
  const [busca,       setBusca]       = useState("");
  const [filtroCateg, setFiltroCateg] = useState("");
  const [filtroNivel, setFiltroNivel] = useState("");

  // Modal formulário (criar / editar) e feedback de operações de CRUD
  const [modalAberto, setModalAberto] = useState(false);
  const [editando,    setEditando]    = useState(null);
  const [salvando,    setSalvando]    = useState(false);
  const [feedback,    setFeedback]    = useState("");
  const [campos, setCampos] = useState({ titulo: "", descricao: "", categoria: "", nivel: "" });

  // Modal de detalhes do conhecimento selecionado, com dados completos e estado de carregamento para mostrar spinner se necessário.
  const [detalhe,           setDetalhe]           = useState(null);
  const [detalheCompleto,   setDetalheCompleto]   = useState(null);
  const [carregandoDetalhe, setCarregandoDetalhe] = useState(false);

  // Buscar lista da API com filtros aplicados, e também para atualizar a lista após operações de CRUD. O parâmetro "silent" controla se deve mostrar o spinner de carregamento ou apenas um indicador sutil de recarregamento.
  async function buscarConhecimentos({ silent = false } = {}) {
    if (silent) {
      setRecarregando(true);
    } else {
      setCarregando(true);
    }
    setErro("");
    try {
      const params = new URLSearchParams();
      if (filtroCateg) params.append("categoria", filtroCateg);
      if (filtroNivel) params.append("nivel",     filtroNivel);
      if (busca)       params.append("busca",     busca);

      const query = params.toString() ? `?${params}` : "";
      const res   = await fetch(`${API}/conhecimentos${query}`);
      const data  = await res.json();

      if (!res.ok) throw new Error(data.erro || "Erro ao buscar.");
      setConhecimentos(Array.isArray(data) ? data : []);
    } catch (e) {
      setErro(e.message || "Não foi possível carregar. Verifique se o servidor está rodando.");
    } finally {
      setCarregando(false);
      setRecarregando(false);
    }
  }

  useEffect(() => { buscarConhecimentos(); }, [filtroCateg, filtroNivel]); // eslint-disable-line

  useEffect(() => {
    const timer = setTimeout(() => buscarConhecimentos(), 400);
    return () => clearTimeout(timer);
  }, [busca]); // eslint-disable-line

  // Abrir modal de detalhes e buscar dados completos do conhecimento selecionado, incluindo informações do ofertante, para exibir na página de detalhes. O estado "carregandoDetalhe" controla se deve mostrar um spinner no modal enquanto os dados são carregados.
  async function abrirDetalhe(c) {
    setDetalhe(c);
    setDetalheCompleto(null);
    setCarregandoDetalhe(true);
    try {
      const res  = await fetch(`${API}/conhecimentos/${c.id}`);
      const data = await res.json();
      if (res.ok) setDetalheCompleto(data);
    } catch { /* fallback silencioso */ }
    finally { setCarregandoDetalhe(false); }
  }

  function fecharDetalhe() {
    setDetalhe(null);
    setDetalheCompleto(null);
  }

  // Modal formulário de criação/edição, que é aberto tanto para criar um novo conhecimento quanto para editar um existente. Ao abrir para edição, os campos são preenchidos com os dados do conhecimento selecionado. O feedback de sucesso ou erro é exibido dentro do modal após tentar salvar.
  function abrirCriar() {
    setEditando(null);
    setCampos({ titulo: "", descricao: "", categoria: "", nivel: "" });
    setFeedback("");
    setModalAberto(true);
  }

  function abrirEditar(c) {
    setEditando(c);
    setCampos({ titulo: c.titulo, descricao: c.descricao, categoria: c.categoria, nivel: c.nivel });
    setFeedback("");
    setModalAberto(true);
  }

  function fecharModal() {
    if (salvando) return;
    setModalAberto(false);
    setEditando(null);
    setFeedback("");
  }

  // Salvar conhecimento (criar ou editar) enviando os dados para a API, com tratamento de erros e feedback visual. Após salvar com sucesso, a lista é atualizada e o modal é fechado automaticamente após um breve delay para mostrar a mensagem de sucesso.
  async function salvar() {
    if (!campos.titulo.trim() || !campos.descricao.trim() || !campos.categoria || !campos.nivel) {
      setFeedback("Erro: Preencha todos os campos obrigatórios.");
      return;
    }

    setSalvando(true);
    setFeedback("");

    const token  = getToken();
    const method = editando ? "PUT" : "POST";
    const url    = editando ? `${API}/conhecimentos/${editando.id}` : `${API}/conhecimentos`;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type":  "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(campos),
      });

      const data = await res.json();

      if (res.ok) {
        setFeedback(editando ? "Conhecimento atualizado com sucesso!" : "Conhecimento cadastrado!");
        await buscarConhecimentos({ silent: true });
        setTimeout(fecharModal, 1200);
      } else {
        setFeedback(`Erro: ${data.erro || "Não foi possível salvar."}`);
      }
    } catch {
      setFeedback("Erro: servidor indisponível. Tente novamente.");
    } finally {
      setSalvando(false);
    }
  }

  // Excluir conhecimento, com confirmação e tratamento de erros. Após exclusão bem-sucedida, atualiza a lista e fecha o modal de detalhes se o conhecimento excluído estiver aberto. 
  async function excluir(c) {
    if (!window.confirm(`Excluir "${c.titulo}"?`)) return;

    const token = getToken();
    try {
      const res = await fetch(`${API}/conhecimentos/${c.id}`, {
        method:  "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
      });

      if (res.ok) {
        setConhecimentos(prev => prev.filter(item => item.id !== c.id));
        if (detalhe?.id === c.id) fecharDetalhe();
      } else {
        const data = await res.json();
        alert(data.erro || "Não foi possível excluir.");
      }
    } catch {
      alert("Erro de conexão. Tente novamente.");
    }
  }

  function isDono(c) {
    return !!usuario && c.pessoaId === usuario.id;
  }

  function limparFiltros() {
    setBusca("");
    setFiltroCateg("");
    setFiltroNivel("");
  }

  const temFiltro    = busca || filtroCateg || filtroNivel;
  const dadosDetalhe = detalheCompleto ?? detalhe;

  //  Render 
  // translate="no" → impede extensões de tradução (Google Translate etc.) de injetar
  // nós <font>/<Text> no DOM, o que causa o crash "removeChild: not a child of this node"
  return (
    <div className="conh-page" translate="no">

      {/* ── Cabeçalho ───────────────────────────────────────── */}
      <div className="conh-header animate-fade-up">
        <div className="conh-header__text">
          <span className="section-tag">plataforma</span>
          <h1 className="conh-header__title">
            <span>Conhecimentos </span>
            <span className="conh-header__title-grad">disponíveis</span>
          </h1>
          <p className="conh-header__sub">
            <span>Explore as ofertas da comunidade. Encontre algo novo para aprender
            ou compartilhe o que você sabe.</span>
          </p>
        </div>

        {usuario ? (
          <button className="btn-primary conh-btn-novo" onClick={abrirCriar}>
            <IcPlus /> <span>Novo Conhecimento</span>
          </button>
        ) : (
          <a href="/login" className="btn-secondary conh-btn-novo">
            <span>Entre para publicar</span>
          </a>
        )}
      </div>

      {/* ── Filtros ─────────────────────────────────────────── */}
      <div className="conh-filtros animate-fade-up delay-2">
        <div className="conh-filtros__busca">
          <IcSearch />
          <input
            type="text"
            placeholder="Buscar por título ou descrição..."
            value={busca}
            onChange={e => setBusca(e.target.value)}
          />
          {busca && (
            <button className="conh-filtros__clear-busca" onClick={() => setBusca("")} title="Limpar busca">
              <IcX />
            </button>
          )}
        </div>

        <div className="conh-filtros__selects">
          <div className="conh-filtro-wrap">
            <IcFilter />
            <select value={filtroCateg} onChange={e => setFiltroCateg(e.target.value)}>
              <option value="">Todas as categorias</option>
              {CATEGORIAS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="conh-filtro-wrap">
            <IcLevel />
            <select value={filtroNivel} onChange={e => setFiltroNivel(e.target.value)}>
              <option value="">Todos os níveis</option>
              {NIVEIS.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>

          {temFiltro && (
            <button className="conh-btn-limpar" onClick={limparFiltros}>
              <IcX /> <span>Limpar</span>
            </button>
          )}
        </div>
      </div>

      {/* ── Contador ────────────────────────────────────────── */}
      {!carregando && !erro && (
        <p className="conh-count animate-fade-up delay-3">
          {recarregando ? (
            <span>Atualizando...</span>
          ) : conhecimentos.length === 0 ? (
            <span>Nenhum resultado encontrado</span>
          ) : (
            <span>
              {`${conhecimentos.length} conhecimento${conhecimentos.length > 1 ? "s" : ""} encontrado${conhecimentos.length > 1 ? "s" : ""}${temFiltro ? " com os filtros aplicados" : ""}`}
            </span>
          )}
        </p>
      )}

      {/* ── Carregando inicial ──────────────────────────────── */}
      {carregando && (
        <div className="conh-loading">
          <div className="conh-spinner" />
          <span>Carregando conhecimentos...</span>
        </div>
      )}

      {/* ── Erro ────────────────────────────────────────────── */}
      {erro && !carregando && (
        <div className="conh-erro">
          <p><span>{erro}</span></p>
          <button className="btn-secondary" onClick={() => buscarConhecimentos()}>
            <span>Tentar novamente</span>
          </button>
        </div>
      )}

      {/* ── Grid de cards ───────────────────────────────────── */}
      {!carregando && !erro && (
        <div className={`conh-grid${recarregando ? " conh-grid--recarregando" : ""}`}>
          {conhecimentos.length === 0 ? (
            <div className="conh-empty">
              <div className="conh-empty__icon"><IcEmpty /></div>
              <h3><span>Nenhum conhecimento encontrado</span></h3>
              <p>
                <span>
                  {temFiltro
                    ? "Tente ajustar os filtros ou limpar a busca."
                    : "Seja o primeiro a compartilhar um conhecimento!"}
                </span>
              </p>
              {usuario && !temFiltro && (
                <button className="btn-primary" style={{ marginTop: 8 }} onClick={abrirCriar}>
                  <IcPlus /> <span>Cadastrar conhecimento</span>
                </button>
              )}
            </div>
          ) : (
            conhecimentos.map((c, i) => (
              <div
                key={c.id}
                className="conh-card animate-fade-up"
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                <div className={`conh-card__stripe conh-card__stripe--${nivelParaClasse(c.nivel)}`} />

                <div className="conh-card__body">
                  <div className="conh-card__badges">
                    <span className="badge-categ"><IcTag /> <span>{c.categoria}</span></span>
                    <span className={`badge-nivel ${NIVEL_STYLE[c.nivel]?.cls ?? ""}`}>
                      <IcLevel /> <span>{c.nivel}</span>
                    </span>
                  </div>

                  <h3 className="conh-card__titulo"><span>{c.titulo}</span></h3>
                  <p className="conh-card__desc"><span>{c.descricao}</span></p>

                  <div className="conh-card__footer">
                    <span className="conh-card__pessoa">
                      <IcUser /> <span>{c.pessoa?.nome ?? "—"}</span>
                    </span>

                    <div className="conh-card__acoes">
                      <button
                        className="conh-btn-detalhe"
                        onClick={() => abrirDetalhe(c)}
                        title="Ver detalhes e contato"
                      >
                        <IcEye /> <span>Detalhes</span>
                      </button>

                      {isDono(c) && (
                        <>
                          <button className="conh-btn-editar" onClick={() => abrirEditar(c)}>
                            <IcEdit /> <span>Editar</span>
                          </button>
                          <button className="conh-btn-excluir" onClick={() => excluir(c)}>
                            <IcTrash /> <span>Excluir</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
          Modal: Criar / Editar
          ══════════════════════════════════════════════════════ */}
      {modalAberto && (
        <>
          <div className="conh-overlay" onClick={fecharModal} />
          <div className="conh-modal conh-modal--enter" translate="no">

            <div className="conh-modal__header">
              <div className="conh-modal__header-left">
                <div className="conh-modal__icon"><IcBook /></div>
                <div>
                  <h2 className="conh-modal__title">
                    <span>{editando ? "Editar Conhecimento" : "Novo Conhecimento"}</span>
                  </h2>
                  <p className="conh-modal__sub">
                    <span>{editando ? "Atualize as informações da sua oferta." : "Compartilhe o que você sabe fazer."}</span>
                  </p>
                </div>
              </div>
              <button className="conh-modal__close" onClick={fecharModal} disabled={salvando}>
                <IcX />
              </button>
            </div>

            <div className="conh-modal__body">
              <div className="conh-field">
                <label className="conh-label">Título *</label>
                <input
                  className="conh-input"
                  type="text"
                  placeholder='Ex: "Violão básico", "Python para iniciantes"...'
                  value={campos.titulo}
                  onChange={e => setCampos(p => ({ ...p, titulo: e.target.value }))}
                  disabled={salvando}
                />
              </div>

              <div className="conh-field">
                <label className="conh-label">Descrição *</label>
                <textarea
                  className="conh-input conh-textarea"
                  placeholder="Descreva o que você vai ensinar, metodologia, duração estimada..."
                  value={campos.descricao}
                  onChange={e => setCampos(p => ({ ...p, descricao: e.target.value }))}
                  rows={4}
                  disabled={salvando}
                />
              </div>

              <div className="conh-field-row">
                <div className="conh-field">
                  <label className="conh-label">Categoria *</label>
                  <select
                    className="conh-input conh-select"
                    value={campos.categoria}
                    onChange={e => setCampos(p => ({ ...p, categoria: e.target.value }))}
                    disabled={salvando}
                  >
                    <option value="">Selecione...</option>
                    {CATEGORIAS.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div className="conh-field">
                  <label className="conh-label">Nível *</label>
                  <select
                    className="conh-input conh-select"
                    value={campos.nivel}
                    onChange={e => setCampos(p => ({ ...p, nivel: e.target.value }))}
                    disabled={salvando}
                  >
                    <option value="">Selecione...</option>
                    {NIVEIS.map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
              </div>

              {feedback && (
                <div className={`conh-feedback ${feedback.startsWith("Erro") ? "conh-feedback--erro" : "conh-feedback--ok"}`}>
                  {!feedback.startsWith("Erro") && <IcCheck />}
                  <span>{feedback}</span>
                </div>
              )}
            </div>

            <div className="conh-modal__footer">
              <button className="btn-secondary" onClick={fecharModal} disabled={salvando}>
                <span>Cancelar</span>
              </button>
              <button
                className="btn-primary"
                onClick={salvar}
                disabled={salvando || !campos.titulo || !campos.descricao || !campos.categoria || !campos.nivel}
              >
                {salvando
                  ? <><div className="conh-spinner conh-spinner--sm" /><span>Salvando...</span></>
                  : <>{editando ? <IcEdit /> : <IcPlus />}<span>{editando ? "Salvar alterações" : "Cadastrar"}</span></>
                }
              </button>
            </div>
          </div>
        </>
      )}

      {/* ══════════════════════════════════════════════════════
          Modal: Detalhes da oferta
          ══════════════════════════════════════════════════════ */}
      {detalhe && (
        <>
          <div className="conh-overlay" onClick={fecharDetalhe} />
          <div className="conh-modal conh-modal--detalhe conh-modal--enter" translate="no">

            <div className={`conh-detalhe__stripe conh-card__stripe--${nivelParaClasse(dadosDetalhe.nivel)}`} />

            <div className="conh-modal__header">
              <div className="conh-modal__header-left">
                <div className="conh-modal__icon"><IcBook /></div>
                <div>
                  <h2 className="conh-modal__title"><span>{dadosDetalhe.titulo}</span></h2>
                  <div className="conh-detalhe__badges">
                    <span className="badge-categ"><IcTag /> <span>{dadosDetalhe.categoria}</span></span>
                    <span className={`badge-nivel ${NIVEL_STYLE[dadosDetalhe.nivel]?.cls ?? ""}`}>
                      <IcLevel /> <span>{dadosDetalhe.nivel}</span>
                    </span>
                  </div>
                </div>
              </div>
              <button className="conh-modal__close" onClick={fecharDetalhe}><IcX /></button>
            </div>

            <div className="conh-modal__body">
              <div className="conh-detalhe__secao">
                <span className="conh-label">Sobre este conhecimento</span>
                <p className="conh-detalhe__desc"><span>{dadosDetalhe.descricao}</span></p>
              </div>

              <div className="conh-detalhe__divisor" />

              <div className="conh-detalhe__secao">
                <span className="conh-label">Responsável e contato</span>

                {carregandoDetalhe ? (
                  <div className="conh-detalhe__loading">
                    <div className="conh-spinner conh-spinner--sm" />
                    <span>Carregando contato...</span>
                  </div>
                ) : (
                  <div className="conh-detalhe__contato-card">
                    <div className="conh-detalhe__avatar">
                      <span>{dadosDetalhe.pessoa?.nome?.charAt(0).toUpperCase() ?? "?"}</span>
                    </div>
                    <div className="conh-detalhe__contato-info">
                      <span className="conh-detalhe__nome">
                        <span>{dadosDetalhe.pessoa?.nome ?? "—"}</span>
                      </span>

                      {dadosDetalhe.pessoa?.email && (
                        <a href={`mailto:${dadosDetalhe.pessoa.email}`} className="conh-detalhe__contato-linha">
                          <IcMail /> <span>{dadosDetalhe.pessoa.email}</span>
                        </a>
                      )}

                      {dadosDetalhe.pessoa?.telefone && (
                        <a href={`tel:${dadosDetalhe.pessoa.telefone}`} className="conh-detalhe__contato-linha">
                          <IcPhone /> <span>{dadosDetalhe.pessoa.telefone}</span>
                        </a>
                      )}

                      {!dadosDetalhe.pessoa?.email && !dadosDetalhe.pessoa?.telefone && (
                        <span className="conh-detalhe__sem-contato">
                          Nenhuma informação de contato disponível.
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="conh-modal__footer">
              {isDono(dadosDetalhe) && (
                <button className="btn-secondary" onClick={() => { fecharDetalhe(); abrirEditar(dadosDetalhe); }}>
                  <IcEdit /> <span>Editar oferta</span>
                </button>
              )}
              <button className="btn-primary" onClick={fecharDetalhe}><span>Fechar</span></button>
            </div>
          </div>
        </>
      )}

    </div>
  );
}

export default Conhecimentos;