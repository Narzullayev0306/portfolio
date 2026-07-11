import { useEffect, useState } from 'react'
import './index.css'



function App() {
  const [isLight, setIsLight] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const [openProjects, setOpenProjects] = useState({ 'proj-1': false, 'proj-2': false, 'proj-3': false });
  const [formStatus, setFormStatus] = useState('idle'); // idle, sending, success, error

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const preferLight = saved ? saved === 'light' : window.matchMedia('(prefers-color-scheme: light)').matches;
    setIsLight(preferLight);
    if (preferLight) {
      document.body.classList.add('light');
    }

    const handleScroll = () => {
      const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      setScrollProgress(pct);

      const sections = document.querySelectorAll('section[id]');
      let current = '';
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 100) current = s.id;
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);

    // Scroll reveal logic
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    const attachObservers = () => {
      const reveals = document.querySelectorAll('.reveal');
      reveals.forEach(r => observer.observe(r));
    };

    attachObservers();
    // Re-attach observers after a short delay to ensure all dynamic content is caught
    const timeoutId = setTimeout(attachObservers, 500);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, [openProjects]);

  const toggleTheme = () => {
    const newLight = !isLight;
    setIsLight(newLight);
    document.body.classList.toggle('light', newLight);
    localStorage.setItem('theme', newLight ? 'light' : 'dark');
  };

  const toggleProject = (id) => {
    setOpenProjects(prev => {
      const newState = { 'proj-1': false, 'proj-2': false, 'proj-3': false };
      newState[id] = !prev[id];
      return newState;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('http://localhost:8000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setFormStatus('success');
        e.target.reset();
        setTimeout(() => setFormStatus('idle'), 3000);
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 3000);
      }
    } catch (error) {
      console.error(error);
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };

  return (
    <>
      <div className="scroll-progress" id="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>

      <nav>
        <a href="#hero" className="nav-logo">I<span>.</span></a>
        <ul className="nav-links">
          <li><a href="#about" className={activeSection === 'about' ? 'active' : ''}>About</a></li>
          <li><a href="#skills" className={activeSection === 'skills' ? 'active' : ''}>Skills</a></li>
          <li><a href="#projects" className={activeSection === 'projects' ? 'active' : ''}>Projects</a></li>
          <li><a href="#experience" className={activeSection === 'experience' ? 'active' : ''}>Experience</a></li>
          <li><a href="#goals" className={activeSection === 'goals' ? 'active' : ''}>Goals</a></li>
        </ul>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button className="theme-toggle" id="theme-toggle" title="Toggle theme" onClick={toggleTheme}>
            {!isLight ? (
              <svg id="theme-icon-dark" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
            ) : (
              <svg id="theme-icon-light" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
            )}
          </button>
          <a href="#contact" className="nav-cta">Contact →</a>
        </div>
      </nav>

      <section id="hero">
        <div className="hero-grid"></div>
        <div className="hero-orb hero-orb-1"></div>
        <div className="hero-orb hero-orb-2"></div>

        <div className="hero-content">
          <div className="hero-tag">Available for opportunities</div>
          <h1 className="hero-name">Islom<br /><span>Narzullayev</span></h1>
          <p className="hero-title">Full-Stack Developer · <span className="highlight">Backend & AI Systems</span></p>
          <p className="hero-desc">Building scalable backend systems, AI-integrated enterprise platforms, and robust database architectures. Focused on real-world software that solves real problems.</p>
          <div className="hero-actions">
            <a href="#projects" className="btn-primary">View Projects →</a>
            <a href="#contact" className="btn-outline">Get in touch</a>
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

        <div className="hero-photo-wrapper">
          <div className="hero-photo-frame">
            <img src={isLight ? "/profile_light.png" : "/profile_dark.png"} alt="Islom Narzullayev" />
          </div>
          <div className="hero-photo-accent"></div>
        </div>
      </section>

      <div className="divider"></div>


      <section id="about">
        <div className="section-header reveal">
          <p className="section-num">01 — About</p>
          <h2 className="section-title">Engineer by<br /><span>mindset.</span></h2>
        </div>
        <div className="about-grid">
          <div className="about-text reveal reveal-delay-1">
            <p>I&apos;m a <strong>backend-focused full-stack developer</strong> with deep experience in building enterprise-grade software systems from the ground up — not just prototypes, but production systems used in real organizations.</p>
            <p>My work spans <strong>document automation, learning management, and CRM systems</strong> — always with a focus on clean architecture, scalable databases, and meaningful AI integration.</p>
            <p>I approach every project as an <strong>engineering problem first</strong>: understand the system requirements, design the data model, then build with precision. The frontend follows the backend&apos;s lead.</p>
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
          <div className="code-block reveal reveal-delay-2">
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

      <div className="divider"></div>

      <section id="skills">
        <div className="section-header reveal">
          <p className="section-num">02 — Skills</p>
          <h2 className="section-title">Technical<br /><span>arsenal.</span></h2>
        </div>
        <div className="skills-grid">
          <div className="skill-category reveal reveal-delay-1">
            <div className="skill-cat-title">Frontend</div>
            <div className="skill-tags">
              <span className="skill-tag">React</span>
              <span className="skill-tag">JavaScript</span>
              <span className="skill-tag">HTML/CSS</span>
              <span className="skill-tag">REST APIs</span>
            </div>
          </div>
          <div className="skill-category reveal reveal-delay-2">
            <div className="skill-cat-title">Backend</div>
            <div className="skill-tags">
              <span className="skill-tag">Node.js</span>
              <span className="skill-tag">Python</span>
              <span className="skill-tag">Express</span>
              <span className="skill-tag">FastAPI</span>
            </div>
          </div>
          <div className="skill-category reveal reveal-delay-3">
            <div className="skill-cat-title">Database</div>
            <div className="skill-tags">
              <span className="skill-tag">PostgreSQL</span>
              <span className="skill-tag">Supabase</span>
              <span className="skill-tag">SQL</span>
              <span className="skill-tag">Schema Design</span>
            </div>
          </div>
          <div className="skill-category reveal reveal-delay-4">
            <div className="skill-cat-title">AI / Data</div>
            <div className="skill-tags">
              <span className="skill-tag">NumPy</span>
              <span className="skill-tag">Pandas</span>
              <span className="skill-tag">Scikit-learn</span>
              <span className="skill-tag">Matplotlib</span>
              <span className="skill-tag">Seaborn</span>
            </div>
          </div>
          <div className="skill-category reveal reveal-delay-5">
            <div className="skill-cat-title">Tools & Systems</div>
            <div className="skill-tags">
              <span className="skill-tag">GitHub</span>
              <span className="skill-tag">Linux</span>
              <span className="skill-tag">Git</span>
              <span className="skill-tag">Kali Linux</span>
            </div>
          </div>
          <div className="skill-category reveal reveal-delay-1">
            <div className="skill-cat-title">Architecture</div>
            <div className="skill-tags">
              <span className="skill-tag">MVC</span>
              <span className="skill-tag">RBAC</span>
              <span className="skill-tag">SaaS</span>
              <span className="skill-tag">Microservices</span>
              <span className="skill-tag">REST</span>
            </div>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      <section id="projects">
        <div className="section-header reveal">
          <p className="section-num">03 — Projects</p>
          <h2 className="section-title">Built for<br /><span>production.</span></h2>
        </div>
        <div className="projects-list">

          <div className={`project-item reveal ${openProjects['proj-1'] ? 'open' : ''}`} id="proj-1">
            <div className="project-header" onClick={() => toggleProject('proj-1')}>
              <span className="project-num">01</span>
              <div className="project-meta">
                <div className="project-name">ET-Management System</div>
                <div className="project-brief">Enterprise AI document processing · East Telecom internal platform</div>
              </div>
              <div className="project-stack">
                <span className="stack-badge">Python</span>
                <span className="stack-badge">JavaScript</span>
                <span className="stack-badge">PostgreSQL</span>
                <span className="stack-badge">AI</span>
              </div>
              <div className="project-arrow">↓</div>
            </div>
            <div className="project-body" style={{ display: openProjects['proj-1'] ? 'block' : 'none' }}>
              <span className="project-status">Completed</span>
              <div className="project-case">
                <div className="case-block">
                  <h4>Problem</h4>
                  <ul>
                    <li>Manual contract processing across departments</li>
                    <li>No unified system for document tracking</li>
                    <li>Language barrier with Russian/English documents</li>
                    <li>No analytics on contract status or patterns</li>
                  </ul>
                </div>
                <div className="case-block">
                  <h4>Solution</h4>
                  <ul>
                    <li>AI-powered PDF scanning and structured data extraction</li>
                    <li>Multi-language translation pipeline (RU ↔ EN)</li>
                    <li>Natural language contract query system</li>
                    <li>Admin dashboard with status tracking and analytics</li>
                    <li>Role-based access control (RBAC) for departments</li>
                  </ul>
                </div>
                <div className="case-block">
                  <h4>Architecture</h4>
                  <ul>
                    <li>Python backend with AI/ML pipeline integration</li>
                    <li>PostgreSQL for structured contract data storage</li>
                    <li>REST API layer connecting frontend dashboard</li>
                    <li>Role-based authentication and authorization</li>
                  </ul>
                </div>
                <div className="case-block">
                  <h4>Impact</h4>
                  <ul>
                    <li>Deployed internally at East Telecom</li>
                    <li>Eliminated manual document categorization workflow</li>
                    <li>Centralized contract intelligence for management</li>
                    <li>First AI integration in company&apos;s internal tools</li>
                  </ul>
                </div>
              </div>
              <div className="project-tech-row">
                <span className="tech-pill">Python</span>
                <span className="tech-pill">JavaScript</span>
                <span className="tech-pill">PostgreSQL</span>
                <span className="tech-pill">PDF Processing</span>
                <span className="tech-pill">AI Integration</span>
                <span className="tech-pill">NLP</span>
                <span className="tech-pill">Translation API</span>
                <span className="tech-pill">RBAC</span>
              </div>
            </div>
          </div>

          <div className={`project-item reveal reveal-delay-1 ${openProjects['proj-2'] ? 'open' : ''}`} id="proj-2">
            <div className="project-header" onClick={() => toggleProject('proj-2')}>
              <span className="project-num">02</span>
              <div className="project-meta">
                <div className="project-name">University LMS System</div>
                <div className="project-brief">Full-scale learning management platform · University operations</div>
              </div>
              <div className="project-stack">
                <span className="stack-badge">Node.js</span>
                <span className="stack-badge">React</span>
                <span className="stack-badge">PostgreSQL</span>
                <span className="stack-badge">Supabase</span>
              </div>
              <div className="project-arrow">↓</div>
            </div>
            <div className="project-body" style={{ display: openProjects['proj-2'] ? 'block' : 'none' }}>
              <span className="project-status">Completed</span>
              <div className="project-case">
                <div className="case-block">
                  <h4>Problem</h4>
                  <ul>
                    <li>Existing university system was outdated and fragmented</li>
                    <li>No unified portal for students, professors, and admins</li>
                    <li>Manual enrollment and grading processes</li>
                    <li>No public-facing information portal</li>
                  </ul>
                </div>
                <div className="case-block">
                  <h4>Solution</h4>
                  <ul>
                    <li>4-tier role system: Admin / Professor / Student / Guest</li>
                    <li>Complete course management and grading module</li>
                    <li>Automated enrollment with conflict detection</li>
                    <li>Public university portal for prospective students</li>
                  </ul>
                </div>
                <div className="case-block">
                  <h4>Architecture</h4>
                  <ul>
                    <li>React frontend with role-based UI rendering</li>
                    <li>Node.js REST API with JWT authentication</li>
                    <li>PostgreSQL database with normalized schema</li>
                    <li>Supabase for real-time features and file storage</li>
                  </ul>
                </div>
                <div className="case-block">
                  <h4>Scale</h4>
                  <ul>
                    <li>Team of 4 developers, full collaboration</li>
                    <li>Designed to replace existing legacy system</li>
                    <li>Handles full university academic lifecycle</li>
                    <li>Modular architecture for future expansion</li>
                  </ul>
                </div>
              </div>
              <div className="project-tech-row">
                <span className="tech-pill">React</span>
                <span className="tech-pill">Node.js</span>
                <span className="tech-pill">PostgreSQL</span>
                <span className="tech-pill">Supabase</span>
                <span className="tech-pill">JWT Auth</span>
                <span className="tech-pill">Role-Based UI</span>
                <span className="tech-pill">REST API</span>
              </div>
            </div>
          </div>

          <div className={`project-item reveal reveal-delay-2 ${openProjects['proj-3'] ? 'open' : ''}`} id="proj-3">
            <div className="project-header" onClick={() => toggleProject('proj-3')}>
              <span className="project-num">03</span>
              <div className="project-meta">
                <div className="project-name">CRM System</div>
                <div className="project-brief">Course management CRM · SaaS-like architecture for educators</div>
              </div>
              <div className="project-stack">
                <span className="stack-badge">React</span>
                <span className="stack-badge">Node.js</span>
                <span className="stack-badge">PostgreSQL</span>
              </div>
              <div className="project-arrow">↓</div>
            </div>
            <div className="project-body" style={{ display: openProjects['proj-3'] ? 'block' : 'none' }}>
              <span className="project-status in-progress">In Progress</span>
              <div className="project-case">
                <div className="case-block">
                  <h4>Problem</h4>
                  <ul>
                    <li>Educators lack centralized tools for student management</li>
                    <li>Course scheduling done manually via spreadsheets</li>
                    <li>No visibility into payment status or student progress</li>
                    <li>No data-driven insights for business decisions</li>
                  </ul>
                </div>
                <div className="case-block">
                  <h4>Solution</h4>
                  <ul>
                    <li>Unified student tracking system with profiles</li>
                    <li>Dynamic course scheduling and conflict management</li>
                    <li>Analytics dashboard with KPI visualization</li>
                    <li>Integrated payment tracking module (planned)</li>
                  </ul>
                </div>
                <div className="case-block">
                  <h4>Architecture</h4>
                  <ul>
                    <li>SaaS-ready multi-tenant architecture</li>
                    <li>React dashboard with real-time data updates</li>
                    <li>Node.js API with business logic layer</li>
                    <li>PostgreSQL with row-level security</li>
                  </ul>
                </div>
                <div className="case-block">
                  <h4>Vision</h4>
                  <ul>
                    <li>Scalable for multiple education centers</li>
                    <li>White-label ready for B2B distribution</li>
                    <li>Analytics-first design for data-driven operators</li>
                    <li>Mobile-responsive for on-the-go management</li>
                  </ul>
                </div>
              </div>
              <div className="project-tech-row">
                <span className="tech-pill">React</span>
                <span className="tech-pill">Node.js</span>
                <span className="tech-pill">PostgreSQL</span>
                <span className="tech-pill">SaaS Architecture</span>
                <span className="tech-pill">Analytics</span>
                <span className="tech-pill">Multi-tenant</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      <div className="divider"></div>

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

      <div className="divider"></div>

      <section id="github" style={{ padding: '80px 5%' }}>
        <div className="github-card reveal">
          <div className="github-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text2)' }}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
          </div>
          <div className="github-info">
            <h3>Narzullayev0306</h3>
            <p>All projects, experiments, and contributions live on GitHub. Follow the work in progress.</p>
            <a href="https://github.com/Narzullayev0306" className="github-link" target="_blank" rel="noreferrer">
              github.com/Narzullayev0306 →
            </a>
          </div>
          <div className="github-stats">
            <div className="gh-stat">
              <div className="gh-stat-num">3</div>
              <div className="gh-stat-label">Major projects</div>
            </div>
            <div className="gh-stat">
              <div className="gh-stat-num">∞</div>
              <div className="gh-stat-label">Commits</div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider"></div>

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

      <div className="divider"></div>

      <section id="contact">
        <div className="contact-inner">
          <div className="section-header reveal">
            <p className="section-num">06 — Contact</p>
            <h2 className="section-title">Let&apos;s<br /><span>connect.</span></h2>
          </div>
          <div className="contact-grid reveal">
            <div className="contact-card">
              <span className="contact-card-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent)' }}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg></span>
              <h4>Email</h4>
              <a href="mailto:narzullayevislom21@gmail.com">narzullayevislom21@gmail.com</a>
            </div>
            <div className="contact-card">
              <span className="contact-card-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent)' }}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg></span>
              <h4>GitHub</h4>
              <a href="https://github.com/Narzullayev0306" target="_blank" rel="noreferrer">Narzullayev0306</a>
            </div>
            <div className="contact-card">
              <span className="contact-card-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent)' }}><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg></span>
              <h4>Telegram</h4>
              <a href="https://t.me/Name_N_I_N" target="_blank" rel="noreferrer">@Name_N_I_N</a>
            </div>
          </div>
          <form className="contact-form reveal reveal-delay-1" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Name</label>
                <input type="text" name="name" placeholder="Your name" required />
              </div>
              <div className="form-group">
                <label>Company</label>
                <input type="text" name="company" placeholder="Your company" />
              </div>
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" placeholder="your@email.com" required />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea name="message" placeholder="Tell me about the role or project..." required></textarea>
            </div>
            <button
              type="submit"
              className="btn-primary"
              style={{ alignSelf: 'flex-start', background: formStatus === 'success' ? 'var(--green)' : formStatus === 'error' ? 'red' : '' }}
              disabled={formStatus === 'sending'}
            >
              {formStatus === 'sending' ? 'Sending...' : formStatus === 'success' ? 'Message sent ✓' : formStatus === 'error' ? 'Error sending' : 'Send Message →'}
            </button>
          </form>
        </div>
      </section>

      <footer>
        <p>© 2025 Islom Narzullayev — Full-Stack Developer</p>
        <p>Tashkent, Uzbekistan · Open to remote & relocation</p>
      </footer>
    </>
  )
}

export default App
