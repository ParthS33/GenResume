
# 📝 AI Resume Builder

A web-based AI-assisted resume builder that lets users generate LaTeX resumes by filling out a dynamic form. Supports saving/loading resume data as JSON and LaTeX export. AI functionality for generating content is planned.

---

## ✅ Features Completed

- **Interactive Resume Form (HTML + JS)**
  - Dynamic sections for Education, Experience, Skills, and Projects
  - Ability to add/remove entries dynamically
  - Placeholder AI buttons for generating bullet points (backend not wired yet)
  - Option to save resume data as `.json`
  - Option to load existing `.json` resume

- **Backend with FastAPI**
  - Serves frontend via FastAPI
  - `/generate-resume` endpoint:
    - Receives form data
    - Parses and sanitizes it
    - Converts it to LaTeX using Jinja2 templating
  - `/save-resume` endpoint:
    - Saves structured resume data to local storage

- **LaTeX Generation**
  - Jinja2 template to render LaTeX resume
  - Escapes special LaTeX characters to prevent errors
  - Generates `.tex` file output

---

## 🛠 Planned Next Steps

- **AI Content Generation (Major Work Remaining)**
  - Use LangChain or similar to generate:
    - Experience bullet points
    - Full experience descriptions
    - Project descriptions
    - Potentially summaries or other sections
  - Wire AI buttons in frontend to backend AI endpoints

- **PDF Generation**
  - Convert `.tex` file to `.pdf` using `pdflatex` or `latexmk`
  - Serve generated PDF as download via `/generate-resume`

- **Enhanced JSON Save/Load**
  - Improve UX for loading existing resume
  - Allow multiple saved resumes, filename picker

- **Form Validation & Polishing**
  - Better error handling and validation on form fields
  - Improve mobile responsiveness

- **Deployment**
  - Dockerize FastAPI app
  - Optionally deploy with Nginx or on Render/Heroku

---

## 📁 Project Structure

```
├── app
│   ├── static
│   │   ├── css
│   │   └── js
│   ├── templates
│   │   ├── index.html
│   │   └── latex_template.tex
│   ├── output
│   └── saved_data
├── builder
│   ├── generator.py
│   ├── parser.py
├── main.py
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

3. Access the app:
   - Open [http://127.0.0.1:8000](http://127.0.0.1:8000) in your browser

---

## ✨ Future Ideas

- AI-assisted Job Description tailoring
- One-click "Download PDF" button
- Pre-made resume templates (multiple LaTeX designs)
- LocalStorage save/load (no backend dependency for basic use)
- Export/import to other formats (Markdown, plain text)
