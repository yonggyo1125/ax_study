import logging
from typing import Dict
from datetime import date
from fastapi import FastAPI, Path, Query

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("app")

app = FastAPI()

grocery_database: Dict[int, dict] = {
    1: {
        "id": 1,
        "name": "사과",
        "category": "과일",
        "price": 2500,
        "quantity": 80,
        "expiration_date": date(2026, 12, 31)
    },
    2: {
        "id": 2,
        "name": "유기농 우유",
        "category": "유제품",
        "price": 3800,
        "quantity": 1,
        "expiration_date": date(2026, 7, 5)
    }
}

@app.get("/groceries/{item_id}")
async def get_grocery(
    item_id: int = Path(..., description="상품 ID")
):
    return grocery_database[item_id]