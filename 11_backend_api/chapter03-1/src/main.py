import logging
from typing import Dict, Annotated, Optional
from datetime import date
from fastapi.responses import JSONResponse
from fastapi import FastAPI, Path, Query, HTTPException, status, Request
from order.presentation.routers.v1.router import router as order_router


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("app")

app = FastAPI()

app.include_router(order_router)

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

class GroceryExpiredException(Exception):
    def __init__(self, name: str, expiration_date: date):
        self.name = name
        self.expiration_date = date


@app.exception_handler(GroceryExpiredException)
async def handle_exception(request: Request, exc: GroceryExpiredException):
    logger.error(f"에러발생: {str(exc)}")

    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content={
            "success": False,
            "message": f"식료품 {exc.name}은 유통기한({exc.expiration_date})이 지났습니다."
        }
    )

@app.get("/groceries/{item_id}")
async def get_grocery(
    item_id: Annotated[int, Path(..., description="상품")],
    keyword: Annotated[Optional[str], Query(description="키워드")] = None
):
    if item_id not in grocery_database:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="식료품을 찾을 수 없습니다."
        )

    logger.info(f"keyword={keyword}")

    item = grocery_database[item_id]
    if item["expiration_date"] < date.today():
        raise GroceryExpiredException(item['name'], item['expiration_date'])

    return item 