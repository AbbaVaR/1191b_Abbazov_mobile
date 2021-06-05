from io import BytesIO
import uuid
from fastapi import (
    FastAPI,
    Request,
    File,
    UploadFile,
    HTTPException
)
from fastapi.responses import (
    FileResponse,
    RedirectResponse
)
from fastapi.templating import Jinja2Templates
import os
import anonymizer

app = FastAPI()
templates = Jinja2Templates(directory='templates')


@app.get("/")
def home(request: Request):
    return templates.TemplateResponse('index.html', {'request': request})


@app.post('/file')
def _file_upload(file: UploadFile = File(...)):
    file_in = BytesIO(file.file.read())
    file_uuid = str(uuid.uuid4())
    try:
        anonymizer.doc_anon(file_in,  file_uuid)
    except Exception:
        raise HTTPException(status_code=400, detail="Incorrect file")
    return file_uuid


@app.get("/download/{path}")
def get_file(path):
    remove_old_files("./temp/")
    file_name = path + ".docx"
    file_path = "./temp/" + path + ".docx"
    return FileResponse(path=file_path, headers={"Content-Disposition": "attachment; filename=" + file_name})


def get_files(path):
    files = []
    directory = os.listdir(path)
    directory.sort(reverse=True)
    for file in directory:
        files.append(file)
    return files


def remove_old_files(path):
    max_files = 100
    files = get_files(path)
    if len(files) < max_files:
        return
    i = 0
    for f in files:
        i += 1
        if i > max_files:
            os.remove(os.path.join(path, f))
