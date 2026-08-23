# Portfolio API

FastAPI service behind the portfolio contact form. Receives messages from the frontend and stores them in PostgreSQL (Supabase).

## API Endpoints

Base URL in production: `https://portfolio-six-phi-7ekaz47rl0.vercel.app/api` (served through Vercel rewrites)

### `GET /api/health`

Liveness probe.

```json
{ "status": "ok" }
```

### `POST /api/contact`

Stores a contact form submission.

**Request body** (all validated by Pydantic):

| Field | Type | Rules |
|---|---|---|
| `name` | string | required, 1–100 chars |
| `company` | string? | optional, max 150 chars |
| `email` | string | required, valid email format (`EmailStr`) |
| `message` | string | required, 1–5000 chars |

```json
{
  "name": "Jane Doe",
  "company": "Acme Inc.",
  "email": "jane@acme.com",
  "message": "We would like to discuss a backend role."
}
```

**Responses:**

- `200` → `{ "message": "Success", "status": "ok" }`
- `422` → validation error details (FastAPI default format)
- `500` → `{ "detail": "Error saving to database" }` (database failure)

Interactive docs are available at `/docs` (Swagger UI) when running locally.

## Validation & Error Handling

- Request bodies are validated by a Pydantic model (`ContactForm`): field lengths, required fields and email format.
- Database failures are logged server-side and returned as HTTP 500 — the frontend distinguishes success/failure by status code.
- SQL access goes through SQLAlchemy Core inserts with parameter binding (no raw string interpolation).

## Database Architecture

Single table, auto-created on cold start (idempotent `CREATE TABLE IF NOT EXISTS`):

```
contacts
├── id          BIGINT IDENTITY PRIMARY KEY
├── name        TEXT NOT NULL
├── company     TEXT
├── email       TEXT NOT NULL
├── message     TEXT NOT NULL
└── created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
```

- Engine: SQLAlchemy with the psycopg3 driver
- Serverless-safe connection settings: prepared statements disabled (transaction pooler compatible), `pool_pre_ping` enabled, small pool size

## Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string, e.g. `postgresql://USER:PASSWORD@HOST:6543/postgres?sslmode=require`. Special characters in the password must be percent-encoded. |

Locally, the value is read from `.env` (project root or `backend/`). In production it is configured in Vercel project settings.

## Running Locally

```bash
pip install -r requirements.txt
uvicorn main:app --reload    # http://localhost:8000/docs
```

## Deployment

Deployed as a Vercel serverless function (Python runtime), wired to the frontend via rewrites in `vercel.json`:

```
/api/(.*)  →  backend/main.py : app
```
