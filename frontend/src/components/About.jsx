export default function About() {
  return (
    <section id="about">
      <div className="section-header reveal">
        <p className="section-num">01 — About</p>
        <h2 className="section-title">Engineer by<br /><span>mindset.</span></h2>
      </div>
      <div className="about-grid">
        <div className="about-text reveal reveal-delay-1">
          <p>I got into engineering because I wanted to understand how <strong>real systems work</strong> — not demo projects, but the software organizations depend on every day. That curiosity pulled me toward the backend, where systems are actually won or lost.</p>
          <p>Today I build exactly that: <strong>document automation, learning management and CRM platforms</strong> used by real teams — designed around clean architecture, scalable databases, and AI that earns its place instead of decorating a feature list.</p>
          <p>I treat every project as an <strong>engineering problem first</strong>: understand the requirements, design the data model, then build with precision. That discipline is what I bring to every team I join.</p>
          <div className="about-features">
            <div className="about-feature">
              <div className="about-feature-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
              </div>
              <div className="about-feature-text">
                <h4>Scalable Architecture</h4>
                <p>Designing systems that grow with the business, not against it</p>
              </div>
            </div>
            <div className="about-feature">
              <div className="about-feature-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>
              </div>
              <div className="about-feature-text">
                <h4>AI Integration</h4>
                <p>Embedding intelligence into existing enterprise workflows</p>
              </div>
            </div>
            <div className="about-feature">
              <div className="about-feature-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" /></svg>
              </div>
              <div className="about-feature-text">
                <h4>Database Architecture</h4>
                <p>PostgreSQL-first, schema-driven, performance-aware</p>
              </div>
            </div>
          </div>
        </div>

        <div className="code-block reveal reveal-delay-2" aria-label="Developer profile as JSON">
          <div className="code-header">
            <div className="code-dot red"></div>
            <div className="code-dot yellow"></div>
            <div className="code-dot green"></div>
            <span className="code-filename">developer.json</span>
          </div>
          <div className="code-body">
            <div className="code-line"><span className="code-ln">1</span><span><span className="kw">{'{'}</span></span></div>
            <div className="code-line"><span className="code-ln">2</span><span>&nbsp;&nbsp;<span className="prop">&quot;name&quot;</span>: <span className="str">&quot;Islom Narzullayev&quot;</span>,</span></div>
            <div className="code-line"><span className="code-ln">3</span><span>&nbsp;&nbsp;<span className="prop">&quot;role&quot;</span>: <span className="str">&quot;Full-Stack Developer&quot;</span>,</span></div>
            <div className="code-line"><span className="code-ln">4</span><span>&nbsp;&nbsp;<span className="prop">&quot;focus&quot;</span>: [</span></div>
            <div className="code-line"><span className="code-ln">5</span><span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="str">&quot;Backend Systems&quot;</span>,</span></div>
            <div className="code-line"><span className="code-ln">6</span><span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="str">&quot;AI Integration&quot;</span>,</span></div>
            <div className="code-line"><span className="code-ln">7</span><span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="str">&quot;Database Architecture&quot;</span></span></div>
            <div className="code-line"><span className="code-ln">8</span><span>&nbsp;&nbsp;],</span></div>
            <div className="code-line"><span className="code-ln">9</span><span>&nbsp;&nbsp;<span className="prop">&quot;languages&quot;</span>: {'{'}</span></div>
            <div className="code-line"><span className="code-ln">10</span><span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="prop">&quot;uzbek&quot;</span>: <span className="str">&quot;native&quot;</span>,</span></div>
            <div className="code-line"><span className="code-ln">11</span><span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="prop">&quot;tajik&quot;</span>: <span className="str">&quot;native&quot;</span>,</span></div>
            <div className="code-line"><span className="code-ln">12</span><span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="prop">&quot;russian&quot;</span>: <span className="str">&quot;fluent understanding&quot;</span>,</span></div>
            <div className="code-line"><span className="code-ln">13</span><span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="prop">&quot;korean&quot;</span>: <span className="str">&quot;TOPIK 4&quot;</span>,</span></div>
            <div className="code-line"><span className="code-ln">14</span><span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="prop">&quot;english&quot;</span>: <span className="str">&quot;beginner&quot;</span></span></div>
            <div className="code-line"><span className="code-ln">15</span><span>&nbsp;&nbsp;{'}'},</span></div>
            <div className="code-line"><span className="code-ln">16</span><span>&nbsp;&nbsp;<span className="prop">&quot;target&quot;</span>: <span className="str">&quot;International Engineering&quot;</span>,</span></div>
            <div className="code-line"><span className="code-ln">17</span><span>&nbsp;&nbsp;<span className="prop">&quot;status&quot;</span>: <span className="val">&quot;available&quot;</span></span></div>
            <div className="code-line"><span className="code-ln">18</span><span><span className="kw">{'}'}</span></span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
