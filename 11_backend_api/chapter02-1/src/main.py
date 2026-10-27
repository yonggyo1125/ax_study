import logging
from typing import Optional
from fastapi import FastAPI, Body, HTTPException, status
from pydantic import ValidationError
from book.presentation.schemas import BookCreate

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("book-service")


app = FastAPI(title="도서 관리 API")

@app.post("/books", status_code=status.HTTP_201_CREATED)
async def create_book(
    title: str = Body(...),
    author: Optional[str] = Body(None),
    price: int = Body(...)
):
    try:
        book = create_book(title, author, price)
        logger.info(f"book={book}")
    except ValidationError as err:
        logger.error(f"검증 실패: {str(err)}")