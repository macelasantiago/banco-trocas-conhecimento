import { Link } from "react-router-dom";
import "../styles/footer.css";

// Ícones SVG personalizados
const IconBrain = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/>
  </svg>
);

const IconHeart = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="#8b5cf6" stroke="none">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

// Função do componente Footer que retorna a estrutura do rodapé do site
function Footer() {
  return (
    <footer className="footer-root">
      <div className="footer-inner">
        <div className="footer-top">
          {/* Brand */}
          <div>
            <Link to="/" className="footer-brand-logo">
              <div className="footer-brand-icon"><IconBrain /></div>
              <span className="footer-brand-name">Banco de <span>Trocas</span></span>
            </Link>
            <p className="footer-desc">
              Plataforma colaborativa de aprendizado onde pessoas compartilham
              conhecimento e aprendem umas com as outras.
            </p>
          </div>

          {/* Navegação */}
          <div className="footer-col">
            <h4>Navegação</h4>
            <Link to="/">Início</Link>
            <Link to="/pessoas">Pessoas</Link>
            <Link to="/conhecimentos">Conhecimentos</Link>
          </div>

          {/* Plataforma */}
          <div className="footer-col">
            <h4>Plataforma</h4>
            <Link to="/pessoas">Cadastrar-se</Link>
            <Link to="/conhecimentos">Explorar</Link>
            <Link to="/sobre">Sobre Nós</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            © 2026 Banco de Trocas de Conhecimento — Feito com <IconHeart /> para aprendizes
          </p>
          <span className="footer-badge">Fullstack Project</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;