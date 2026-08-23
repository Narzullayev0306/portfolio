import { useEffect, useState } from 'react';
import { NAV_LINKS } from '../data/site.js';

export default function Navbar({ activeSection, isLight, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    const desktopMq = window.matchMedia('(min-width: 901px)');
    const onDesktop = (e) => {
      if (e.matches) setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    desktopMq.addEventListener('change', onDesktop);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      desktopMq.removeEventListener('change', onDesktop);
    };
  }, [menuOpen]);

  return (
    <>
      <nav>
        <a href="#hero" className="nav-logo">I<span>.</span></a>
        <ul className="nav-links">
          {NAV_LINKS.map(link => (
            <li key={link.id}>
              <a href={`#${link.id}`} className={activeSection === link.id ? 'active' : ''}>{link.label}</a>
            </li>
          ))}
        </ul>
        <div className="nav-actions">
          <button className="theme-toggle" aria-label="Toggle color theme" onClick={onToggleTheme}>
            {!isLight ? (
              <svg viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
            ) : (
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
            )}
          </button>
          <a href="#contact" className="nav-cta">Contact →</a>
          <button
            type="button"
            className={`nav-toggle${menuOpen ? ' open' : ''}`}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(o => !o)}
          >
            <span className="nav-toggle-bar"></span>
            <span className="nav-toggle-bar"></span>
            <span className="nav-toggle-bar"></span>
          </button>
        </div>
      </nav>

      <div id="mobile-menu" className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <ul className="mobile-links">
          {NAV_LINKS.map((link, i) => (
            <li key={link.id} style={{ transitionDelay: menuOpen ? `${0.05 + i * 0.04}s` : '0s' }}>
              <a
                href={`#${link.id}`}
                className={activeSection === link.id ? 'active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#contact" className="mobile-menu-cta" onClick={() => setMenuOpen(false)}>Contact →</a>
      </div>
    </>
  );
}
