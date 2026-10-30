import os
import logging
import aiofiles
import asyncio
from urllib.parse import quote
from pathlib import Path
from fastapi.responses import StreamingResponse
from fastapi import FastAPI, UploadFile, File, HTTPException, status, BackgroundTasks
from domain.archive import MultimediaAsset
from schemas.archive import AssetResponseSchema
from typing import Dict, AsyncGenerator

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("app")

app = FastAPI()

MEDIA_STORAGE_DIR = Path("storage")
MEDIA_STORAGE_DIR.mkdir(parents=True, exist_ok=True)

asset_repository: Dict[int, MultimediaAsset] = {}
asset_id_sequence = 1

@app.post("/assets", response_model=AssetResponseSchema, status_code=status.HTTP_201_CREATED)
async def upload_asset(file: UploadFile = File(description="업로드 파일")):
    global asset_id_sequence

    logger.info(f"업로드 파일 정보:{file}")

    raw_filename = os.path.basename(file.filename) # 업로드한 파일명만 추출 
    physical_target_path = MEDIA_STORAGE_DIR / f"seq_{asset_id_sequence}_{raw_filename}"

    try:
        async with aiofiles.open(physical_target_path, "wb") as local_disk_file:
            while True:
                binary_chunk = await file.read(1024 * 1024)
                if not binary_chunk: # 다 읽어온 경우 
                    break

                await local_disk_file.write(binary_chunk)

        await file.close()

        new_asset = MultimediaAsset(
            asset_id=asset_id_sequence,
            filename=raw_filename,
            file_size=physical_target_path.stat().st_size,
            content_type=file.content_type
        )

        asset_repository[asset_id_sequence] = new_asset

        asset_id_sequence += 1
        return new_asset.to_dict()
    except Exception as err:
        # 파일 업로드 실패
        if physical_target_path.exists():
            os.remove(physical_target_path)

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"파일 업로드 실패: {str(err)}"
        )


async def get_file_chunk(file_path: Path, chunk_size: int = 1024 * 1024) -> AsyncGenerator[bytes, None]:
    async with aiofiles.open(file_path, "rb") as out_file:
        while True:
            chunk = await out_file.read(chunk_size)
            if not chunk:
                break

            yield chunk


@app.get("/assets/{asset_id}/download")
async def file_download(asset_id: int):
    asset = asset_repository.get(asset_id)
    if not asset:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="파일을 찾을 수 업습니다."
        )

    physical_target_path = MEDIA_STORAGE_DIR / f"seq_{asset.id}_{asset.filename}"

    if not physical_target_path.exists():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="파일을 찾을 수 업습니다."
        )

    filename = quote(asset.filename) # RFC 5987
    headers = {
        "Content-Disposition": f"attachment; filename*=UTF-8''{filename}",
        "Content-Length": str(asset.file_size),
        "Cache-Control": "no-cache"

    }

    return StreamingResponse(
        get_file_chunk(physical_target_path),
        media_type=asset.content_type,
        headers=headers
    )


async def send_email(email: str):
    await asyncio.sleep(6)
    logger.info("회원가입 안내 메일 전송 완료...")


@app.get("/signup")
async def signup_done(background_tasks: BackgroundTasks):

    background_tasks.add_task(send_email, "test@test.org")

    return {"message": "회원가입 완료 되었습니다."}