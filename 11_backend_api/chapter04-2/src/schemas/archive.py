from pydantic import BaseModel, Field

class AssetResponseSchema(BaseModel):
    """사용자에게 결과를 돌려줄 때 사용하는 데이터 응답 양식입니다."""
    id: int = Field(..., description="디지털 미디어 자산의 고유 데이터베이스 번호")
    filename: str = Field(..., description="디렉토리에 수록 완료된 안전한 물리 파일명")
    file_size: int = Field(..., description="바이트 단위 기준의 미디어 총 용량 크기")
    content_type: str = Field(..., description="브라우저 해석용 MIME 식별자")
    status: str = Field(..., description="비동기 연산 가공 상태값 (PENDING, PROCESSING, COMPLETED)")
    created_at: str = Field(..., description="시스템 인덱싱 아카이브 등록 개시 시각")