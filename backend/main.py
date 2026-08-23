import logging
import os
from contextlib import asynccontextmanager

from database import Contact, engine, init_db
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field

logger = logging.getLogger("portfolio.api")
logging.basicConfig(level=logging.INFO)


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield


app = FastAPI(
    title="Portfolio API",
    description="Backend service for the portfolio contact form. Stores messages in PostgreSQL (Supabase).",
    version="1.1.0",
    lifespan=lifespan,
)

# Same-origin rewrites serve /api/* in production; CORS stays open for external clients
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


class ContactForm(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    company: str | None = Field(default=None, max_length=150)
    email: EmailStr
    message: str = Field(min_length=1, max_length=5000)


class ContactResponse(BaseModel):
    message: str
    status: str


class HealthResponse(BaseModel):
    status: str


@app.get("/api/health", response_model=HealthResponse, tags=["system"])
def health():
    return HealthResponse(status="ok")


@app.post("/api/contact", response_model=ContactResponse, tags=["contact"])
def contact(form: ContactForm):
    try:
        with engine.begin() as conn:
            conn.execute(
                Contact.__table__.insert().values(
                    name=form.name.strip(),
                    company=(form.company or "").strip() or None,
                    email=form.email,
                    message=form.message.strip(),
                )
            )
    except Exception:
        logger.exception("Failed to save contact message")
        raise HTTPException(status_code=500, detail="Error saving to database")

    logger.info("Contact message saved from %s", form.email)
    return ContactResponse(message="Success", status="ok")


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", 8000)))
