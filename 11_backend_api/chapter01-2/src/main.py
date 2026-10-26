import logging
from fastapi import FastAPI, Body, status, HTTPException
from book.domain.book import Book

logging.basicConfig(level=logging.INFO)

logger = logging.getLogger("book_app")

app = FastAPI(
    title="도서 대출 서비스",
    description="서비스에 대한 설명....",
    version="0.0.1"
)

in_memory_db: dict = {}
id_generator: int = 1

@app.post("/books", status_code=status.HTTP_201_CREATED)
async def create_book(
    title: str = Body(..., description="등록할 책의 이름"), # 필수 입력
    author: str = Body(..., description="등록할 책의 저자")
):
    global id_generator
    logger.info(f"신규 도서 등록: 제목 = {title}, 저자 = {author}")

    try:
        new_book = Book.create(id_generator, title, author, 'AVAILABLE')
        
        logger.info(f"신규 도서 등록 성공: 제목 = {title}, 저자 = {author}")

        id_generator += 1
        return new_book.to_dict()
    except ValueError as err:
        
        logger.error(f"신규 도서 등록 실패: {str(err)}")

        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(err))
