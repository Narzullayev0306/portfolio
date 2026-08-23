export default function Hero({ isLight }) {
  return (
    <section id="hero">
      <div className="hero-grid"></div>
      <div className="hero-orb hero-orb-1"></div>
      <div className="hero-orb hero-orb-2"></div>

      <div className="hero-content">
        <div className="hero-tag">Available for opportunities</div>
        <h1 className="hero-name">Islom<br /><span>Narzullayev</span></h1>
        <p className="hero-title">Full-Stack Developer · <span className="highlight">Backend &amp; AI Systems</span></p>
        <p className="hero-desc">I build scalable backend systems and AI-integrated platforms that real organizations run on — from document automation at East Telecom to a full university LMS.</p>
        <div className="hero-actions">
          <a href="#projects" className="btn-primary">View My Work →</a>
          <a href="#contact" className="btn-outline">Let&apos;s Connect</a>
        </div>

        <div className="hero-photo-wrapper">
          <div className="hero-photo-frame">
            <img
              src={isLight ? '/profile_light.png' : '/profile_dark.png'}
              alt="Islom Narzullayev"
              width="300"
              height="370"
              decoding="async"
            />
          </div>
          <div className="hero-photo-accent"></div>
        </div>

        <div className="hero-stats">
          <div className="stat-item">
            <div className="stat-num">3<span>+</span></div>
            <div className="stat-label">Enterprise projects</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">4<span>+</span></div>
            <div className="stat-label">Tech stacks</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">∞</div>
            <div className="stat-label">Problems solved</div>
          </div>
        </div>
      </div>
    </section>
  );
}
