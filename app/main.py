from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from .builder.parser import parse_resume_data
from .builder.generator import generate_latex_from_data, generate_pdf_from_data
import os
from app.api.ai_resume import generate_ai_bullets, replace_specific_bullet, generate_project_bullet
import json

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
    structured = parse_resume_data(data)
    tex_path = generate_latex_from_data(structured)
    print(tex_path)
    pdf_file = generate_pdf_from_data(structured)

    if pdf_file and os.path.exists(pdf_file):
        print("PDF generated")
        return FileResponse(pdf_file, media_type="application/pdf", filename="resume.pdf")
    else:
        return JSONResponse(status_code=500, content={"status": "error", "message": "PDF generation failed."})

@app.post("/save-resume")
async def save_resume(request: Request):
    payload = await request.json()

    filename = payload.get("filename", "resume_data").strip()
    data = payload.get("data", {})

    if not filename:
        filename = "resume_data"
    if not filename.endswith(".json"):
        filename += ".json"

    save_dir = "app/saved_data"
    os.makedirs(save_dir, exist_ok=True)
    save_path = os.path.join(save_dir, filename)

    try:
        with open(save_path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)

        print(f"💾 Resume data saved at: {save_path}")
        return JSONResponse(content={"status": "ok", "message": f"Resume saved as {filename}."})
    except Exception as e:
        print(f"❌ Failed to save resume data: {e}")
        return JSONResponse(status_code=500, content={"status": "error", "message": str(e)})

@app.post("/generate-experience")
async def generate_experience(request: Request):
    payload = await request.json()
    try:
        bullets = generate_ai_bullets(
            background=payload.get("background", ""),
            experience=payload.get("experience", ""),
            job_desc=payload.get("job_description", ""),
            num_bullets=payload.get("num_bullets", 4),
        )
        return JSONResponse(content={"status": "ok", "bullets": bullets})
    except Exception as e:
        print(f"❌ Full experience generation failed: {e}")
        return JSONResponse(status_code=500, content={"status": "error", "message": str(e)})


@app.post("/generate-bullet")
async def generate_bullet(request: Request):
    payload = await request.json()
    try:
        bullet = replace_specific_bullet(
            background=payload.get("background", ""),
            experience=payload.get("experience", ""),
            job_desc=payload.get("job_description", ""),
            target_bullet=payload.get("target_bullet", "")
        )
        return JSONResponse(content={"status": "ok", "bullet": bullet})
    except Exception as e:
        print(f"❌ Bullet replacement failed: {e}")
        return JSONResponse(status_code=500, content={"status": "error", "message": str(e)})


@app.post("/generate-skills")
async def generate_skills(request: Request):
    from app.api.ai_resume import generate_skills_section

    payload = await request.json()
    background = payload.get("background", "")
    job_desc = payload.get("job_description", "")
    num_categories = payload.get("num_categories", 4)
    current_skills = payload.get("current_skills", "")
    try:
        skill_data = generate_skills_section(background, job_desc, current_skills, num_categories)
        return JSONResponse(content={"status": "ok", "skills": skill_data})
    except Exception as e:
        return JSONResponse(status_code=500, content={"status": "error", "message": str(e)})

@app.post("/generate-project-bullet")
async def generate_project_bullet_endpoint(request: Request):
    payload = await request.json()
    title = payload.get("title", "")
    existing_bullets = payload.get("existing_bullets", "")
    target_bullet = payload.get("target_bullet", "")
    background = payload.get("background", "")
    job_desc = payload.get("job_description", "")

    try:
        bullet = generate_project_bullet(title, existing_bullets, target_bullet, background, job_desc)
        return JSONResponse(content={"status": "ok", "bullet": bullet})
    except Exception as e:
        print("❌ Error generating project bullet:", e)
        return JSONResponse(status_code=500, content={"status": "error", "message": str(e)})
