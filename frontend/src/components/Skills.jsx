import { SKILL_GROUPS } from '../data/site.js';

export default function Skills() {
  return (
    <section id="skills">
      <div className="section-header reveal">
        <p className="section-num">02 — Skills</p>
        <h2 className="section-title">Technical<br /><span>arsenal.</span></h2>
      </div>
      <div className="skills-rows">
        {SKILL_GROUPS.map((group, i) => (
          <div className={`skill-row reveal reveal-delay-${(i % 5) + 1}`} key={group.name}>
            <div className="skill-row-head">
              <span className="skill-row-num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="skill-row-name">{group.name}</h3>
            </div>
            <ul className="skill-list" aria-label={`${group.name} technologies`}>
              {group.tags.map(tag => <li key={tag}>{tag}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
