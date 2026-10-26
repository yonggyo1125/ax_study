import logging
from fastapi import FastAPI

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] (%(name)s) - %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S"
)

logger = logging.getLogger("app")
"""
.critial(..)
.error(...)
.warning(..)
.info(..)
.debug(..)
"""

app = FastAPI()

@app.get("/")
async def hello_world() -> dict:
    logger.info("로깅 연습, hello world!")

    return {
        "message": "Hello World"
    }