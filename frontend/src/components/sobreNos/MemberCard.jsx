import useReveal from "../../hooks/useReveal";
import { IcGithub, IcLinkedin, IcCode, IcServer } from "./SobreNosIcons";
import "../../styles/sobreNos.css";

/**
 * MemberCard
 * Card individual de um membro da equipe com animação de entrada escalonada.
 */
function MemberCard({ member, index }) {
  const ref = useReveal(index * 100);

  return (
    <article ref={ref} className="member-card" style={{ "--member-color": member.color }}>
      {/* Faixa colorida no topo */}
      <div className="member-card__stripe" />

      <div className="member-card__body">
        {/* Cabeçalho: avatar + nome + cargo + redes sociais */}
        <div className="member-card__header">
          <div className="member-card__avatar">
            {member.avatar}
          </div>

          <div className="member-card__info">
            <span className="member-card__name">{member.name}</span>
            <span className="member-card__role">{member.role}</span>
          </div>

          <div className="member-card__socials">
            <a
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
              className="member-card__social-btn member-card__social-btn--github"
            >
              <IcGithub />
            </a>
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
              className="member-card__social-btn member-card__social-btn--linkedin"
            >
              <IcLinkedin />
            </a>
          </div>
        </div>

        {/* Tags de tecnologias */}
        <div className="member-card__tags">
          {member.tags.map((tag) => (
            <span key={tag.label} className="member-card__tag">
              {tag.icon} {tag.label}
            </span>
          ))}
        </div>

        {/* Contribuições backend e frontend */}
        <div className="member-card__contributions">
          <div className="member-card__contrib-block">
            <span className="member-card__contrib-label">
              <IcServer /> Backend
            </span>
            <p className="member-card__contrib-text">{member.backDesc}</p>
          </div>

          <div className="member-card__divider" />

          <div className="member-card__contrib-block">
            <span className="member-card__contrib-label">
              <IcCode /> Frontend
            </span>
            <p className="member-card__contrib-text">{member.frontDesc}</p>
          </div>
        </div>

        {/* Frase de destaque */}
        <div className="member-card__highlight">
          "{member.highlight}"
        </div>
      </div>
    </article>
  );
}

export default MemberCard;