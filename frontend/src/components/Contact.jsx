import { useState } from 'react';
import { SOCIAL_LINKS } from '../data/site.js';

export default function Contact() {
  const [formStatus, setFormStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/contact', {
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
    <section id="contact">
      <div className="contact-inner">
        <div className="section-header reveal">
          <p className="section-num">06 — Contact</p>
          <h2 className="section-title">Have a project<br /><span>in mind?</span></h2>
        </div>
        <p className="contact-sub reveal">Let&apos;s build something useful together. Tell me about the role, the product or the problem you&apos;re solving — we&apos;ll figure out the rest.</p>
        <div className="contact-grid reveal">
          <div className="contact-card">
            <span className="contact-card-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent)' }}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg></span>
            <h4>Email</h4>
            <a href={`mailto:${SOCIAL_LINKS.email}`}>{SOCIAL_LINKS.email}</a>
          </div>
          <div className="contact-card">
            <span className="contact-card-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent)' }}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg></span>
            <h4>GitHub</h4>
            <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer">{SOCIAL_LINKS.githubHandle}</a>
          </div>
          <div className="contact-card">
            <span className="contact-card-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent)' }}><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg></span>
            <h4>Telegram</h4>
            <a href={SOCIAL_LINKS.telegram} target="_blank" rel="noreferrer">{SOCIAL_LINKS.telegramHandle}</a>
          </div>
        </div>
        <form className="contact-form reveal reveal-delay-1" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="cf-name">Name</label>
              <input id="cf-name" type="text" name="name" placeholder="Your name" required autoComplete="name" />
            </div>
            <div className="form-group">
              <label htmlFor="cf-company">Company</label>
              <input id="cf-company" type="text" name="company" placeholder="Your company" autoComplete="organization" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="cf-email">Email</label>
            <input id="cf-email" type="email" name="email" placeholder="your@email.com" required autoComplete="email" />
          </div>
          <div className="form-group">
            <label htmlFor="cf-message">Message</label>
            <textarea id="cf-message" name="message" placeholder="Tell me about the role or project..." required></textarea>
          </div>
          <button
            type="submit"
            className={`btn-primary contact-submit${formStatus === 'sending' ? ' is-sending' : ''}`}
            style={{ background: formStatus === 'success' ? 'var(--green)' : formStatus === 'error' ? 'red' : '' }}
            disabled={formStatus === 'sending'}
          >
            {formStatus === 'sending' ? 'Sending...' : formStatus === 'success' ? 'Message sent ✓' : formStatus === 'error' ? 'Error sending' : 'Send Message →'}
          </button>
        </form>
      </div>
    </section>
  );
}
