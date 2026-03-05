import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { salvarSessao } from "../utils/auth";
import "../styles/login.css";

const API = "http://localhost:3000";

//  Ícones SVG personalizados para a página de login, criados por mim para manter uma identidade visual consistente.
const IcMail = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m2 7 10 7 10-7"/>
  </svg>
);
const IcLock = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);
const IcEye = ({ off }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {off ? (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
        <line x1="1" y1="1" x2="23" y2="23"/>
      </>
    ) : (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </>
    )}
  </svg>
);

// Ícone de chave — identidade visual da página de login
const IcKey = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="7.5" cy="15.5" r="5.5"/>
    <path d="M21 2l-9.6 9.6"/>
    <path d="M15.5 7.5l3 3L22 7l-3-3"/>
  </svg>
);

const IcSpark = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
  </svg>
);

// Função do componente Login que retorna a estrutura da página de login, incluindo o formulário e a lógica de autenticação
function Login() {
  const navigate = useNavigate();

  // Estados para controlar os campos do formulário, visibilidade da senha, estado de carregamento e mensagens de erro
  const [email,      setEmail]      = useState("");
  const [senha,      setSenha]      = useState("");
  const [mostrarPwd, setMostrarPwd] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [erro,       setErro]       = useState("");

  // Função assíncrona para lidar com o envio do formulário de login, que faz a requisição para o backend e gerencia a resposta
  async function handleLogin(e) {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    // Tenta realizar o login fazendo uma requisição POST para o endpoint de autenticação do backend, passando o email e senha como JSON no corpo da requisição
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await res.json();

     // Verifica se a resposta do backend indica sucesso; se não, exibe a mensagem de erro retornada ou uma mensagem genérica
      if (!res.ok) {
        setErro(data.erro || "Não foi possível realizar o login.");
        return;
      }

      // Persiste sessão completa (usuário + token JWT)
      salvarSessao(
        {
          id:    data.pessoa.id,
          nome:  data.pessoa.nome,
          email: data.pessoa.email,
        },
        data.token
      );

      // Redireciona para a página de conhecimentos após login
      navigate("/conhecimentos");

    } catch {
      setErro("Erro de conexão. Verifique se o servidor está rodando.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-grid" />
      <div className="login-orb login-orb-1" />
      <div className="login-orb login-orb-2" />

      <div className="login-card">
        <div className="login-card__stripe" />
        <div className="login-card__body">

          {/* Ícone centralizado */}
          <div className="login-icon-wrap">
            <IcKey />
          </div>

          <div className="login-badge">
            <IcSpark /> Bem-vindo de volta
          </div>

          <h1 className="login-title">
            Entrar na <span>conta</span>
          </h1>
          <p className="login-subtitle">
            Use seu e-mail e senha para acessar a plataforma.
          </p>

          {erro && <div className="login-erro">{erro}</div>}

          <form onSubmit={handleLogin}>

            <div className="login-field">
              <label className="login-label"><IcMail /> E-mail</label>
              <input
                className="login-input"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={carregando}
                autoComplete="email"
              />
            </div>

            <div className="login-field">
              <label className="login-label"><IcLock /> Senha</label>
              <div className="login-pwd-wrap">
                <input
                  className="login-input login-input-pwd"
                  type={mostrarPwd ? "text" : "password"}
                  placeholder="Sua senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                  disabled={carregando}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="login-pwd-toggle"
                  onClick={() => setMostrarPwd((v) => !v)}
                  tabIndex={-1}
                  title={mostrarPwd ? "Ocultar senha" : "Mostrar senha"}
                >
                  <IcEye off={mostrarPwd} />
                </button>
              </div>
            </div>

            <button className="login-btn" type="submit" disabled={carregando}>
              {carregando ? <span className="login-spinner" /> : <IcKey />}
              {carregando ? "Entrando…" : "Entrar"}
            </button>
          </form>

          <div className="login-divider">
            <span>ou</span>
          </div>

          <p className="login-register-hint">
            Ainda não tem conta?{" "}
            <Link to="/pessoas" className="login-link">Cadastre-se gratuitamente</Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;