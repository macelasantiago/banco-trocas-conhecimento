import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { limparSessao, getUsuarioSalvo } from "../utils/auth";
import "../styles/navbar.css";

// Ícones SVG personalizados para o navbar, criados por mim para manter uma identidade visual consistente.
const IconBrain = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/>
  </svg>
);
const IconHome = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/>
    <polyline points="9 21 9 12 15 12 15 21"/>
  </svg>
);
const IconBook = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    <line x1="12" y1="6" x2="16" y2="6"/>
    <line x1="12" y1="10" x2="16" y2="10"/>
  </svg>
);
const IconTeam = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4"/>
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
  </svg>
);
const IconMenu = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);
const IconX = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const IconLogout = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);
const IconLogin = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
    <polyline points="10 17 15 12 10 7"/>
    <line x1="15" y1="12" x2="3" y2="12"/>
  </svg>
);
 // Ícone personalizado de sessão ativa — pessoa com crachá de verificação.
const IconUserBadge = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="7" r="3.5"/>
    <path d="M5.5 20c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5"/>
    <circle cx="19" cy="5" r="3" fill="rgba(139,92,246,0.2)" stroke="#a78bfa" strokeWidth="1.5"/>
    <path d="M17.5 5l1 1 1.8-1.8" stroke="#a78bfa" strokeWidth="1.4"/>
  </svg>
);

// ── Rotas de navegação
// "Pessoas" foi removido intencionalmente:
//   - Deslogado: acesso via botão "Cadastrar-se →" no nav (que já leva a /pessoas)
//   - Logado: não faz sentido exibir cadastro para quem já tem conta
const navLinks = [
  { to: "/",              label: "Início",        icon: <IconHome /> },
  { to: "/conhecimentos", label: "Conhecimentos", icon: <IconBook /> },
  { to: "/sobre",         label: "Sobre Nós",     icon: <IconTeam /> },
];

function Navbar() {
  const location   = useLocation();
  const navigate   = useNavigate();
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [usuario,    setUsuario]    = useState(getUsuarioSalvo);

  // Efeito de blur/borda ao rolar
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fecha menu mobile ao navegar
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  // Bloqueia scroll do body quando menu mobile estiver aberto
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Sincroniza estado de auth com login/logout feitos em outras páginas
  useEffect(() => {
    const sync = () => setUsuario(getUsuarioSalvo());
    window.addEventListener("authChange", sync);
    return () => window.removeEventListener("authChange", sync);
  }, []);

  function handleLogout() {
    limparSessao();
    setUsuario(null);
    setMobileOpen(false);
    navigate("/");
  }

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  const iniciais = usuario
    ? usuario.nome.split(" ").slice(0, 2).map((p) => p[0].toUpperCase()).join("")
    : "";

  return (
    <>
      <nav className={`nav-root${scrolled ? " scrolled" : ""}`}>
        <div className="nav-inner">

          {/* Logo */}
          <Link to="/" className="nav-logo">
            <div className="nav-logo-icon"><IconBrain /></div>
            <span className="nav-logo-text">Banco de <span>Trocas</span></span>
          </Link>

          {/* Links de navegação — Início, Conhecimentos, Sobre Nós */}
          <ul className="nav-links">
            {navLinks.map(({ to, label, icon }) => (
              <li key={to}>
                <Link to={to} className={`nav-link${isActive(to) ? " active" : ""}`}>
                  {icon} {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* ── Área de autenticação ── */}
          {usuario ? (
            // Logado: avatar com iniciais + primeiro nome + botão Sair
            <div className="nav-user">
              <div className="nav-user-avatar-wrap">
                <div className="nav-user-avatar">{iniciais}</div>
                <div className="nav-user-badge-icon" title="Sessão ativa">
                  <IconUserBadge />
                </div>
              </div>
              <span className="nav-user-name">{usuario.nome.split(" ")[0]}</span>
              <button className="nav-user-logout" onClick={handleLogout} title="Sair da conta">
                <IconLogout /> Sair
              </button>
            </div>
          ) : (
            // Deslogado: Entrar (outline) + Cadastrar-se → (gradiente, leva a /pessoas)
            <div className="nav-auth-btns">
              <Link to="/login" className="nav-login">
                <IconLogin /> Entrar
              </Link>
              <Link to="/pessoas" className="nav-cta">
                Cadastrar-se →
              </Link>
            </div>
          )}

          {/* Botão hambúrguer mobile */}
          <button
            className="nav-mobile-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          >
            {mobileOpen ? <IconX /> : <IconMenu />}
          </button>
        </div>
      </nav>

      {/* ── Menu mobile ── */}
      {mobileOpen && (
        <>
          <div className="nav-overlay" onClick={() => setMobileOpen(false)} />
          <div className="nav-mobile-menu">
            {navLinks.map(({ to, label, icon }) => (
              <Link key={to} to={to} className={isActive(to) ? "active" : ""}>
                {icon} {label}
              </Link>
            ))}

            <div className="nav-mobile-divider" />

            {usuario ? (
              <>
                <div className="nav-mobile-user-info">
                  <IconUserBadge />
                  <span>{usuario.nome.split(" ")[0]}</span>
                  <span className="nav-mobile-user-tag">logado</span>
                </div>
                <button className="nav-mobile-logout" onClick={handleLogout}>
                  <IconLogout /> Sair da conta
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-mobile-login">
                  <IconLogin /> Entrar
                </Link>
                <Link to="/pessoas" className="nav-mobile-cta">
                  Cadastrar-se →
                </Link>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default Navbar;