from fastapi import APIRouter, Path

router = APIRouter(prefix="/v1/board", tags=["게시판"])

# GET /v1/board
@router.get("", description="게시판 설정 조회")
async def get_board_config():
    pass


@router.put("/{id}/edit", description="게시글 수정")
async def board_edit(
    id: int = Path(description="게시글 번호")
):
    pass

