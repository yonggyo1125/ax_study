import logging
from fastapi import FastAPI, Request
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from order.presentation.router import router as order_router
from board.presentation.router import router as board_router

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("MIDDLEWARE")

app = FastAPI()

@app.middleware("http")
async def middleware1(request: Request, call_next):
    # 요청 처리전 처리 작업 
    logger.info("middleware1()의 요청 처리전")

    response = await call_next(request)

    logger.info("middleware1()의 응답 처리 전")

    return response

@app.middleware("http")
async def middleware2(request: Request, call_next):
    # 요청 처리전 처리 작업 
    logger.info("middleware2()의 요청 처리전")

    response = await call_next(request)

    logger.info("middleware2()의 응답 처리 전")
    
    return response

app.add_middleware(
    TrustedHostMiddleware, 
    allowed_hosts=["localhost", "127.0.0.1"]
)

app.include_router(order_router)
app.include_router(board_router)