import os
import logging
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi import FastAPI, Request, File, UploadFile, Form
from fastapi.templating import Jinja2Templates

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("app")

app = FastAPI()

# templates 절대 경로 템플릿 엔진 설정
CURRENT_DIR = os.path.dirname(__file__)
templates = Jinja2Templates(directory=os.path.join(CURRENT_DIR, "templates"))
templates.env.add_extension("jinja2.ext.do")


# 정적 경로 설정
app.mount("/static2", StaticFiles(directory=os.path.join(CURRENT_DIR, "static")), name="static")
app.mount("/img", StaticFiles(directory=os.path.join(CURRENT_DIR, "static/img")), name="img")

@app.get("/practice1", response_class=HTMLResponse)
async def jinja_practice1(request: Request):
    student_context = {
        "name": "Sparta",
        "age": 20,
        "hobbies": ["독서", "영화"],
        "nickname": None,
        "html_code": "<strong>안녕하세요!</strong>"
    }
    return templates.TemplateResponse(
        request=request,
        name="practice1.html",
        context=student_context
    )

@app.get("/practice2", response_class=HTMLResponse)
async def jinja_practice2(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="practice2.html"
    )

@app.get("/practice3", response_class=HTMLResponse)
async def jinja_practice3(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="practice3.html"
    )



@app.post("/practice3/process")
async def jinja_practice3_process(
    title: str = Form(description="제목"),
    content: str = Form(description="내용")
):
    logger.info(f"title={title}, content={content}")


@app.get("/file", response_class=HTMLResponse)
async def file_upload(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="file_test.html"
    )

@app.post("/file")
async def file_upload_process():
    pass

# async def file_upload_process(file: UploadFile = File()):
#     logger.info(f"file={file}")
