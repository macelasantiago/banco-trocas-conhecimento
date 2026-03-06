<div align="center">

# 🔄 Banco de Trocas de Conhecimento

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?style=flat-square&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)

*Conectando quem quer ensinar com quem quer aprender — de forma gratuita e colaborativa.*

</div>

---

## 🎯 Sobre o Projeto

Muitas pessoas desejam aprender novas habilidades, mas não possuem recursos para pagar cursos. Ao mesmo tempo, essas mesmas pessoas têm conhecimentos que poderiam compartilhar.

O **Banco de Trocas de Conhecimento** resolve isso: uma plataforma onde qualquer pessoa pode se cadastrar, publicar uma habilidade que domina e oferecê-la para a comunidade — de forma totalmente gratuita.

O projeto é fullstack completo: API REST com Node.js + Express + Prisma no backend, e uma SPA React + Vite no frontend, com autenticação JWT end-to-end, CRUD completo de ofertas e filtros avançados de busca.

---

## 🗂 Estrutura do Repositório

```
banco-trocas-conhecimento/
├── backend/               ← API REST (Node.js + Express + Prisma)
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── src/
│   │   ├── middlewares/
│   │   │   ├── auth.js                # Validação JWT
│   │   │   ├── errorHandler.js        # Captura global de erros
│   │   │   └── notFound.js
│   │   ├── routes/
│   │   │   ├── index.js               # Agrega todas as rotas
│   │   │   ├── auth.routes.js         # /auth/registro e /auth/login
│   │   │   ├── pessoa.routes.js       # CRUD /pessoas
│   │   │   └── conhecimento.routes.js # CRUD /conhecimentos
│   │   ├── utils/
│   │   │   └── response.js
│   │   └── server.js
│   ├── .env                           # Variáveis de ambiente (não sobe pro Git)
│   └── package.json
│
└── frontend/              ← SPA React + Vite
    ├── src/
    │   ├── components/    # Navbar, Footer, AnimatedNumber, MemberCard...
    │   ├── hooks/         # useReveal, useTypewriter
    │   ├── layout/        # MainLayout
    │   ├── pages/         # PaginaInicial, Login, Pessoas, Conhecimentos, SobreNos
    │   ├── styles/        # CSS por componente/página
    │   ├── utils/         # auth.js (sessão JWT)
    │   └── App.jsx
    └── package.json
```

---

## ⚡ Tecnologias

### Backend

| Tecnologia | Finalidade |
|---|---|
| **Node.js** v18+ | Ambiente de execução |
| **Express** | Framework HTTP e roteamento |
| **Prisma ORM** | Comunicação tipada com o banco |
| **PostgreSQL** | Banco de dados relacional |
| **JSON Web Token** | Geração e validação de tokens |
| **bcryptjs** | Criptografia de senhas |
| **dotenv** | Variáveis de ambiente |
| **CORS** | Liberação de acesso para o frontend |

### Frontend

| Tecnologia | Finalidade |
|---|---|
| **React 18** | Biblioteca de UI |
| **Vite 5** | Build tool e dev server |
| **React Router DOM 6** | Roteamento SPA |
| **CSS puro** | Estilização por componente |
| **Fetch API** | Requisições HTTP para a API |

---

## 🚀 Como Executar (Projeto Completo)

### Pré-requisitos

