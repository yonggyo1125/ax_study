import logging
from typing import Optional, List
from fastapi import FastAPI, Body, HTTPException, status
from pydantic import ValidationError
from book.presentation.schemas import BookCreate, BookResponse, APIResponse

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("book-service")


app = FastAPI(title="도서 관리 API")

# @app.post("/books", status_code=status.HTTP_201_CREATED)
# async def create_book(
#     title: str = Body(...),
#     author: Optional[str] = Body(None),
#     price: int = Body(...)
# ):
#     try:
#         book = BookCreate(title=title, author=author, price=price)
        
#         logger.info(f"book={book}")
#     except ValidationError as err:
#         logger.error(f"검증 실패: {str(err)}")

books = []

@app.post("/books", status_code=status.HTTP_201_CREATED)
async def create_book(payload: BookCreate):
    logger.info(f"BookCreate:{payload}")
    book = payload.model_dump(exclude_unset=True) # 입력한 값만 추출
    logger.info(f"book={book}, type: {type(book)}, 제목: {book['title']}")

    books.append({
        "title": payload.title,
        "author": payload.author,
        "price": payload.price
    })


@app.get("/books", response_model=APIResponse[List[BookResponse]])
async def get_book_all():
    return APIResponse(success=True, data=books)


# def test_fun(a, b, c = 10,*, d, e, f): 
#     # a, b, c -> 위치 매개변수
#     # d, e, f -> 반드시 키워드 매개변수