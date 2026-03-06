<div align="center">

# 🧠 Banco de Trocas de Conhecimento — Frontend

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-6-CA4245?style=flat-square&logo=reactrouter&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-puro-1572B6?style=flat-square&logo=css3&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)

*Interface da plataforma colaborativa de troca de conhecimentos — do cadastro ao CRUD completo com autenticação.*

</div>

---

## 🎯 Visão Geral

O frontend do **Banco de Trocas de Conhecimento** é uma SPA (Single Page Application) construída com React + Vite. O projeto prioriza uma experiência visual refinada com animações de entrada, efeitos CSS e design totalmente responsivo — do mobile ao desktop wide.

A aplicação consome a API REST interna (Node.js + Express + Prisma) e implementa autenticação JWT completa: cadastro com login automático, sessão persistida no `sessionStorage` e controle de permissões granular (editar/excluir apenas as próprias ofertas).

---

## ⚙️ Tecnologias

| Tecnologia | Versão | Uso |
|---|---|---|
| **React** | 18 | Biblioteca principal de UI |
| **Vite** | 5.x | Build tool e dev server |
| **React Router DOM** | 6 | Roteamento SPA entre páginas |
| **CSS puro** | — | Estilização por componente/página |
| **JWT (via fetch)** | — | Autenticação e controle de sessão |

---

## 📁 Estrutura de Pastas

```
frontend/src/
│
├── components/
│   ├── Navbar.jsx                    # Barra de navegação responsiva com estado de auth
│   ├── Footer.jsx                    # Rodapé com links e créditos
│   ├── AnimatedNumber.jsx            # Contador animado via IntersectionObserver
│   │
│   ├── sobreNos/
│   │   ├── MemberCard.jsx            # Card flip individual de membro da equipe
│   │   └── SobreNosIcons.jsx         # Ícones SVG exclusivos da página Sobre Nós
│   │
│   └── paginaInicial/
│       └── PaginaInicialIcons.jsx    # Ícones SVG exclusivos da landing page
│
├── hooks/
│   ├── useReveal.js                  # Animação de entrada via IntersectionObserver (com cleanup seguro)
│   └── useTypewriter.js             # Efeito typewriter linha por linha
│
├── layout/
│   └── MainLayout.jsx               # Layout raiz: Navbar + outlet + Footer
│
├── pages/
│   ├── PaginaInicial.jsx            # Landing page (hero, stats, como funciona, CTA)
│   ├── SobreNos.jsx                  # Página da equipe com cards e estatísticas
│   ├── Login.jsx                     # Página de login com JWT
│   ├── Pessoas.jsx                   # Cadastro de pessoa com login automático + bloqueio para logados
│   └── Conhecimentos.jsx            # Listagem, filtros, CRUD de conhecimentos (protegido por auth)
│
├── styles/
│   ├── index.css                    # Reset global, variáveis CSS, animações globais
│   ├── paginaInicial.css            # Landing page + utilitários globais (btn-primary, btn-secondary)
│   ├── conhecimentos.css            # Página de conhecimentos, cards, modais, filtros
│   ├── pessoas.css                  # Página de cadastro e perfil pós-cadastro
│   ├── login.css                    # Página de login
│   ├── navbar.css                   # Navbar responsiva
│   ├── footer.css                   # Footer responsivo
│   └── sobreNos.css                 # Página sobre nós + MemberCard
│
├── utils/
│   └── auth.js                      # Helpers: salvarSessao, limparSessao, getUsuarioSalvo, getToken
│
└── App.jsx                           # Definição das rotas da aplicação
```

---

## 📄 Páginas

### 🏠 Página Inicial (`/`)

Landing page dividida em 5 seções:

- **Hero** — título em duas linhas com efeito typewriter (`useTypewriter`), subtítulo, dois botões de CTA e elementos decorativos de fundo (grid CSS + orbs com animação `orb-drift`)
- **Stats** — barra com 4 métricas animadas (`AnimatedNumber`) que contam do zero ao entrar na tela via `IntersectionObserver`
- **Como Funciona** — grid de 4 cards numerados explicando o fluxo da plataforma
- **Benefícios** — grid de 4 cards destacando os diferenciais
- **CTA Final** — chamada para ação centralizada com botões de cadastro e explorar

### 🔐 Login (`/login`)

- Formulário de login com e-mail e senha
- Feedback de erro inline (e-mail/senha incorretos, servidor offline)
- Toggle de visibilidade da senha
- Spinner de carregamento no botão
- Após login bem-sucedido: salva sessão via `salvarSessao()` e redireciona para `/conhecimentos`
- Link para `/pessoas` (cadastro) caso o usuário não tenha conta

### 👤 Cadastro (`/pessoas`)

- **Usuário deslogado:** formulário completo com nome, e-mail, senha, telefone (com máscara `(00) 00000-0000`) e descrição opcional
- Após envio: realiza cadastro + login automático via `POST /auth/registro` + `POST /auth/login`, salva sessão e exibe card de perfil com botão para explorar conhecimentos
- **Usuário logado:** exibe tela informativa bloqueando novo cadastro com mensagem clara e opção de fazer logout para criar outra conta — sem redirecionamento silencioso

### 📚 Conhecimentos (`/conhecimentos`)

