import logging
from fastapi import FastAPI
from order.presentation.router import router as order_router
from board.presentation.router import router as board_router

logging.basicConfig(level=logging.INFO)

app = FastAPI()

app.include_router(order_router)
app.include_router(board_router)