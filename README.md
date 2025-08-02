
# 📝 AI Resume Builder

A web-based AI-assisted resume builder that allows users to generate professional LaTeX resumes by filling out a dynamic form. Supports saving/loading resume data as JSON and exporting directly to PDF. Integrated with a local LLM (Mistral via Ollama) for generating tailored experience bullets, project descriptions, and skill sections.

---

## ✅ Features Completed

- **Interactive Resume Form (HTML + JS)**
  - Dynamic sections for Education, Experience, Skills, and Projects
  - Add/remove entries dynamically
  - Save resume data as `.json` and load it back
  - One-click reset form
  - Buttons for AI-assisted content generation

- **Backend with FastAPI**
  - Serves frontend and static files
  - `/generate-resume`: parses and sanitizes form data, renders LaTeX, compiles PDF
  - `/save-resume`: saves structured resume JSON locally
  - AI endpoints using Ollama + Mistral for:
    - Single and full experience bullet generation
    - Project bullet rewriting
    - Skill category suggestions

- **AI-Powered Resume Content (via Mistral on Ollama)**
  - Rewrite bullets using the XYZ format
  - Align content with job descriptions and user background
  - Strict formatting and length control for ATS compatibility

- **LaTeX + PDF Generation**
  - Clean Jinja2 template renders to `.tex`
  - Escapes LaTeX special characters to avoid compile errors
  - Runs `pdflatex` twice to generate polished PDF
  - Saves output to disk in `app/output/`

---


## 📁 Project Structure

```
├── app
│   ├── api
│   ├── main.py
│   ├── builder
│   │   ├── generator.py
│   │   └── parser.py
│   ├── static
│   │   ├── css
│   │   └── js
│   ├── templates
│   │   ├── index.html
│   │   └── latex_template.tex
│   ├── output
│   └── saved_data
```

---

## 🚀 Run Instructions

1. Install dependencies using Poetry:
   ```
   poetry install
   ```

2. Run the server:
   ```
   poetry run uvicorn main:app --reload
   ```

3. Run the Mistral model via Ollama (for AI features):
   ```
   ollama run mistral
   ```

3. Access the app:
   - Open [http://127.0.0.1:8000](http://127.0.0.1:8000) in your browser

---

