import os
from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker

DATABASE_URL = os.environ.get("DATABASE_URL", "sqlite:///./greens_nexus.db")

if DATABASE_URL.startswith("sqlite"):
    engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
else:
    import urllib.parse
    server   = os.environ.get("DB_SERVER", "greens-nexus-sql.database.windows.net")
    database = os.environ.get("DB_NAME",   "greens-nexus-db")
    username = os.environ.get("DB_USER",   "greensnexusadmin")
    password = os.environ.get("DB_PASS",   "")
    params   = urllib.parse.quote_plus(
        f"Driver={{ODBC Driver 18 for SQL Server}};"
        f"Server=tcp:{server},1433;"
        f"Database={database};"
        f"Uid={username};Pwd={password};"
        f"Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;"
    )
    engine = create_engine(f"mssql+pyodbc:///?odbc_connect={params}")

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Base(DeclarativeBase):
    pass


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
