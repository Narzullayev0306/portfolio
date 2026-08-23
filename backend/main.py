import os
from contextlib import asynccontextmanager

from database import Contact, engine, init_db
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Cold start'da jadvallarni yaratish (idempotent)
    init_db()
    yield


app = FastAPI(title="Portfolio API", lifespan=lifespan)

# CORS: frontend boshqa domenda bo'lsa ham ishlashi uchun
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ContactForm(BaseModel):
    name: str
    company: str | None = None
    email: str
    message: str



@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.post("/api/contact")
def contact(form: ContactForm):
    try:
        with engine.begin() as conn:
            conn.execute(
                Contact.__table__.insert().values(
                    name=form.name,
                    company=form.company,
                    email=form.email,
                    message=form.message,
                )
            )
    except Exception as exc:
        print(f"DB error: {exc}")
        return {"message": "Error saving to database", "status": "error"}

    print(f"Successfully saved message from {form.name} to PostgreSQL")
    return {"message": "Success", "status": "ok"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", 8000)))