- Grid de cards com todos os conhecimentos cadastrados
- **Filtros combinados:** busca por título/descrição (debounce 400ms), select de categoria e select de nível
- **Usuário deslogado:** pode visualizar e filtrar; botão "Entre para publicar" em vez do botão de criar
- **Usuário logado:** botão "Novo Conhecimento" abre modal de criação
- **Dono da oferta:** botões Editar e Excluir visíveis apenas nas próprias ofertas
- Modal de detalhes: exibe descrição completa + dados de contato do ofertante (e-mail, telefone)
- Refresh silencioso pós-save: a lista atualiza sem desmontar o grid (evita crash de DOM)

### 👥 Sobre Nós (`/sobre`)

- Cards individuais de cada membro com avatar, cor personalizada, tags de tecnologia e links sociais
- Cada card mostra as contribuições no **backend** e no **frontend** separadamente
- Frase de destaque no rodapé de cada card
- Estatísticas do projeto com `AnimatedNumber`

---

## 🧩 Componentes

### `Navbar`
- Fixa no topo, transparente inicialmente e com `backdrop-filter: blur` ao rolar
- Links com indicador de rota ativa
- **Deslogado:** botões "Entrar" e "Cadastrar-se →"
- **Logado:** avatar com iniciais, primeiro nome e botão "Sair"
- Menu hambúrguer em mobile com overlay, animação slide e travamento de scroll do body
- Sincroniza estado de auth via evento `authChange` (funciona entre abas/páginas)

### `Footer`
- Grid de 3 colunas no desktop, empilhado no mobile
- Links de navegação e redes sociais

### `AnimatedNumber`
- `IntersectionObserver` para disparar apenas ao entrar na viewport
- Easing `easeOutCubic` suave
- Suporte a sufixo (`%`, `+`) e símbolo especial com fade-in (`∞`)

### `MemberCard`
- Animação de entrada escalonada por índice
- Cor de destaque única por membro via CSS custom property `--member-color`
- Seções separadas de contribuição backend e frontend

---

## 🪝 Hooks Customizados

### `useReveal(delay?)`
```js
const ref = useReveal(200);
// <div ref={ref} style={{ opacity: 0, transform: "translateY(28px)", transition: "..." }}>
```
`IntersectionObserver` com **cleanup seguro**: cancela o `setTimeout` interno ao desmontar o componente, evitando o erro `removeChild: node is not a child` causado por DOM manipulation fora do ciclo do React.

### `useTypewriter(lines, speed?, pauseBetween?)`
```js
const { line1, line2, done } = useTypewriter(
  ["Compartilhe o que sabe.", "Aprenda o que precisa."],
  45,   // ms por caractere
  300   // pausa entre linhas
);
```
Digita duas linhas em sequência, caractere por caractere. Retorna estado de cada linha e flag `done` para esconder o cursor ao terminar.

---

## 🔐 Autenticação (Frontend)

A sessão é gerenciada pelo módulo `src/utils/auth.js`:

```js
salvarSessao(usuario, token)  // salva no sessionStorage
limparSessao()                 // remove sessão + dispara evento authChange
getUsuarioSalvo()              // retorna objeto do usuário ou null
getToken()                     // retorna o JWT ou null
```

O evento `authChange` é usado pela `Navbar` e pela página `Conhecimentos` para sincronizar o estado de autenticação sem precisar recarregar a página.

---

## 🎨 Design System

Todas as variáveis CSS globais estão em `src/styles/index.css`:

```css
--bg            /* #07070f — fundo da página */
--surface       /* #0f0f1e — fundo de cards */
--surface-2     /* #161628 — inputs e superfícies secundárias */
--border        /* rgba(139,92,246,0.14) — bordas sutis */
--purple        /* #8b5cf6 — cor primária */
--purple-light  /* #a78bfa — hover e destaques */
--text          /* #f0eeff — texto principal */
--text-muted    /* rgba(200,195,255,0.48) — texto secundário */
--text-faint    /* rgba(200,195,255,0.28) — labels e placeholders */
--radius        /* 12px */
--radius-sm     /* 8px */
```

Botões globais (`btn-primary`, `btn-secondary`) definidos em `paginaInicial.css`.

---

## 🚀 Como Rodar

```bash
# Na raiz do repositório
cd frontend

# Instalar dependências
npm install

# Iniciar em modo desenvolvimento
npm run dev

# Build para produção
npm run build
```

A aplicação roda em `http://localhost:5173` por padrão.

> **Atenção:** o backend precisa estar rodando em `http://localhost:3000` antes de usar as páginas de Login, Cadastro e Conhecimentos.

---

## 👥 Equipe — Frontend

| Membro | Contribuição no Frontend |
|---|---|
| **Marcela Santiago** | Inicializou o projeto React/Vite, configurou React Router e estrutura de rotas |
| **Beatriz Silva Santos** | Landing page, sistema de login JWT, correções de bugs (cadastro, sessão, modais) |
| **Patrick Silva** | Formulário de cadastro de pessoa integrado com POST /pessoas |
| **Antonio Junio** | Formulário de cadastro de conhecimento com edição (PUT) e exclusão (DELETE) |

---

<div align="center">
  <sub>Desenvolvido com 💜 pela equipe — Marcela · Beatriz · Vitor · Patrick · Antonio</sub><br/>
  <sub>Atlântico Avanti · Desenvolvimento Full Stack Básico · 2026</sub>
</div>