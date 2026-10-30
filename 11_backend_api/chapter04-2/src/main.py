import logging
import aiofiles
from pathlib import Path
from fastapi import FastAPI, UploadFile, File, HTTPException, status
from domain.archive import MultimediaAsset
from schemas.archive import AssetResponseSchema
from typing import Dict

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("app")

app = FastAPI()

MEDIA_STORAGE_DIR = Path("storage")
MEDIA_STORAGE_DIR.mkdir(parents=True, exist_ok=True)

asset_repository: Dict[int, MultimediaAsset] = {}
asset_id_sequence = 1

@app.post("/assets", status_code=status.HTTP_201_CREATED)
async def upload_asset(file: UploadFile = File(description="업로드 파일")):
    logger.info(f"업로드 파일 정보:{file}")