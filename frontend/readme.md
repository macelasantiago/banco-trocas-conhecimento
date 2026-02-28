# 🧠 Banco de Trocas de Conhecimento — Frontend

> Plataforma colaborativa onde pessoas compartilham o que sabem e aprendem o que precisam.

---

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Tecnologias](#tecnologias)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Páginas](#páginas)
- [Componentes](#componentes)
- [Hooks Customizados](#hooks-customizados)
- [Estilos](#estilos)
- [Como Rodar](#como-rodar)

---

## 🎯 Visão Geral

O frontend do **Banco de Trocas de Conhecimento** é uma aplicação React construída com Vite, com foco em experiência visual refinada, animações de entrada suaves e design responsivo completo — do mobile ao desktop.

A aplicação consome uma API REST desenvolvida com **Node.js + Express + Prisma** e permite cadastrar pessoas, publicar conhecimentos e explorar o que a comunidade tem a oferecer.

---

## ⚙️ Tecnologias

| Tecnologia | Uso |
|---|---|
| **React 18** | Biblioteca principal de UI |
| **Vite** | Build tool e dev server |
| **React Router DOM** | Roteamento entre páginas |
| **CSS Modules / CSS puro** | Estilização por componente |

---

## 📁 Estrutura de Pastas

```
frontend/src/
│
├── components/
│   ├── Navbar.jsx                    # Barra de navegação responsiva
│   ├── Footer.jsx                    # Rodapé com links e créditos
│   ├── AnimatedNumber.jsx            # Contador animado com IntersectionObserver
│   │
│   ├── sobreNos/
│   │   ├── MemberCard.jsx            # Card individual de membro da equipe
│   │   └── SobreNosIcons.jsx         # Ícones SVG da página Sobre Nós
│   │
│   └── paginaInicial/
│       └── PaginaInicialIcons.jsx    # Ícones SVG da página inicial
│
├── hooks/
│   ├── useReveal.js                  # Animação de entrada via IntersectionObserver
│   └── useTypewriter.js             # Efeito de digitação linha por linha
│
├── pages/
│   ├── PaginaInicial.jsx            # Landing page (ex Landing.jsx)
│   ├── SobreNos.jsx                  # Página da equipe
│   ├── Pessoas.jsx                   # CRUD de pessoas
│   └── Conhecimentos.jsx            # Listagem e CRUD de conhecimentos
│
├── styles/
│   ├── paginaInicial.css            # Estilos da landing page
│   ├── sobreNos.css                  # Estilos da página sobre nós + MemberCard
│   ├── navbar.css                    # Estilos da navbar
│   └── footer.css                    # Estilos do footer
│
└── App.jsx                           # Rotas da aplicação
```

---

## 📄 Páginas

### 🏠 Página Inicial (`/`)
A landing page da aplicação, dividida em 5 seções:

- **Hero** — título com efeito typewriter em duas linhas, subtítulo, botões de CTA e elementos decorativos de fundo (grid + orbs)
- **Stats** — barra com 4 métricas animadas (`100% Gratuito`, `∞ Conhecimentos`, `4+ Categorias`, `3 Níveis`) que contam do zero ao entrar na tela
- **Como Funciona** — grid com 4 cards numerados explicando o fluxo da plataforma
- **Benefícios** — grid com 4 cards destacando os diferenciais
- **CTA Final** — chamada para ação centralizada com dois botões

### 👥 Sobre Nós (`/sobre`)
Apresenta os 5 membros da equipe com:

- Cards individuais com avatar, nome, cargo, tags de tecnologia e links para GitHub/LinkedIn
- Descrição objetiva das contribuições no **backend** e no **frontend** de cada membro
- Frase de destaque no rodapé de cada card
- Seção de estatísticas do projeto com `AnimatedNumber`

### 👤 Pessoas (`/pessoas`)
Formulário de cadastro integrado com `POST /pessoas` e listagem de cadastros existentes.

### 📚 Conhecimentos (`/conhecimentos`)
Listagem com filtros por categoria e nível, cadastro via `POST /conhecimentos`, edição (`PUT`) e exclusão (`DELETE`) com atualização reativa da lista.

---

## 🧩 Componentes

### `Navbar`
- Fixa no topo, transparente no topo da página e com `backdrop-filter: blur` ao rolar
- Links com indicador de rota ativa (ponto roxo + destaque)
- Menu hambúrguer em mobile com overlay escuro, animação `slideDown` e travamento de scroll do body

### `Footer`
- Grid de 3 colunas no desktop (brand + 2 colunas de links)
- No mobile: brand com logo e descrição empilhados, colunas de links lado a lado
- Copyright e badge na mesma linha

### `AnimatedNumber`
- Usa `IntersectionObserver` para disparar a contagem apenas quando o elemento entra na tela
- Easing `easeOutCubic` — começa rápido e desacelera suavemente
- Suporte a sufixo (`%`, `+`) e símbolo especial com fade-in (`∞`)

### `MemberCard`
- Animação de entrada escalonada por índice (efeito cascata)
- Cor de destaque única por membro via CSS custom property `--member-color`
- Seções separadas de contribuição backend e frontend

---

## 🪝 Hooks Customizados

### `useReveal(delay?)`
```js
const ref = useReveal(200); // 200ms de delay
// <div ref={ref} style={{ opacity: 0, transform: "translateY(28px)", transition: "..." }}>
```
Observa o elemento com `IntersectionObserver` e aplica `opacity: 1` + `translateY(0)` quando ele entra no viewport. Desconecta automaticamente após a primeira revelação.

### `useTypewriter(lines, speed?, pauseBetween?)`
```js
const { line1, line2, done } = useTypewriter(
  ["Compartilhe o que sabe.", "Aprenda o que precisa."],
  45,   // ms por caractere
  300   // pausa entre linhas
);
```
Digita duas linhas em sequência, caractere por caractere. Retorna o estado atual de cada linha e um flag `done` para esconder o cursor ao terminar.

---

## 🎨 Estilos

Cada componente e página tem seu próprio arquivo CSS isolado em `src/styles/`, sem uso de CSS-in-JS ou bibliotecas externas. O design segue um sistema de variáveis globais:

```css
--surface       /* fundo de cards e superfícies */
--border        /* bordas sutis */
--text-muted    /* texto secundário */
--text-faint    /* texto terciário / labels */
```

A paleta principal é construída em cima de roxo (`#8b5cf6`, `#a78bfa`, `#6d28d9`) sobre fundo escuro (`#07070f`), com gradientes lineares e efeitos de glow via `box-shadow`.

---

## 🚀 Como Rodar

```bash
# Instalar dependências
cd frontend
npm install

# Iniciar em modo desenvolvimento
npm run dev

# Build para produção
npm run build
```

A aplicação roda em `http://localhost:5173` por padrão.

> **Certifique-se de que o backend está rodando** em `http://localhost:3000` (ou ajuste a baseURL no serviço de requisições) antes de usar as páginas de Pessoas e Conhecimentos.

---

<div align="center">
  <sub>Desenvolvido com 💜 pela equipe — Marcela · Beatriz · Vitor · Patrick · Antonio</sub>
</div>