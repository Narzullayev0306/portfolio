# Portfolio

Shaxsiy portfolio veb-sayti: **React/Vite** frontend + **FastAPI** backend + **Supabase PostgreSQL** ma'lumotlar bazasi.

Vercel'da **Services** rejimida bitta proyekt sifatida deploy qilingan:

- Frontend: https://portfolio-six-phi-7ekaz47rl0.vercel.app
- API: `/api/*` so'rovlar avtomatik backend service'ga yo'naltiriladi (`vercel.json` ichidagi `rewrites`)

## Loyiha tuzilishi

```
portfolio/
├── frontend/            # React + Vite (Vercel "frontend" service)
│   └── src/App.jsx      # Kontakt formasi /api/contact ga relative fetch qiladi
├── backend/
│   ├── main.py          # FastAPI ilovasi (Vercel "backend" service, entrypoint: main:app)
│   ├── database.py      # SQLAlchemy engine + Contact modeli + jadval yaratish
│   └── requirements.txt # Python kutubxonalari
├── vercel.json          # Services konfiguratsiyasi + routing
├── .env                 # Lokal maxfiy kalitlar (git-ga kirmaydi!)
└── .env.example         # Namuna
```

## Muhit o'zgaruvchilari

Loyiha ildizida `.env` fayl yarating (`.env.example` dan nusxa oling):

```ini
DATABASE_URL=postgresql://USER:PASSWORD@aws-0-ap-northeast-2.pooler.supabase.com:6543/postgres?sslmode=require
```

> Parolda maxsus belgilar bo'lsa URL'da percent-encode qiling: `@` → `%40`, `#` → `%23`.

Vercel'da esa xuddi shu o'zgaruvchi Project Settings → Environment Variables bo'limida saqlanadi.

## Lokal ishga tushirish

### 1. Backend (port 8000)

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```

### 2. Frontend (port 5173)

```bash
cd frontend
npm install
npm run dev
```

Vite `/api` so'rovlarini avtomatik `http://localhost:8000` ga proxy qiladi (`vite.config.js`).

## Vercel'ga deploy qilish

```bash
npx vercel --prod
```

## API endpointlar

| Metod | Yo'l           | Tavsif                          |
|-------|----------------|---------------------------------|
| GET   | `/api/health`  | Servis holati                   |
| POST  | `/api/contact` | Kontakt formasi xabarini DB'ga saqlash |

Jadval (`contacts`) birinchi so'rovda avtomatik yaratiladi — qo'lda SQL yozish shart emas.

## Eslatmalar

- `.env`, `venv/`, `node_modules/`, `*.log` Git-ga kirmaydi
- Supabase shared pooler (port 6543) serverless funksiyalar uchun ishlatiladi
