from pydantic import BaseModel, Field
from typing import Optional

class BookCreate(BaseModel):
    title: str = Field(..., min_length=2, max_length=100, description="책 제목")
    author: str = Field(..., min_length=2, max_length=50, description="저자")
    price: Optional[int] = Field(None, description="책 가격", gt=0) 

class BookResponse(BaseModel):
    title: str
    author: str
    price: int