# Islom Narzullayev — Portfolio

Modern, responsive personal portfolio website for **Islom Narzullayev** — Full-Stack Developer specializing in backend systems and AI integration.

**Live Demo → [portfolio-six-phi.vercel.app](https://portfolio-six-phi-7ekaz47rl0.vercel.app)**

## Features

- **Dark / Light mode** with system-preference detection and localStorage persistence
- **Fully responsive** — tested from 320px phones to ultrawide desktops, hamburger navigation on mobile
- **Interactive project showcase** — browser-style previews and expandable case studies per project
- **Scroll-reveal animations** with full `prefers-reduced-motion` support
- **Accessible** — semantic landmarks, skip link, keyboard-friendly menu, ARIA states
- **Working contact form** backed by a FastAPI service and PostgreSQL (Supabase)
- **SEO ready** — meta tags, Open Graph / Twitter cards, favicon

## Tech Stack

| Layer | Tools |
|---|---|
| Frontend | React 19, Vite 8, plain CSS (custom design system) |
| Backend | Python, FastAPI |
| Database | PostgreSQL (Supabase), SQLAlchemy |
| Deployment | Vercel (frontend + serverless backend) |

## Project Structure

```
├── frontend/               # React SPA (Vite)
│   ├── public/             # Static assets (profile photos, favicon)
│   └── src/
│       ├── components/     # One component per page section
│       │   ├── Navbar.jsx      # Nav + mobile menu + theme toggle
│       │   ├── Hero.jsx
│       │   ├── About.jsx
│       │   ├── Skills.jsx
│       │   ├── Projects.jsx    # Showcase cards + case studies
│       │   ├── Experience.jsx
│       │   ├── GithubSection.jsx
│       │   ├── Goals.jsx
│       │   ├── Contact.jsx     # Contact form
│       │   └── Footer.jsx
│       ├── data/
│       │   ├── site.js         # Nav links, skills, social links
│       │   └── projects.js     # Project content & case studies
│       ├── styles/             # CSS organized by concern, imported in order
│       │   ├── variables.css   # Design tokens (colors, spacing, fonts)
│       │   ├── base.css        # Reset, global focus, skip link
│       │   ├── navbar.css
│       │   ├── hero.css
│       │   ├── sections.css
│       │   └── responsive.css  # Media queries + reduced motion
│       ├── App.jsx             # Composition + theme + scroll logic
│       └── main.jsx            # Entry point
├── backend/                # FastAPI service
│   ├── main.py                 # API entrypoint (/api/contact)
│   └── database.py             # SQLAlchemy models (Supabase)
└── vercel.json             # Monorepo deploy config
```

## Getting Started

```bash
# 1. Frontend
cd frontend
npm install
npm run dev          # http://localhost:5173

# 2. Backend (optional — needed only for the contact form)
cd ../backend
pip install -r requirements.txt
uvicorn main:app --reload
```

Environment variable for the backend:

```
DATABASE_URL=postgresql://...   # Supabase connection string
```

## Author

**Islom Narzullayev**

- Portfolio: [portfolio-six-phi.vercel.app](https://portfolio-six-phi-7ekaz47rl0.vercel.app)
- GitHub: [@Narzullayev0306](https://github.com/Narzullayev0306)
- Telegram: [@Name_N_I_N](https://t.me/Name_N_I_N)
- Email: narzullayevislom21@gmail.com

Tashkent, Uzbekistan · Open to remote work and relocation.
