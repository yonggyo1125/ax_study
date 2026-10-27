import logging
from pydantic import BaseModel, Field, field_validator, model_validator, ValidationError
from typing import Optional, Self, Generic, TypeVar

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__file__)

T = TypeVar('T')

class BookCreate(BaseModel):
    title: str = Field(..., min_length=2, max_length=100, description="책 제목")
    author: str = Field(..., min_length=2, max_length=50, description="저자")
    price: Optional[int] = Field(None, description="책 가격", gt=0)

    @field_validator("title", "author")
    @classmethod
    def trim_and_validate(cls, value: str) -> str:
        trimed_text = value.strip()
        if len(trimed_text) < 2:
            raise ValueError("공백없이 2자 이상 입력하세요.")

        return trimed_text

    @model_validator(mode="before")
    def before_validate(self) -> Self:
        logger.info(f"[BEFORE]: {self}")

        return self

    @model_validator(mode="after")
    def after_validate(self) -> Self:
        logger.info(f"[AFTER]: {self}")

        return self

class BookResponse(BaseModel):
    title: str
    author: str
    price: Optional[int] = None


class APIResponse(BaseModel, Generic[T]):
    success: bool = Field(..., description="처리 성공 여부")
    error: Optional[str] = Field(None, description="실패 오류 메세지")
    data: Optional[T] = Field(None, description="성공시 응답 데이터")