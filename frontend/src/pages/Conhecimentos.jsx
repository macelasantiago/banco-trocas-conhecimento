import { useState, useEffect } from "react";
import useReveal from "../hooks/useReveal";
import "../styles/conhecimentos.css";

// ── Ícones inline 
const IcPlus     = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>;
const IcEdit     = () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
const IcTrash    = () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>;
const IcX        = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>;
const IcSearch   = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>;
const IcFilter   = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>;
const IcBook     = () => <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>;
const IcUser     = () => <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const IcTag      = () => <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>;
const IcLevel    = () => <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6"  y1="20" x2="6"  y2="14"/></svg>;
const IcEmpty    = () => <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v3l2 2"/></svg>;
const IcCheck    = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>;
const IcEye      = () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
const IcMail     = () => <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
const IcPhone    = () => <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.59 1.23h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.73a16 16 0 0 0 6.29 6.29l.87-.87a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;

// ── Constantes ────────────────────────────────────────────────────────────────
const API = "http://localhost:3000";

const CATEGORIAS = ["Música", "Tecnologia", "Educação", "Artes", "Idiomas", "Culinária", "Esportes", "Outros"];
const NIVEIS     = ["básico", "intermediário", "avançado"];

const NIVEL_STYLE = {
  "básico":         { label: "Básico",         cls: "badge-nivel--basico"        },
  "intermediário":  { label: "Intermediário",  cls: "badge-nivel--intermediario" },
  "avançado":       { label: "Avançado",       cls: "badge-nivel--avancado"      },
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function getToken()   { return localStorage.getItem("token"); }
function getUsuario() {
  try { return JSON.parse(localStorage.getItem("usuario")); }
  catch { return null; }
}

// ── Componente principal ──────────────────────────────────────────────────────
function Conhecimentos() {
  // Estado da listagem
  const [conhecimentos, setConhecimentos] = useState([]);
  const [carregando,    setCarregando]    = useState(true);
  const [erro,          setErro]          = useState("");

  // Estado dos filtros
  const [busca,         setBusca]         = useState("");
  const [filtroCateg,   setFiltroCateg]   = useState("");
  const [filtroNivel,   setFiltroNivel]   = useState("");

  // Estado do formulário (modal)
  const [modalAberto,   setModalAberto]   = useState(false);
  const [editando,      setEditando]      = useState(null);   // null = criar | objeto = editar
  const [salvando,      setSalvando]      = useState(false);
  const [sucesso,       setSucesso]       = useState("");
  const [campos, setCampos] = useState({ titulo: "", descricao: "", categoria: "", nivel: "" });

  // Estado do modal de detalhes
  const [detalhe, setDetalhe] = useState(null); // null = fechado | objeto = aberto

  // Refs de animação (mesmo padrão usado em PaginaInicial e SobreNos)
  const headerRef  = useReveal();
  const listaRef   = useReveal(80);

  // Usuário logado
  const usuario = getUsuario();

  // ── Buscar conhecimentos da API ─────────────────────────────────────────────
  async function buscarConhecimentos() {
    setCarregando(true);
    setErro("");
    try {
      const params = new URLSearchParams();
      if (filtroCateg) params.append("categoria", filtroCateg);
      if (filtroNivel) params.append("nivel",     filtroNivel);
      if (busca)       params.append("busca",     busca);

      const query = params.toString() ? `?${params}` : "";
      const res   = await fetch(`${API}/conhecimentos${query}`);
      const data  = await res.json();
      setConhecimentos(Array.isArray(data) ? data : []);
    } catch {
      setErro("Não foi possível carregar os conhecimentos. Verifique se o servidor está rodando.");
    } finally {
      setCarregando(false);
    }
  }

  // Busca ao montar e ao mudar filtros
  useEffect(() => {
    buscarConhecimentos();
  }, [filtroCateg, filtroNivel]);

  // Debounce na busca por texto (espera o usuário parar de digitar)
  useEffect(() => {
    const timer = setTimeout(() => buscarConhecimentos(), 400);
    return () => clearTimeout(timer);
  }, [busca]);

  // ── Abrir modal ─────────────────────────────────────────────────────────────
  function abrirCriar() {
    setEditando(null);
    setCampos({ titulo: "", descricao: "", categoria: "", nivel: "" });
    setModalAberto(true);
  }

  function abrirEditar(c) {
    setEditando(c);
    setCampos({ titulo: c.titulo, descricao: c.descricao, categoria: c.categoria, nivel: c.nivel });
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
    setEditando(null);
    setSucesso("");
  }

  // ── Salvar (criar ou editar) ─────────────────────────────────────────────────
  async function salvar() {
    if (!campos.titulo.trim() || !campos.descricao.trim() || !campos.categoria || !campos.nivel) {
      setSucesso(""); 
      return;
    }

    setSalvando(true);
    const token  = getToken();
    const method = editando ? "PUT" : "POST";
    const url    = editando ? `${API}/conhecimentos/${editando.id}` : `${API}/conhecimentos`;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(campos),
      });

      if (res.ok) {
        setSucesso(editando ? "Conhecimento atualizado!" : "Conhecimento cadastrado!");
        await buscarConhecimentos();
        setTimeout(() => { fecharModal(); }, 1200);
      } else {
        const data = await res.json();
        setSucesso(`Erro: ${data.erro || "Não foi possível salvar."}`);
      }
    } catch {
      setSucesso("Erro: servidor indisponível.");
    } finally {
      setSalvando(false);
    }
  }

  // ── Excluir ──────────────────────────────────────────────────────────────────
  async function excluir(id) {
    if (!window.confirm("Tem certeza que deseja excluir este conhecimento?")) return;

    const token = getToken();
    try {
      const res = await fetch(`${API}/conhecimentos/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
      });
      if (res.ok) {
        setConhecimentos(prev => prev.filter(c => c.id !== id));
      }
    } catch {
      alert("Não foi possível excluir. Tente novamente.");
    }
  }

  // ── Verificar se é o dono ────────────────────────────────────────────────────
  function isDono(conhecimento) {
    return usuario && conhecimento.pessoa?.id === usuario.id;
  }

  // ── Limpar filtros ───────────────────────────────────────────────────────────
  function limparFiltros() {
    setBusca("");
    setFiltroCateg("");
    setFiltroNivel("");
  }

  const temFiltro = busca || filtroCateg || filtroNivel;

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <div className="conh-page">

      {/* ── Cabeçalho ── */}
      <div ref={headerRef} className="conh-header animate-fade-up">
        <div className="conh-header__text">
          <span className="section-tag">plataforma</span>
          <h1 className="conh-header__title">
            Conhecimentos <span className="conh-header__title-grad">disponíveis</span>
          </h1>
          <p className="conh-header__sub">
            Explore as ofertas da comunidade. Encontre algo novo para aprender
            ou compartilhe o que você sabe.
          </p>
        </div>

        {/* Botão novo — só aparece se estiver logado */}
        {usuario && (
          <button className="btn-primary conh-btn-novo" onClick={abrirCriar}>
            <IcPlus /> Novo Conhecimento
          </button>
        )}
      </div>

      {/* ── Filtros ── */}
      <div className="conh-filtros animate-fade-up delay-2">
        <div className="conh-filtros__busca">
          <IcSearch />
          <input
            type="text"
            placeholder="Buscar por título ou descrição..."
            value={busca}
            onChange={e => setBusca(e.target.value)}
          />
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
              {NIVEIS.map(n => <option key={n} value={n}>{n.charAt(0).toUpperCase() + n.slice(1)}</option>)}
            </select>
          </div>

          {temFiltro && (
            <button className="conh-btn-limpar" onClick={limparFiltros}>
              <IcX /> Limpar
            </button>
          )}
        </div>
      </div>

      {/* ── Contador de resultados ── */}
      {!carregando && !erro && (
        <p className="conh-count animate-fade-up delay-3">
          {conhecimentos.length === 0
            ? "Nenhum resultado encontrado"
            : `${conhecimentos.length} conhecimento${conhecimentos.length > 1 ? "s" : ""} encontrado${conhecimentos.length > 1 ? "s" : ""}`
          }
          {temFiltro && " com os filtros aplicados"}
        </p>
      )}

      {/* ── Estado de carregando ── */}
      {carregando && (
        <div className="conh-loading">
          <div className="conh-spinner" />
          <span>Carregando conhecimentos...</span>
        </div>
      )}

      {/* ── Estado de erro ── */}
      {erro && !carregando && (
        <div className="conh-erro">
          <p>{erro}</p>
          <button className="btn-secondary" onClick={buscarConhecimentos}>Tentar novamente</button>
        </div>
      )}

      {/* ── Lista de cards ── */}
      {!carregando && !erro && (
        <div ref={listaRef} className="conh-grid">
          {conhecimentos.length === 0 ? (
            <div className="conh-empty">
              <div className="conh-empty__icon"><IcEmpty /></div>
              <h3>Nenhum conhecimento encontrado</h3>
              <p>
                {temFiltro
                  ? "Tente ajustar os filtros ou limpar a busca."
                  : "Seja o primeiro a compartilhar um conhecimento!"}
              </p>
              {usuario && !temFiltro && (
                <button className="btn-primary" onClick={abrirCriar}>
                  <IcPlus /> Cadastrar conhecimento
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
                {/* Linha decorativa no topo do card (cor por nível) */}
                <div className={`conh-card__stripe conh-card__stripe--${c.nivel?.replace("á","a").replace("é","e")}`} />

                <div className="conh-card__body">
                  {/* Badges: categoria e nível */}
                  <div className="conh-card__badges">
                    <span className="badge-categ">
                      <IcTag /> {c.categoria}
                    </span>
                    <span className={`badge-nivel ${NIVEL_STYLE[c.nivel]?.cls ?? ""}`}>
                      <IcLevel /> {NIVEL_STYLE[c.nivel]?.label ?? c.nivel}
                    </span>
                  </div>

                  {/* Título e descrição */}
                  <h3 className="conh-card__titulo">{c.titulo}</h3>
                  <p className="conh-card__desc">{c.descricao}</p>

                  {/* Rodapé: ofertante + ações */}
                  <div className="conh-card__footer">
                    <span className="conh-card__pessoa">
                      <IcUser /> {c.pessoa?.nome ?? "—"}
                    </span>

                    <div className="conh-card__acoes">
                      {/* Botão ver detalhes — aparece para todos */}
                      <button
                        className="conh-btn-detalhe"
                        onClick={() => setDetalhe(c)}
                        title="Ver detalhes"
                      >
                        <IcEye /> Detalhes
                      </button>

                      {/* Botões só aparecem para o dono */}
                      {isDono(c) && (
                        <>
                          <button
                            className="conh-btn-editar"
                            onClick={() => abrirEditar(c)}
                            title="Editar"
                          >
                            <IcEdit /> Editar
                          </button>
                          <button
                            className="conh-btn-excluir"
                            onClick={() => excluir(c.id)}
                            title="Excluir"
                          >
                            <IcTrash /> Excluir
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

      {/* ── Modal de formulário ── */}
      {modalAberto && (
        <>
          {/* Overlay escuro */}
          <div className="conh-overlay" onClick={fecharModal} />

          {/* Modal */}
          <div className="conh-modal animate-fade-up">
            {/* Cabeçalho do modal */}
            <div className="conh-modal__header">
              <div className="conh-modal__header-left">
                <div className="conh-modal__icon"><IcBook /></div>
                <div>
                  <h2 className="conh-modal__title">
                    {editando ? "Editar Conhecimento" : "Novo Conhecimento"}
                  </h2>
                  <p className="conh-modal__sub">
                    {editando ? "Atualize as informações da sua oferta." : "Compartilhe o que você sabe fazer."}
                  </p>
                </div>
              </div>
              <button className="conh-modal__close" onClick={fecharModal}>
                <IcX />
              </button>
            </div>

            {/* Corpo do formulário */}
            <div className="conh-modal__body">
              {/* Título */}
              <div className="conh-field">
                <label className="conh-label">Título *</label>
                <input
                  className="conh-input"
                  type="text"
                  placeholder="Ex: Violão básico, Python para iniciantes..."
                  value={campos.titulo}
                  onChange={e => setCampos(p => ({ ...p, titulo: e.target.value }))}
                />
              </div>

              {/* Descrição */}
              <div className="conh-field">
                <label className="conh-label">Descrição *</label>
                <textarea
                  className="conh-input conh-textarea"
                  placeholder="Descreva o que você vai ensinar, metodologia, duração estimada..."
                  value={campos.descricao}
                  onChange={e => setCampos(p => ({ ...p, descricao: e.target.value }))}
                  rows={4}
                />
              </div>

              {/* Categoria e Nível lado a lado */}
              <div className="conh-field-row">
                <div className="conh-field">
                  <label className="conh-label">Categoria *</label>
                  <select
                    className="conh-input conh-select"
                    value={campos.categoria}
                    onChange={e => setCampos(p => ({ ...p, categoria: e.target.value }))}
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
                  >
                    <option value="">Selecione...</option>
                    {NIVEIS.map(n => (
                      <option key={n} value={n}>{n.charAt(0).toUpperCase() + n.slice(1)}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Feedback de sucesso/erro */}
              {sucesso && (
                <div className={`conh-feedback ${sucesso.startsWith("Erro") ? "conh-feedback--erro" : "conh-feedback--ok"}`}>
                  {!sucesso.startsWith("Erro") && <IcCheck />}
                  {sucesso}
                </div>
              )}
            </div>

            {/* Rodapé do modal */}
            <div className="conh-modal__footer">
              <button className="btn-secondary" onClick={fecharModal} disabled={salvando}>
                Cancelar
              </button>
              <button
                className="btn-primary"
                onClick={salvar}
                disabled={salvando || !campos.titulo || !campos.descricao || !campos.categoria || !campos.nivel}
              >
                {salvando ? (
                  <><div className="conh-spinner conh-spinner--sm" /> Salvando...</>
                ) : (
                  <>{editando ? <IcEdit /> : <IcPlus />} {editando ? "Salvar alterações" : "Cadastrar"}</>
                )}
              </button>
            </div>
          </div>
        </>
      )}
      {/* ── Modal de detalhes ── */}
      {detalhe && (
        <>
          <div className="conh-overlay" onClick={() => setDetalhe(null)} />

          <div className="conh-modal conh-modal--detalhe animate-fade-up">
            {/* Stripe colorida no topo pelo nível */}
            <div className={`conh-detalhe__stripe conh-card__stripe--${detalhe.nivel?.replace("á","a").replace("é","e")}`} />

            {/* Cabeçalho */}
            <div className="conh-modal__header">
              <div className="conh-modal__header-left">
                <div className="conh-modal__icon"><IcBook /></div>
                <div>
                  <h2 className="conh-modal__title">{detalhe.titulo}</h2>
                  <div className="conh-detalhe__badges">
                    <span className="badge-categ"><IcTag /> {detalhe.categoria}</span>
                    <span className={`badge-nivel ${NIVEL_STYLE[detalhe.nivel]?.cls ?? ""}`}>
                      <IcLevel /> {NIVEL_STYLE[detalhe.nivel]?.label ?? detalhe.nivel}
                    </span>
                  </div>
                </div>
              </div>
              <button className="conh-modal__close" onClick={() => setDetalhe(null)}>
                <IcX />
              </button>
            </div>

            {/* Corpo */}
            <div className="conh-modal__body">
              {/* Descrição completa */}
              <div className="conh-detalhe__secao">
                <span className="conh-label">Sobre este conhecimento</span>
                <p className="conh-detalhe__desc">{detalhe.descricao}</p>
              </div>

              {/* Divisor */}
              <div className="conh-detalhe__divisor" />

              {/* Informações de contato */}
              <div className="conh-detalhe__secao">
                <span className="conh-label">Informações de contato</span>

                <div className="conh-detalhe__contato-card">
                  {/* Avatar com inicial */}
                  <div className="conh-detalhe__avatar">
                    {detalhe.pessoa?.nome?.charAt(0).toUpperCase() ?? "?"}
                  </div>

                  <div className="conh-detalhe__contato-info">
                    <span className="conh-detalhe__nome">{detalhe.pessoa?.nome ?? "—"}</span>

                    {detalhe.pessoa?.email && (
                      <a
                        href={`mailto:${detalhe.pessoa.email}`}
                        className="conh-detalhe__contato-linha"
                      >
                        <IcMail /> {detalhe.pessoa.email}
                      </a>
                    )}

                    {detalhe.pessoa?.telefone && (
                      <a
                        href={`tel:${detalhe.pessoa.telefone}`}
                        className="conh-detalhe__contato-linha"
                      >
                        <IcPhone /> {detalhe.pessoa.telefone}
                      </a>
                    )}

                    {!detalhe.pessoa?.email && !detalhe.pessoa?.telefone && (
                      <span className="conh-detalhe__sem-contato">
                        Nenhuma informação de contato disponível.
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Rodapé */}
            <div className="conh-modal__footer">
              {isDono(detalhe) && (
                <button
                  className="btn-secondary"
                  onClick={() => { setDetalhe(null); abrirEditar(detalhe); }}
                >
                  <IcEdit /> Editar oferta
                </button>
              )}
              <button className="btn-primary" onClick={() => setDetalhe(null)}>
                Fechar
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Conhecimentos;
