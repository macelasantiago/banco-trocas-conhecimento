<div align="center">

# 🔄 Banco de Trocas de Conhecimento

**Backend · API RESTful**

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?style=flat-square&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)

*Conectando quem quer ensinar com quem quer aprender — de forma gratuita e organizada.*

</div>

---

## 🎯 Sobre o Projeto

Muitas pessoas desejam aprender novas habilidades, mas não possuem recursos financeiros para pagar cursos ou mentorias. Ao mesmo tempo, essas mesmas pessoas possuem conhecimentos que poderiam ser compartilhados.

O **Banco de Trocas de Conhecimento** resolve isso: uma plataforma onde qualquer pessoa pode cadastrar uma habilidade que domina e oferecê-la para a comunidade. Esta API gerencia todo o ciclo — cadastro de pessoas, publicação de ofertas, filtros de busca e controle de acesso para que cada usuário edite apenas as suas próprias ofertas.

---

## ⚡ Tecnologias

| Tecnologia | Finalidade |
|---|---|
| **Node.js** v18+ | Ambiente de execução JavaScript |
| **Express** | Framework HTTP e roteamento |
| **Prisma ORM** | Comunicação tipada com o banco de dados |
| **PostgreSQL** | Banco de dados relacional |
| **JSON Web Token** | Geração e validação de tokens de acesso |
| **bcryptjs** | Criptografia segura de senhas |
| **dotenv** | Gerenciamento de variáveis de ambiente |
| **CORS** | Liberação de acesso para o frontend |

---

## 📁 Estrutura do Projeto

```
backend/
├── prisma/
│   ├── schema.prisma              # Modelos do banco de dados
│   └── migrations/                # Histórico de alterações no banco
├── src/
│   ├── middlewares/
│   │   ├── auth.js                # Validação do token JWT
│   │   ├── errorHandler.js        # Captura global de erros
│   │   └── notFound.js            # Handler para rotas inexistentes
│   ├── routes/
│   │   ├── index.js               # Agrega todas as rotas
│   │   ├── auth.routes.js         # Registro e login
│   │   ├── pessoa.routes.js       # CRUD de pessoas
│   │   └── conhecimento.routes.js # CRUD de conhecimentos
│   ├── utils/
│   │   └── response.js            # Padronização de respostas JSON
│   └── server.js                  # Configuração do servidor
├── .env                           # Variáveis de ambiente (não sobe pro Git)
└── package.json
```

---

## 🚀 Como Executar

### Pré-requisitos

- [Node.js](https://nodejs.org) v18 ou superior
- [PostgreSQL](https://www.postgresql.org) instalado e rodando
- [Git](https://git-scm.com)

### 1 — Clonar o repositório

```bash
git clone https://github.com/macelasantiago/banco-trocas-conhecimento.git
cd banco-trocas-conhecimento/backend
```

### 2 — Instalar as dependências

```bash
npm install
```

### 3 — Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="postgresql://postgres:suasenha@localhost:5432/banco_trocas"
PORT=3000
JWT_SECRET="sua_chave_secreta_aqui"
```

> **💡 Dica:** crie o banco antes de continuar:
> ```sql
> CREATE DATABASE banco_trocas;
> ```

### 4 — Criar as tabelas no banco

```bash
npx prisma migrate dev
```

### 5 — Iniciar o servidor

```bash
npm run dev
```

✅ Servidor disponível em `http://localhost:3000`

---

## 📡 Endpoints

### 🔐 Autenticação

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/auth/registro` | Cadastra pessoa com senha criptografada |
| `POST` | `/auth/login` | Autentica e retorna o token JWT |

### 👤 Pessoas

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/pessoas` | Cadastra uma nova pessoa |
| `GET` | `/pessoas` | Lista todas as pessoas |
| `GET` | `/pessoas/:id` | Busca uma pessoa pelo ID |
| `PUT` | `/pessoas/:id` | Atualiza dados de uma pessoa |
| `DELETE` | `/pessoas/:id` | Remove uma pessoa |

### 📚 Conhecimentos

| Método | Rota | Autenticação |
|---|---|---|
| `GET` | `/conhecimentos` | ❌ Público |
| `GET` | `/conhecimentos/:id` | ❌ Público |
| `POST` | `/conhecimentos` | ✅ Obrigatória |
| `PUT` | `/conhecimentos/:id` | ✅ Somente o dono |
| `DELETE` | `/conhecimentos/:id` | ✅ Somente o dono |

> Rotas protegidas exigem o header: `Authorization: Bearer <token>`

---

## 🔍 Filtros de Busca

A rota `GET /conhecimentos` aceita os seguintes parâmetros via query string:

| Parâmetro | Descrição | Exemplo |
|---|---|---|
| `categoria` | Filtra por categoria | `?categoria=música` |
| `nivel` | Filtra por nível | `?nivel=basico` |
| `busca` | Busca no título e na descrição | `?busca=violão` |

Os filtros podem ser combinados livremente:

```
GET /conhecimentos?categoria=música&nivel=basico
GET /conhecimentos?busca=python&nivel=intermediario
GET /conhecimentos?categoria=tecnologia&busca=javascript
```

> A busca é **case-insensitive** — `Música` e `música` retornam o mesmo resultado.
> Os valores aceitos para `nivel` são: `basico`, `intermediario` e `avancado`.

---

## 🔒 Autenticação e Permissões

A API utiliza **JWT (JSON Web Token)** para proteger as operações de escrita.

**Fluxo:**

```
1. Cadastro   →  POST /auth/registro  →  senha salva criptografada
2. Login      →  POST /auth/login     →  retorna token (válido por 8h)
3. Uso        →  Authorization: Bearer <token>
4. Verificação →  API confirma se o usuário é dono da oferta antes de editar/deletar
```

**Respostas de permissão:**

| Situação | Status |
|---|---|
| Sem token | `401 Unauthorized` |
| Token inválido ou expirado | `401 Unauthorized` |
| Token válido, mas não é o dono | `403 Forbidden` |
| Token válido e é o dono | `200 OK` |

---

## 🛡️ Middlewares

**`auth.js`** — Intercepta rotas protegidas, valida o token JWT e injeta `req.pessoaId` na requisição.

**`errorHandler.js`** — Captura qualquer erro não tratado e retorna respostas padronizadas. Trata automaticamente os erros do Prisma:

| Código | Causa | Status |
|---|---|---|
| `P2002` | E-mail duplicado | `409` |
| `P2025` | Registro não encontrado | `404` |
| `P2003` | ID referenciado inexistente | `400` |

**`notFound.js`** — Retorna `404` com mensagem clara para qualquer rota inexistente.

---

## 👥 Equipe

| Membro | Responsabilidade |
|---|---|
| **Marcela Santiago** | Setup, estrutura do projeto, `schema.prisma` e migrations do banco |
| **Vitor Santana** | CRUD completo de `/pessoas` |
| **Patrick Silva** | CRUD completo de `/conhecimentos` com validação de relacionamento |
| **Antonio Junio** | Filtros por categoria, nível e combinação |
| **Beatriz Silva Santos** | Middlewares, padronização de respostas, busca avançada por texto, autenticação JWT e integração final |

---

## 📅 Entregas

| Entregável | Prazo | Status |
|---|---|---|
| Backend | 23/02/2026 | ✅ Concluído |
| Frontend | 07/03/2026 | 🔜 Em andamento |

---

<div align="center">

Desenvolvido no curso **Desenvolvimento Full Stack Básico** · Atlântico Avanti · 2026

</div>