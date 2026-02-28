import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/navbar.css";

// Ícones SVG para o Navbar
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
const IconUsers = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
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

// Links de navegação do Navbar, com ícones e rótulos
const navLinks = [
  { to: "/",              label: "Início",        icon: <IconHome /> },
  { to: "/pessoas",       label: "Pessoas",       icon: <IconUsers /> },
  { to: "/conhecimentos", label: "Conhecimentos", icon: <IconBook /> },
  { to: "/sobre",         label: "Sobre Nós",     icon: <IconTeam /> },
];

// Função principal do Navbar, que gerencia o estado de rolagem e menu móvel, e renderiza os links de navegação com destaque para a rota ativa.
function Navbar() {
  const location = useLocation();
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Efeito para detectar rolagem e adicionar classe "scrolled" ao navbar
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fecha o menu móvel ao navegar para outra rota
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  // Impede rolagem do body quando o menu móvel está aberto
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Função para determinar se um link de navegação deve ser marcado como ativo com base na rota atual
  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <>
    {/* Navbar principal, com classe "scrolled" aplicada quando o usuário rola a página */}
      <nav className={`nav-root${scrolled ? " scrolled" : ""}`}>
        <div className="nav-inner">
          <Link to="/" className="nav-logo">
            <div className="nav-logo-icon"><IconBrain /></div>
            <span className="nav-logo-text">Banco de <span>Trocas</span></span>
          </Link>

          {/* Links de navegação para desktop, que são ocultados em telas menores e substituídos pelo menu móvel */}
          <ul className="nav-links">
            {navLinks.map(({ to, label, icon }) => (
              <li key={to}>
                <Link to={to} className={`nav-link${isActive(to) ? " active" : ""}`}>
                  {icon} {label}
                </Link>
              </li>
            ))}
          </ul>

          <Link to="/pessoas" className="nav-cta">Cadastrar-se →</Link>

          {/* Botão para abrir/fechar o menu móvel, que alterna entre os ícones de menu e fechar dependendo do estado "mobileOpen" */}
          <button
            className="nav-mobile-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          >
            {mobileOpen ? <IconX /> : <IconMenu />}
          </button>
        </div>
      </nav>

      {/* Menu móvel, que é exibido quando o estado "mobileOpen" é verdadeiro. Inclui uma sobreposição para fechar o menu ao clicar fora dele. */}
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
            <Link to="/pessoas" className="nav-mobile-cta">
              Cadastrar-se →
            </Link>
          </div>
        </>
      )}
    </>
  );
}

export default Navbar;