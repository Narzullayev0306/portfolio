export default function Experience() {
  return (
    <section id="experience">
      <div className="section-header reveal">
        <p className="section-num">04 — Experience</p>
        <h2 className="section-title">Real systems,<br /><span>real impact.</span></h2>
      </div>
      <div className="exp-grid">
        <div className="exp-card reveal reveal-delay-1">
          <div className="exp-card-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /></svg>
          </div>
          <h3>Enterprise Software Development</h3>
          <p>Built and deployed internal software for East Telecom — a production system used by real teams in a corporate environment, not a classroom project.</p>
        </div>
        <div className="exp-card reveal reveal-delay-2">
          <div className="exp-card-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
          </div>
          <h3>Team-Based Engineering</h3>
          <p>Worked in a team of 4 developers on the University LMS, coordinating architecture decisions, managing merge conflicts, and maintaining code standards.</p>
        </div>
        <div className="exp-card reveal reveal-delay-3">
          <div className="exp-card-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10" /><path d="M12 6v6l4 2" /><path d="M18 2l4 4-4 4" /><path d="M22 6h-6" /></svg>
          </div>
          <h3>AI Systems Integration</h3>
          <p>Integrated AI/ML pipelines into business workflows — not just experimentation, but functional systems solving real document processing challenges.</p>
        </div>
        <div className="exp-card reveal reveal-delay-4">
          <div className="exp-card-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" /></svg>
          </div>
          <h3>Database Architecture Design</h3>
          <p>Designed relational database schemas from scratch for complex multi-entity systems, including role-based access models and performance-aware query design.</p>
        </div>
      </div>
    </section>
  );
}
