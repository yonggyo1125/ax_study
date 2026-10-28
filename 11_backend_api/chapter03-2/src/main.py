import os
import logging
from fastapi.responses import HTMLResponse
from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("app")

app = FastAPI()

# templates 절대 경로 템플릿 엔진 설정
CURRENT_DIR = os.path.dirname(__file__)
templates = Jinja2Templates(directory=os.path.join(CURRENT_DIR, "templates"))

@app.get("/practice1", response_class=HTMLResponse)
async def jinja_practice1(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="practice1.html"
    )