- [Node.js](https://nodejs.org) v18+
- [PostgreSQL](https://www.postgresql.org) instalado e rodando
- [Git](https://git-scm.com)

---

### 1 — Clonar o repositório

```bash
git clone https://github.com/macelasantiago/banco-trocas-conhecimento.git
cd banco-trocas-conhecimento
```

---

### 2 — Configurar e iniciar o Backend

```bash
cd backend
npm install
```

Crie o arquivo `.env` na pasta `backend/`:

```env
DATABASE_URL="postgresql://postgres:suasenha@localhost:5432/banco_trocas"
PORT=3000
JWT_SECRET="sua_chave_secreta_aqui"
```

> Crie o banco antes:
> ```sql
> CREATE DATABASE banco_trocas;
> ```

Rode as migrations e inicie:

```bash
npx prisma migrate dev
npm run dev
```

✅ API disponível em `http://localhost:3000`

---

### 3 — Configurar e iniciar o Frontend

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

✅ Aplicação disponível em `http://localhost:5173`

---

## 📡 Endpoints da API

### 🔐 Autenticação

| Método | Rota | Descrição | Auth |
|---|---|---|---|
| `POST` | `/auth/registro` | Cadastra pessoa com senha criptografada | ❌ |
| `POST` | `/auth/login` | Autentica e retorna token JWT (8h) | ❌ |

### 👤 Pessoas

| Método | Rota | Descrição | Auth |
|---|---|---|---|
| `POST` | `/pessoas` | Cadastra nova pessoa | ❌ |
| `GET` | `/pessoas` | Lista todas as pessoas | ❌ |
| `GET` | `/pessoas/:id` | Busca pessoa por ID | ❌ |
| `PUT` | `/pessoas/:id` | Atualiza dados | ✅ |
| `DELETE` | `/pessoas/:id` | Remove pessoa | ✅ |

### 📚 Conhecimentos

| Método | Rota | Descrição | Auth |
|---|---|---|---|
| `GET` | `/conhecimentos` | Lista com filtros | ❌ |
| `GET` | `/conhecimentos/:id` | Detalhe + contato do ofertante | ❌ |
| `POST` | `/conhecimentos` | Cria oferta | ✅ |
| `PUT` | `/conhecimentos/:id` | Edita (somente o dono) | ✅ dono |
| `DELETE` | `/conhecimentos/:id` | Exclui (somente o dono) | ✅ dono |

> Rotas protegidas exigem: `Authorization: Bearer <token>`

---

## 🔍 Filtros de Busca

`GET /conhecimentos` aceita parâmetros via query string, combinados livremente:

| Parâmetro | Descrição | Exemplo |
|---|---|---|
| `categoria` | Filtra por categoria | `?categoria=Tecnologia` |
| `nivel` | Filtra por nível | `?nivel=Básico` |
| `busca` | Busca no título e na descrição | `?busca=python` |

```
GET /conhecimentos?categoria=Música&nivel=Básico
GET /conhecimentos?busca=javascript&nivel=Intermediário
GET /conhecimentos?categoria=Tecnologia&busca=react
```

> A busca é **case-insensitive**.

---

## 🔒 Autenticação e Permissões

### Fluxo completo

```
1. Cadastro   →  POST /auth/registro  →  senha salva com bcrypt
2. Login      →  POST /auth/login     →  retorna JWT (válido por 8h)
3. Requisição →  Authorization: Bearer <token>
4. Middleware →  valida token, injeta req.pessoaId
5. Verificação→  compara req.pessoaId com conhecimento.pessoaId antes de editar/deletar
```

### Respostas de permissão

| Situação | Status |
|---|---|
| Sem token | `401 Unauthorized` |
| Token inválido ou expirado | `401 Unauthorized` |
| Token válido, mas não é o dono | `403 Forbidden` |
| Token válido e é o dono | `200 OK` |

### Frontend

A sessão é persistida via `sessionStorage` com o módulo `src/utils/auth.js`. O estado de autenticação é sincronizado entre componentes via evento customizado `authChange`.

---

## 🛡️ Middlewares

| Middleware | Função |
|---|---|
| `auth.js` | Valida JWT e injeta `req.pessoaId` na requisição |
| `errorHandler.js` | Captura erros globais, trata códigos Prisma (`P2002`, `P2025`, `P2003`) e retorna respostas padronizadas |
| `notFound.js` | Retorna `404` para rotas inexistentes |

---

## 🗄️ Banco de Dados

### Schema

**Pessoas**
```
id          Int      @id @default(autoincrement())
nome        String
email       String   @unique
telefone    String?
descricao   String?
senha       String
conhecimentos Conhecimento[]
```

**Conhecimentos**
```
id          Int      @id @default(autoincrement())
titulo      String
descricao   String
categoria   String
nivel       String
pessoaId    Int
pessoa      Pessoa   @relation(...)
```

---

## 📄 Páginas do Frontend

| Rota | Página | Descrição |
|---|---|---|
| `/` | Página Inicial | Landing page com hero, stats animadas, como funciona e CTA |
| `/login` | Login | Autenticação com JWT, feedback inline de erro |
| `/pessoas` | Cadastro | Cadastro de pessoa com login automático; bloqueado se já logado |
| `/conhecimentos` | Conhecimentos | Grid com filtros, CRUD completo para logados |
| `/sobre` | Sobre Nós | Equipe com cards, contribuições e estatísticas |

---

## 👥 Equipe

| Membro | Função | Contribuições |
|---|---|---|
| **Marcela Santiago** | Fullstack · Arquitetura | Schema Prisma, migrations, setup React/Vite, React Router, estrutura de rotas |
| **Beatriz Silva Santos** | Fullstack · Auth & Landing | JWT backend, middlewares, landing page, sistema de login no front, correção de bugs de cadastro/sessão/modais |
| **Vitor Santana** | Fullstack · Pessoas | CRUD completo `/pessoas` no backend|
| **Patrick Silva** | Fullstack · Conhecimentos | CRUD completo `/conhecimentos` no backend; formulário de cadastro de pessoa no frontend |
| **Antonio Junio** | Fullstack · Filtros & CRUD Front | Filtros combinados na API; formulário de conhecimento com edição e exclusão no frontend |

---

## 📅 Entregas

| Entregável | Prazo | Status |
|---|---|---|
| Backend | 23/02/2026 | ✅ Concluído |
| Frontend | 07/03/2026 | ✅ Concluído |

---

<div align="center">

Desenvolvido no curso **Desenvolvimento Full Stack Básico** · Atlântico Avanti · 2026

</div>