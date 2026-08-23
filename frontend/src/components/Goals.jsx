export default function Goals() {
  return (
    <section id="goals">
      <div className="section-header reveal">
        <p className="section-num">05 — Goals</p>
        <h2 className="section-title">The road<br /><span>ahead.</span></h2>
      </div>
      <div className="goals-grid">
        <div className="goal-card reveal reveal-delay-1">
          <span className="goal-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent)' }}><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /><path d="M7 8h.01M11 8h6M7 11h.01M11 11h6" /></svg></span>
          <h4>Backend Engineer</h4>
          <p>Specialize in backend and AI systems engineering at a senior level</p>
        </div>
        <div className="goal-card reveal reveal-delay-2">
          <span className="goal-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent)' }}><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg></span>
          <h4>International Career</h4>
          <p>Join a top-tier international software engineering team</p>
        </div>
        <div className="goal-card reveal reveal-delay-3">
          <span className="goal-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent)' }}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg></span>
          <h4>South Korea</h4>
          <p>Study and build a career in South Korea&apos;s tech ecosystem</p>
        </div>
        <div className="goal-card reveal reveal-delay-4">
          <span className="goal-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent)' }}><circle cx="12" cy="12" r="3" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07M8.46 8.46a5 5 0 0 0 0 7.07" /></svg></span>
          <h4>Enterprise Systems</h4>
          <p>Scale enterprise-level platforms that power real organizations</p>
        </div>
      </div>
    </section>
  );
}
