import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { salvarSessao, limparSessao, getUsuarioSalvo } from "../utils/auth";
import "../styles/pessoas.css";

// Ícones inline SVG personalizados para a página de cadastro de pessoas, criados por mim para manter uma identidade visual consistente.
const IcUser = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
);
const IcMail = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m2 7 10 7 10-7" />
  </svg>
);
const IcPhone = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.59 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const IcLock = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);
const IcText = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);
const IcCheck = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="m8 12 3 3 5-5" />
  </svg>
);
const IcSpark = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
  </svg>
);
const IcArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
  </svg>
);

// Máscara de telefone brasileiro 
// Suporta celular (11 dígitos): (00) 00000-0000
// e fixo (10 dígitos):          (00) 0000-0000
function mascaraTelefone(valor) {
  // Remove tudo que não for dígito
  const numeros = valor.replace(/\D/g, "").slice(0, 11);

  if (numeros.length <= 2)  return `(${numeros}`;
  if (numeros.length <= 6)  return `(${numeros.slice(0,2)}) ${numeros.slice(2)}`;
  if (numeros.length <= 10) return `(${numeros.slice(0,2)}) ${numeros.slice(2,6)}-${numeros.slice(6)}`;
  // 11 dígitos → celular
  return `(${numeros.slice(0,2)}) ${numeros.slice(2,7)}-${numeros.slice(7)}`;
}

