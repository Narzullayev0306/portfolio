"""
Database layer — Supabase PostgreSQL (shared pooler) ulanishi.

Connection string muhit o'zgaruvchisidan olinadi:
  DATABASE_URL=postgresql://USER:PASSWORD@HOST:6543/postgres?sslmode=require

Eslatma: parolda maxsus belgilar bo'lsa URL'da percent-encode qilinishi kerak
(masalan '@' -> '%40').
"""

import os

from dotenv import load_dotenv
from sqlalchemy import create_engine, text
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

# Lokal ishga tushirishda .env fayldan o'qish (Vercel'da env o'zi beriladi)
_ROOT_ENV = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), ".env")
_LOCAL_ENV = os.path.join(os.path.dirname(os.path.abspath(__file__)), ".env")
load_dotenv(_ROOT_ENV)
load_dotenv(_LOCAL_ENV)

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise RuntimeError(
        "DATABASE_URL topilmadi! Loyiha ildizida .env fayl yarating "
        "(.env.example namuna sifatida ko'ring) yoki uni environment variable sifatida bering."
    )

# SQLAlchemy uchun psycopg3 drayverini aniq ko'rsatamiz
SQLALCHEMY_URL = DATABASE_URL
if SQLALCHEMY_URL.startswith("postgresql://"):
    SQLALCHEMY_URL = SQLALCHEMY_URL.replace("postgresql://", "postgresql+psycopg://", 1)

# Serverless / transaction-pooler (port 6543) uchun:
#  - prepare_threshold=0 : prepared statement'larni o'chiradi (pooler bilan mos)
#  - pool_pre_ping       : uzilgan ulanishni avtomatik yangilaydi
engine = create_engine(
    SQLALCHEMY_URL,
    connect_args={"prepare_threshold": 0},
    pool_pre_ping=True,
    pool_size=2,
    max_overflow=3,
)


class Base(DeclarativeBase):
    pass


class Contact(Base):
    __tablename__ = "contacts"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str]
    company: Mapped[str | None]
    email: Mapped[str]
    message: Mapped[str]


def init_db() -> None:
    """Jadvallarni yaratadi (mavjud bo'lsa tegmaydi). Har bir cold start'da xavfsiz chaqiriladi."""
    with engine.begin() as conn:
        conn.execute(text(
            """
            CREATE TABLE IF NOT EXISTS contacts (
                id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                name       TEXT        NOT NULL,
                company    TEXT,
                email      TEXT        NOT NULL,
                message    TEXT        NOT NULL,
                created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
            )
            """
        ))
