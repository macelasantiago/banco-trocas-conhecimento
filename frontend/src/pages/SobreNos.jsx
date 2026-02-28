import useReveal from "../hooks/useReveal";
import MemberCard from "../components/sobreNos/MemberCard";
import AnimatedNumber from "../components/AnimatedNumber";
import { IcServer, IcLayout, IcShield, IcStar, IcCode } from "../components/sobreNos/SobreNosIcons";
import "../styles/sobreNos.css";

/**
 * Dados da equipe.
 */
const team = [
  {
    name:      "Marcela Santiago",
    role:      "Fullstack · Arquitetura",
    avatar:    "MS",
    color:     "#8b5cf6",
    tags:      [{ icon: <IcServer />, label: "Prisma" }, { icon: <IcLayout />, label: "Estrutura Front" }],
    backDesc:  "Responsável pela arquitetura do repositório, configuração do ambiente, modelagem do schema.prisma e gerenciamento de todas as migrations do banco de dados.",
    frontDesc: "Inicializou o projeto React com Vite, configurou o React Router, implementou o serviço centralizado de requisições HTTP e definiu a estrutura de rotas da aplicação.",
    github:    "https://github.com/",
    linkedin:  "https://www.linkedin.com/in/macelasantiago/",
    highlight: "Deu a base para o projeto inteiro funcionar",
  },
  {
    name:      "Beatriz Silva Santos",
    role:      "Fullstack · Auth & Landing",
    avatar:    "BS",
    color:     "#a855f7",
    tags:      [{ icon: <IcShield />, label: "JWT" }, { icon: <IcStar />, label: "Landing Page" }],
    backDesc:  "Implementou autenticação JWT com controle de permissões por recurso, middlewares globais de tratamento de erros, padronização de respostas e busca full-text na API.",
    frontDesc: "Desenvolveu a Landing Page com scroll reveal, efeito typewriter, números animados e design responsivo completo.",
    github:    "https://github.com/BeatrizS97",
    linkedin:  "https://www.linkedin.com/in/beatrizsilvasantos-dev/",
    highlight: "Implementou auth JWT e finalizou a integração da API",
  },
  {
    name:      "Vitor Santana",
    role:      "Fullstack · Pessoas",
    avatar:    "VS",
    color:     "#7c3aed",
    tags:      [{ icon: <IcServer />, label: "REST API" }, { icon: <IcCode />, label: "Listagem" }],
    backDesc:  "Desenvolveu o CRUD completo de pessoas (POST, GET, GET/:id, PUT/:id, DELETE/:id) com validações de entrada e tratamento de erros padronizado.",
    frontDesc: "Criou a página de listagem de conhecimentos consumindo GET /conhecimentos, com cards exibindo título, categoria, nível e ofertante.",
    github:    "https://github.com/vitorsantabi",
    linkedin:  "https://linkedin.com/in/",
    highlight: "CRUD de pessoas do back ao front, do zero",
  },
  {
    name:      "Patrick Silva",
    role:      "Fullstack · Conhecimentos",
    avatar:    "PS",
    color:     "#6d28d9",
    tags:      [{ icon: <IcServer />, label: "CRUD" }, { icon: <IcCode />, label: "Cadastro" }],
    backDesc:  "Implementou o CRUD completo de conhecimentos com validação de integridade referencial à tabela de pessoas antes de persistir cada oferta.",
    frontDesc: "Desenvolveu o formulário de cadastro de pessoa (nome e e-mail) integrado com POST /pessoas, incluindo feedback visual de confirmação.",
    github:    "https://github.com/patricksilva023",
    linkedin:  "https://www.linkedin.com/in/patricksilva023/",
    highlight: "O motor do projeto — mobilizou e entregou",
  },
  {
    name:      "Antonio Junio",
    role:      "Fullstack · Filtros & CRUD",
    avatar:    "AJ",
    color:     "#5b21b6",
    tags:      [{ icon: <IcServer />, label: "Filtros" }, { icon: <IcCode />, label: "CRUD Front" }],
    backDesc:  "Implementou filtros combinados em GET /conhecimentos por categoria e nível com busca case-insensitive, utilizando queries dinâmicas no Prisma.",
    frontDesc: "Criou o formulário de cadastro de conhecimento com operações de edição (PUT) e exclusão (DELETE), com atualização reativa da listagem.",
    github:    "https://github.com/Antoniofragajunior",
    linkedin:  "https://linkedin.com/in/",
    highlight: "Filtros inteligentes e CRUD completo no front",
  },
];

/**
 * SobreNos
 * Página que apresenta a equipe, suas contribuições técnicas e estatísticas do projeto.
 */
function SobreNos() {
  const headerRef = useReveal();
  const statsRef  = useReveal(100);

  return (
    <div className="sobre-nos">

      {/* Cabeçalho */}
      <div ref={headerRef} className="sobre-nos__header">
        <span className="sobre-nos__badge">A equipe</span>

        <h1 className="sobre-nos__title">
          Quem construiu o{" "}
          <span className="sobre-nos__title-gradient">Banco de Trocas</span>
        </h1>

        <p className="sobre-nos__subtitle">
          Projeto fullstack desenvolvido em equipe — cada membro contribuiu
          tanto no backend quanto no frontend.
        </p>
      </div>

      {/* Stats com AnimatedNumber */}
      <div ref={statsRef} className="sobre-nos__stats">
        {[
          { value: 5,   suffix: "",   label: "Membros"     },
          { value: 10,  suffix: "+",  label: "Rotas REST"  },
          { value: 2,   suffix: "",   label: "Entidades"   },
          { value: 100, suffix: "%",  label: "Colaborativo"},
        ].map((s) => (
          <div key={s.label} className="sobre-nos__stat">
            <span className="sobre-nos__stat-num">
              <AnimatedNumber value={s.value} suffix={s.suffix} duration={1800} />
            </span>
            <span className="sobre-nos__stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Grid de cards */}
      <div className="sobre-nos__grid">
        {team.map((member, index) => (
          <MemberCard key={member.name} member={member} index={index} />
        ))}
      </div>

      {/* Rodapé */}
      <div className="sobre-nos__footer">
        <p>
          Projeto desenvolvido como trabalho fullstack com{" "}
          <span className="sobre-nos__footer-highlight">Node.js + Express + Prisma</span>{" "}
          no backend e{" "}
          <span className="sobre-nos__footer-highlight">React + Vite</span>{" "}
          no frontend.
        </p>
      </div>
    </div>
  );
}

export default SobreNos;