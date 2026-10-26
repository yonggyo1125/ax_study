""" 요구사항 분석 
1. 도서 대여점의 도서는 2가지 상태로 관리가 된다.
   (대출중(RENTED), 대출가능(AVAILABLE)) - O
2. 대출중인 도서는 대여가 불가능 - O
3. 소규모 대여점이라서 도서별 재고는 1개씩만 있어서 관리를 하지 않는다.
4. 도서 번호, 제목, 저자의 정보를 확인할 수 있고... - O
"""
from datetime import datetime

class Book:
    def __init__(self, book_id: int, title: str, author: str, status: str):

        self.id = book_id
        self.title = title
        self.author = author
        self.status = status

    @classmethod
    def create(self, book_id: int, title: str, author: str, status: str):
        # 도서의 상태는 AVAILABLE, RENTED 한정해야 한다.
        if status not in ['AVAILABLE', 'RENTED']:
            raise ValueError("허용되지 않는 도서 상태입니다.")

        if not title or not title.strip():
            raise ValueError("도서의 제목은 필수항목 입니다.")

        if not author or not author.strip():
            raise ValueError("도서의 저자는 필수항목 입니다.")

        book = Book(book_id, title, author, status)
        book.created_at = datetime.now()

        return book

    def rent(self):
        if self.status != 'AVAILABLE':
            raise ValueError("대출 가능한 도서가 아닙니다.")

        self.status = 'RENTED'


    def returnBook(self):
        if self.status != 'RENTED':
            raise ValueError("대출중인 도서가 아닙니다.")
        
        self.status = 'AVAILABLE'

    def to_dict(self) -> dict:
        """
        네트워크로 전송할 수 있도록 도메인 객체를 기본 딕셔너리로 가공합니다.
        """
        return {
            "id": self.id,
            "title": self.title,
            "author": self.author,
            "status": self.status,
            "created_at": self.created_at.isoformat()
        }