// Função principal da página de cadastro de pessoas, que também exibe o perfil recém-criado e impede novos cadastros enquanto houver uma sessão ativa.
function Pessoas() {
  const navigate = useNavigate();

  const [perfil,     setPerfil]     = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro,       setErro]       = useState("");
  const [telefone,   setTelefone]   = useState("");

  // Verifica se já existe um usuário salvo na sessão ao montar o componente, para evitar que um usuário logado acesse a página de cadastro.
  const [jaLogado, setJaLogado] = useState(false);

  useEffect(() => {
    const usuarioAtual = getUsuarioSalvo();
    if (usuarioAtual) {
      setJaLogado(true);
    }
  }, []);

  // Handler da máscara de telefone que formata o número conforme o usuário digita, permitindo apenas dígitos e aplicando a formatação brasileira de telefone. O valor formatado é armazenado no estado `telefone`, que é um campo controlado do input de telefone no formulário de cadastro.
  function handleTelefone(e) {
    setTelefone(mascaraTelefone(e.target.value));
  }

  // Cadastro + login automático para persistir sessão após criar o perfil. O backend já valida se o e-mail é único, então aqui apenas exibimos a mensagem de erro retornada pela API em caso de falha no cadastro. Se o cadastro for bem-sucedido, uma requisição de login é feita automaticamente para obter o token JWT e salvar a sessão, permitindo que o usuário seja redirecionado para a página de conhecimentos sem precisar fazer login manualmente após se cadastrar.
  async function cadastrarPessoa(formData) {
    setErro("");
    setCarregando(true);

    const nome      = formData.get("nome");
    const email     = formData.get("email");
    const senha     = formData.get("senha");
    // Remove máscara antes de enviar ao backend
    const telefoneLimpo = telefone.replace(/\D/g, "") || undefined;
    const descricao = formData.get("descricao") || undefined;

    try {
      // 1. Registro
      const resRegistro = await fetch("http://localhost:3000/auth/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha, telefone: telefoneLimpo || undefined, descricao }),
      });

      const dadosRegistro = await resRegistro.json();

      if (!resRegistro.ok) {
        setErro(dadosRegistro.erro || "Não foi possível realizar o cadastro.");
        return;
      }

      // 2. Login automático para obter o JWT
      const resLogin = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const dadosLogin = await resLogin.json();

      if (!resLogin.ok) {
        setErro("Cadastro realizado! Faça login para continuar.");
        return;
      }

      // 3. Persiste sessão
      const usuarioSessao = {
        id:        dadosLogin.pessoa.id,
        nome:      dadosLogin.pessoa.nome,
        email:     dadosLogin.pessoa.email,
        telefone:  telefone || null,
        descricao: descricao || null,
      };

      salvarSessao(usuarioSessao, dadosLogin.token);
      setPerfil(usuarioSessao);

    } catch {
      setErro("Erro de conexão. Verifique se o servidor está rodando.");
    } finally {
      setCarregando(false);
    }
  }

  const iniciais = perfil
    ? perfil.nome.split(" ").slice(0, 2).map((p) => p[0].toUpperCase()).join("")
    : "";

  // Bloco de acesso negado para usuário já logado - Faz a verificação de sessão ativa e exibe uma mensagem informando que o usuário já possui uma conta ativa, impedindo o acesso ao formulário de cadastro. Oferece opções para navegar até a página de conhecimentos ou fazer logout para trocar de conta, garantindo que um usuário logado não possa criar múltiplos cadastros sem antes sair da sessão atual.
  if (jaLogado && !perfil) {
    const usuarioAtual = getUsuarioSalvo();
    const primeiroNome = usuarioAtual?.nome?.split(" ")[0] ?? "usuário";
    return (
      <div className="cadastro-page">
        <div className="landing-grid" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="cadastro-card">
          <div className="cadastro-card__stripe" />
          <div className="cadastro-card__body">
            <div className="cadastro-badge" style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.3)", color: "#fbbf24" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              Sessão ativa
            </div>
            <h1 className="cadastro-title">
              Olá, <span>{primeiroNome}!</span>
            </h1>
            <p className="cadastro-subtitle" style={{ marginBottom: "8px" }}>
              Você já possui uma conta ativa nesta sessão. Não é possível criar um novo cadastro enquanto estiver logado.
            </p>
            <p className="cadastro-subtitle">
              Para criar uma nova conta, primeiro faça o logout pela barra de navegação.
            </p>
            <div style={{ height: "1px", background: "var(--border)", margin: "20px 0" }} />
            <button className="cadastro-btn" onClick={() => navigate("/conhecimentos")}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
              Ir para Conhecimentos
            </button>
            <p className="cadastro-login-hint" style={{ marginTop: "16px" }}>
              Quer trocar de conta?{" "}
              <a
                href="#sair"
                onClick={(e) => {
                  e.preventDefault();
                  limparSessao();
                  setJaLogado(false);
                }}
              >
                Sair da conta atual
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cadastro-page">
      <div className="landing-grid" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      {/* ── Perfil pós-cadastro ── */}
      {perfil ? (
        <div className="perfil-card">
          <div className="perfil-card__stripe" />
          <div className="perfil-card__body">
            <div className="perfil-avatar">{iniciais}</div>

            <div className="perfil-check">
              <IcCheck /> Cadastro realizado
            </div>

            <p className="perfil-name">{perfil.nome}</p>
            <p className="perfil-email">{perfil.email}</p>

            {perfil.telefone && (
              <p className="perfil-telefone">
                <IcPhone /> {perfil.telefone}
              </p>
            )}

            {perfil.descricao && (
              <p className="perfil-descricao">{perfil.descricao}</p>
            )}

            <div className="perfil-divider" />

            <div className="perfil-highlight">
              Agora você pode <strong>publicar conhecimentos</strong> e{" "}
              <strong>conectar-se</strong> com outras pessoas na plataforma.
            </div>

            <button
              className="cadastro-btn"
              onClick={() => navigate("/conhecimentos")}
            >
              <IcArrow /> Explorar conhecimentos
            </button>

            <button
              className="perfil-novo-btn"
              onClick={() => {
                limparSessao();
                setPerfil(null);
                setTelefone("");
              }}
            >
              <IcUser /> Cadastrar outro usuário
            </button>
          </div>
        </div>

      ) : (
        /* ── Formulário de Cadastro ── */
        <div className="cadastro-card">
          <div className="cadastro-card__stripe" />
          <div className="cadastro-card__body">

            <div className="cadastro-badge">
              <IcSpark /> Novo por aqui
            </div>

            <h1 className="cadastro-title">
              Crie seu <span>perfil</span>
            </h1>
            <p className="cadastro-subtitle">
              Cadastre-se para publicar conhecimentos e se conectar com
              outras pessoas na plataforma.
            </p>

            {erro && <div className="cadastro-erro">{erro}</div>}

            <form action={cadastrarPessoa}>

              <div className="cadastro-field">
                <label className="cadastro-label"><IcUser /> Nome completo</label>
                <input
                  className="cadastro-input"
                  name="nome"
                  placeholder="Seu nome completo"
                  required
                  disabled={carregando}
                />
              </div>

              <div className="cadastro-field">
                <label className="cadastro-label"><IcMail /> E-mail</label>
                <input
                  className="cadastro-input"
                  name="email"
                  type="email"
                  placeholder="seu@email.com"
                  required
                  disabled={carregando}
                />
              </div>

              <div className="cadastro-field">
                <label className="cadastro-label"><IcLock /> Senha</label>
                <input
                  className="cadastro-input"
                  name="senha"
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  minLength={6}
                  required
                  disabled={carregando}
                />
              </div>

              <div className="cadastro-field">
                <label className="cadastro-label">
                  <IcPhone /> Telefone
                  <span className="cadastro-opcional">(opcional)</span>
                </label>
                {/* Campo controlado para a máscara — não usa name pois o valor
                    já é lido direto do estado `telefone` em cadastrarPessoa */}
                <input
                  className="cadastro-input"
                  type="tel"
                  placeholder="(00) 00000-0000"
                  value={telefone}
                  onChange={handleTelefone}
                  maxLength={15}
                  disabled={carregando}
                  inputMode="numeric"
                />
              </div>

              <div className="cadastro-field">
                <label className="cadastro-label">
                  <IcText /> Breve descrição
                  <span className="cadastro-opcional">(opcional)</span>
                </label>
                <textarea
                  className="cadastro-input cadastro-textarea"
                  name="descricao"
                  placeholder="Conte um pouco sobre você e os conhecimentos que deseja compartilhar..."
                  rows={3}
                  disabled={carregando}
                />
              </div>

              <button className="cadastro-btn" type="submit" disabled={carregando}>
                {carregando ? <span className="cadastro-spinner" /> : <IcUser />}
                {carregando ? "Criando perfil…" : "Criar perfil"}
              </button>

            </form>

            <p className="cadastro-login-hint">
              Já tem conta?{" "}
              <a href="/login">Entrar</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pessoas;