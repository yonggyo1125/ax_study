"""
GET /v1/order  -> 주문목록
GET /v1/order/{id} -> 주문 상세보기
PATCH /v1/order/{id}/change -> 주문상태 변경, Body { status: .... }
"""

from fastapi import APIRouter, Path, Body

router = APIRouter(prefix="/v1/order", tags=["주문"])

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
