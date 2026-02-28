import { Link } from "react-router-dom";
import { useRef } from "react";
import AnimatedNumber from "../components/AnimatedNumber";
import useTypewriter from "../hooks/useTypewriter";
import useReveal from "../hooks/useReveal";
import {
  IcUserPlus, IcSearch, IcArrow, IcSpark,
  IcGlobe, IcLink, IcLayers, IcSliders,
  IcUserCircle, IcEdit, IcCompass, IcZap,
} from "../components/paginaInicial/PaginaInicialIcons";
import "../styles/paginaInicial.css";

// Dados estáticos das seções de passos e features da página inicial.
const steps = [
  { num: "01", icon: <IcUserCircle />, title: "Crie seu perfil",          desc: "Cadastre-se com nome, e-mail e uma descrição sobre o que você tem a oferecer." },
  { num: "02", icon: <IcEdit />,       title: "Publique um conhecimento", desc: "Informe título, categoria e nível do que você sabe ensinar." },
  { num: "03", icon: <IcCompass />,    title: "Explore a plataforma",     desc: "Navegue pelos conhecimentos disponíveis com filtros por categoria e nível." },
  { num: "04", icon: <IcZap />,        title: "Faça a troca",             desc: "Entre em contato e combine como será a troca de conhecimento." },
];

// Dados das features da página inicial
const features = [
  { icon: <IcGlobe />,   title: "Diversas áreas",    desc: "Tecnologia, idiomas, arte, culinária — o limite é o conhecimento humano." },
  { icon: <IcLink />,    title: "Conexão direta",    desc: "Contato direto entre quem ensina e quem aprende. Sem intermediários." },
  { icon: <IcLayers />,  title: "Níveis definidos",  desc: "Iniciante, intermediário ou avançado. Encontre o nível certo para você." },
  { icon: <IcSliders />, title: "Filtros avançados", desc: "Busque por categoria ou nível de dificuldade com precisão." },
];

// Função principal da página inicial, utilizando os hooks personalizados para animações e efeitos visuais.
function PaginaInicial() {
  const { line1, line2, done } = useTypewriter([
    "Compartilhe o que sabe.",
    "Aprenda o que precisa.",
  ]);

  // Refs (que são passados para os hooks de reveal) para controlar a animação de entrada dos elementos na tela
  const stepsRef    = useReveal();
  const featuresRef = useReveal();
  const ctaRef      = useReveal();

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="landing-grid" />
        <div className="landing-orb-1" />
        <div className="landing-orb-2" />
        <div className="landing-orb-3" />

        <div className="hero-badge">
          <IcSpark /> Plataforma de aprendizado colaborativo
        </div>

        <h1 className="hero-title">
          <span>
            {line1}
            {!line2 && !done && <span className="hero-title-cursor" />}
          </span>
          <span className="hero-title-line2">
            {line2}
            {line2.length > 0 && !done && <span className="hero-title-cursor" />}
          </span>
        </h1>

        <p className="hero-subtitle">
          O Banco de Trocas de Conhecimento conecta pessoas que têm algo a ensinar
          com quem tem algo a aprender — de forma simples, direta e gratuita.
        </p>

        <div className="hero-cta-group">
          <Link to="/pessoas" className="btn-primary">
            <IcUserPlus /> Cadastrar-se
          </Link>
          <Link to="/conhecimentos" className="btn-secondary">
            <IcSearch /> Ver Conhecimentos
          </Link>
        </div>

        <div className="hero-scroll-hint">
          <div className="hero-scroll-line" />
          <span>EXPLORAR</span>
        </div>
      </section>

      {/* STATS */}
      <div className="stats-bar">
        <div className="stat-item">
          <span className="stat-num">
            <AnimatedNumber value={100} suffix="%" duration={2400} />
          </span>
          <span className="stat-label">Gratuito</span>
        </div>

        <div className="stat-item">
          <span className="stat-num">
            <AnimatedNumber value={0} special="∞" />
          </span>
          <span className="stat-label">Conhecimentos</span>
        </div>

        <div className="stat-item">
          <span className="stat-num">
            <AnimatedNumber value={4} suffix="+" duration={2000} />
          </span>
          <span className="stat-label">Categorias</span>
        </div>

        <div className="stat-item">
          <span className="stat-num">
            <AnimatedNumber value={3} duration={2000} />
          </span>
          <span className="stat-label">Níveis</span>
        </div>
      </div>

      {/* COMO FUNCIONA */}
      <section className="section">
        <span className="section-tag">passo a passo</span>
        <h2 className="section-title">Como funciona?</h2>
        <p className="section-subtitle">
          Em quatro passos simples você começa a trocar conhecimento com outras pessoas.
        </p>

        <div className="steps-reveal" ref={stepsRef}>
          <div className="steps-grid">
            {steps.map((step) => (
              <div key={step.num} className="step-card">
                <span className="step-num-badge">{step.num}</span>
                <div className="step-icon-wrap">{step.icon}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <div className="features-section">
        <section className="section">
          <span className="section-tag">benefícios</span>
          <h2 className="section-title">O que a plataforma oferece?</h2>
          <p className="section-subtitle">
            Tudo que você precisa para ensinar e aprender em um só lugar.
          </p>

          <div className="features-reveal" ref={featuresRef}>
            <div className="features-grid">
              {features.map((f) => (
                <div key={f.title} className="feature-card">
                  <div className="feature-icon-wrap">{f.icon}</div>
                  <h4 className="feature-title">{f.title}</h4>
                  <p className="feature-desc">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* CTA FINAL */}
      <section className="section">
        <div className="cta-reveal" ref={ctaRef}>
          <div className="cta-banner">
            <h2 className="cta-banner-title">Pronto para começar?</h2>
            <p className="cta-banner-sub">
              Cadastre-se e publique o primeiro conhecimento que você quer compartilhar.
            </p>
            <div className="cta-group-z">
              <Link to="/pessoas" className="btn-primary">
                Começar agora <IcArrow />
              </Link>
              <Link to="/conhecimentos" className="btn-secondary">
                <IcSearch /> Explorar conhecimentos
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PaginaInicial;