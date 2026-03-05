// src/utils/auth.js
// Helpers de sessão compartilhados entre páginas e componentes.
// Nenhuma página ou componente deve replicar essa lógica.

// Salva os dados do usuário e token JWT no localStorage, e dispara um evento global para notificar outros componentes sobre a mudança de autenticação
export function salvarSessao(pessoa, token) {
  localStorage.setItem("usuarioLogado", JSON.stringify(pessoa));
  localStorage.setItem("authToken", token);
  window.dispatchEvent(new Event("authChange"));
}

// Limpa os dados de sessão (usuário + token) e dispara um evento global para notificar outros componentes sobre a mudança de autenticação
export function limparSessao() {
  localStorage.removeItem("usuarioLogado");
  localStorage.removeItem("authToken");
  window.dispatchEvent(new Event("authChange"));
}

// Retorna o objeto do usuário salvo na sessão, ou null se não houver um usuário logado ou se ocorrer um erro ao acessar o localStorage
export function getUsuarioSalvo() {
  try {
    const raw = localStorage.getItem("usuarioLogado");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// Retorna o token JWT salvo na sessão, ou null se não houver um token ou se ocorrer um erro ao acessar o localStorage
export function getToken() {
  return localStorage.getItem("authToken") || null;
}