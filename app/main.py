from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from .builder.parser import parse_resume_data
from .builder.generator import generate_latex_from_data
import os

app = FastAPI()

app.mount("/static", StaticFiles(directory="app/static"), name="static")
templates = Jinja2Templates(directory="app/templates")


@app.get("/", response_class=HTMLResponse)
def load_form(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/generate-resume")
async def generate_resume(request: Request):
    data = await request.json()
    print("🔧 Received resume data:")
    structured = parse_resume_data(data)  # Your transformation logic
    tex_path = generate_latex_from_data(structured)
    print(tex_path)
    # pdf_file = generate_pdf_from_data(structured)  # Converts to LaTeX/PDF

    # return FileResponse(pdf_file, media_type="application/pdf", filename="resume.pdf")
    return JSONResponse(content={"status": "ok", "message": "Data parsed", "structured": structured})

@app.post("/save-resume")
async def save_resume(request: Request):
    data = await request.json()
    save_dir = "app/saved_data"
    os.makedirs(save_dir, exist_ok=True)

    save_path = os.path.join(save_dir, "resume_data.json")

    try:
        with open(save_path, "w", encoding="utf-8") as f:
            import json
            json.dump(data, f, indent=2)

        print(f"💾 Resume data saved at: {save_path}")
        return JSONResponse(content={"status": "ok", "message": "Resume data saved."})
    except Exception as e:
        print(f"❌ Failed to save resume data: {e}")
        return JSONResponse(status_code=500, content={"status": "error", "message": str(e)})