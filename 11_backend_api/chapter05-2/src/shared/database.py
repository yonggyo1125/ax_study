import os
from dotenv import load_dotenv


load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+asyncpg//postgres:postgres@localhost:5432/postgres")
POOL_SIZE = int(os.getenv("POOL_SIZE", "10"))
MAX_POOL_SIZE = int(os.getenv("MAX_POOL_SIZE", "15"))