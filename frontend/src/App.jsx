import { useEffect, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import Experience from './components/Experience.jsx';
import GithubSection from './components/GithubSection.jsx';
import Goals from './components/Goals.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

function App() {
  const [isLight, setIsLight] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'light' : window.matchMedia('(prefers-color-scheme: light)').matches;
  });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrollProgress((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);

      let current = '';
      document.querySelectorAll('section[id]').forEach(s => {
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
      document.querySelectorAll('.reveal').forEach(r => observer.observe(r));
    };

    attachObservers();
    // Re-attach observers after a short delay to ensure all dynamic content is caught
    const timeoutId = setTimeout(attachObservers, 500);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('light', isLight);
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  }, [isLight]);

  const toggleTheme = () => setIsLight(prev => !prev);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>

      <div className="scroll-progress" id="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>

      <Navbar activeSection={activeSection} isLight={isLight} onToggleTheme={toggleTheme} />

      <main id="main">
        <Hero isLight={isLight} />
        <div className="divider"></div>
        <About />
        <div className="divider"></div>
        <Skills />
        <div className="divider"></div>
        <Projects />
        <div className="divider"></div>
        <Experience />
        <div className="divider"></div>
        <GithubSection />
        <div className="divider"></div>
        <Goals />
        <div className="divider"></div>
        <Contact />
      </main>

      <Footer />
    </>
  );
}

export default App;
