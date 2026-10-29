"""
GET /v1/order  -> 주문목록
GET /v1/order/{id} -> 주문 상세보기
PATCH /v1/order/{id}/change -> 주문상태 변경, Body { status: .... }
"""

from fastapi import APIRouter, Path, Body, Header, HTTPException, Depends
import logging
logger = logging.getLogger("TEST")

# 요청 헤더명 X-TOKEN
def verify_secret_token(x_token: str | None = Header(None)):
    if x_token != "secret":
        raise HTTPException(status_code=403, detail="토큰이 잘못되었습니다.")

router = APIRouter(prefix="/v1/order", tags=["주문", "태그1"], dependencies=[Depends(verify_secret_token)])

def test_fun() -> str:
    logger.warning("test_fun() 호출")
    
    return "test_fun"

@router.get("")
async def get_orders():
    pass

@router.get("/{id}")
async def get_order_view(
    id: int = Path(description="주문번호")
):
    pass

@router.patch("/{id}/change")
async def change_order(
    id: int = Path(description="주문번호"),
    status: str = Body(description="변경할 주문 상태")
):
    pass
