import ollama

def clean_bullet_lines(text: str) -> str:
    lines = text.strip().splitlines()
    return "\n".join(line.lstrip("*•-0123456789. ").strip() for line in lines if line.strip())


def generate_ai_bullets(background: str, experience: str, job_desc: str, num_bullets: int) -> str:
    # system_prompt = (
    #     "You are a professional resume writer.\n"
    #     "Your job is to rewrite a user's experience section to align with a job description.\n"
    #     "Use the **XYZ format**: Accomplished X (what you did), as measured by Y (quantified result), by doing Z (how you did it).\n"
    #     "Each bullet must be under 175 characters, including spaces.\n"
    #     "Guidelines:\n"
    #     "- Use strong, varied action verbs (avoid repeating words like 'built', 'developed')\n"
    #     "- Quantify impact and results wherever possible (e.g., 'reduced cost by $500/month')\n"
    #     "- Avoid generic or fluffy language like 'responsible for' or 'worked on'\n"
    #     "- Use keywords and technologies from the job description where appropriate\n"
    #     "- Be concise, impactful, and ATS-friendly\n"
    #     "- Return only clean bullet points, one per line, with no intro or explanation"
    # )
    system_prompt = (
        "You are a professional resume writer.\n"
        "Your job is to rewrite a user's experience section to align with a job description.\n"
        "Use the **XYZ format**: Accomplished X (what you did), as measured by Y (quantified result), by doing Z (how you did it).\n"
        "Each bullet must be under 175 characters, including spaces.\n\n"
        "**STRICT RULES**:\n"
        f"1. You must return exactly {num_bullets} bullet points — no more, no fewer.\n"
        "2. Use only information from the user's background and original experience bullets.\n"
        "3. You may align language with the job description, but do NOT copy or paraphrase directly from it.\n"
        "4. Do NOT invent new responsibilities, tools, or skills unless clearly implied by the user's original input.\n"
        "5. Do NOT include any text in parentheses (e.g., '(Job Description)') or any meta commentary.\n"
        "6. Avoid vague verbs like 'demonstrated', 'familiarity with', or 'responsible for'. Use strong, measurable action verbs.\n"
        "7. Do not include any introduction or closing statement — only bullet points.\n\n"
        "Guidelines:\n"
        "- Use strong, varied action verbs (avoid repeating words like 'built', 'developed')\n"
        "- Quantify impact and results wherever possible (e.g., 'reduced cost by $500/month')\n"
        "- Keep each bullet concise, impactful, and ATS-friendly\n"
        "- Return one bullet per line — no numbering, no special symbols"
    )

    user_prompt = (
        f"User Background:\n{background}\n\n"
        f"Job Description:\n{job_desc}\n\n"
        f"Experience Section:\n{experience}\n\n"
        "Now rewrite the bullet points."
    )

    response = ollama.chat(
        model="mistral",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ]
    )

    raw_output = response['message']['content'].strip()
    return clean_bullet_lines(raw_output)


def replace_specific_bullet(background: str, experience: str, job_desc: str, target_bullet: str) -> str:
    system_prompt = (
        "You are a resume bullet rewriting assistant.\n"
        "You will revise a single bullet from an experience section to better match a job description.\n"
        "Use the **XYZ format**: Accomplished X (what you did), as measured by Y (quantified result), by doing Z (how you did it).\n"
        "Guidelines:\n"
        "- Use a strong action verb (avoid repeating those used in other bullets)\n"
        "- Quantify results (e.g., 'improved efficiency by 25%')\n"
        "- Use relevant keywords from the job description\n"
        "- Avoid duplicating or restating other bullets\n"
        "- Be concise, focused, and impactful\n"
        "- Return only the rewritten bullet (no intro, no list symbols)"
    )

    user_prompt = (
        f"User Background:\n{background}\n\n"
        f"Job Description:\n{job_desc}\n\n"
        f"Experience Section:\n{experience}\n\n"
        f"Target Bullet:\n{target_bullet}\n\n"
        "Now rewrite this one bullet point."
    )

    response = ollama.chat(
        model="mistral",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ]
    )

    raw_output = response['message']['content'].strip()
    return clean_bullet_lines(raw_output)


def generate_skills_section(background: str, job_desc: str, current_skills: str, num_categories: int) -> list:
    system_prompt = (
        "You are a professional resume assistant generating skill categories.\n"
        "Your task is to create clear, concise skill categories for a technical resume.\n\n"
        "**STRICT RULES**:\n"
        "1. Only include skills that are explicitly mentioned in the user's background or current skills section.\n"
        "2. You may use job description keywords only if the skill is clearly transferable or already implied by the user's background.\n"
        "3. Do NOT invent or assume any skills the user does not clearly have.\n"
        "4. Do NOT include soft skills like 'communication', 'teamwork', or vague terms like 'collaboration'.\n"
        "5. Do NOT include skills like Java, C#, CSS, or SASS unless already present in the user's background or current skills.\n"
        "6. Do NOT include any text in parentheses anywhere in the output.\n"
        "7. Keep each category title to a maximum of two words (excluding 'and' or '&').\n"
        "8. You may rephrase or group related skills together, but you must stay grounded in the input.\n"
        "9. Keep each category tight and focused. Limit to about 5 skills per category.\n\n"
        f"Generate exactly {num_categories} skill categories in this format:\n"
        "Category: Programming Languages\nSkills: Python, JavaScript, SQL\n\n"
        "Category: Tools & DevOps\nSkills: Git, CI/CD, Docker"
    )

    user_prompt = (
        f"User Background:\n{background}\n\n"
        f"Current Skills:\n{current_skills}\n\n"
        f"Job Description:\n{job_desc}\n\n"
        "Please return the skills in this format:\n"
        "Category: <Category Title>\nSkills: <Comma-separated list>\n\n"
        "Repeat this structure for each category."
    )

    response = ollama.chat(
        model="mistral",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ]
    )

    lines = response['message']['content'].strip().splitlines()
    skills = []
    category = {}
    for line in lines:
        if line.startswith("Category:"):
            if category:
                skills.append(category)
            category = {"title": line.replace("Category:", "").strip(), "skills": ""}
        elif line.startswith("Skills:"):
            category["skills"] = line.replace("Skills:", "").strip()
    if category:
        skills.append(category)
    return skills[:num_categories]


def generate_project_bullet(title: str, existing_bullets: str, target_bullet: str, background: str, job_desc: str) -> str:
    system_prompt = (
        "You are a resume assistant helping improve project bullet points for a technical resume.\n"
        "Your job is to rewrite a single project bullet using the **XYZ format** (Accomplished X, as measured by Y, by doing Z).\n"
        "Guidelines:\n"
        "- Be concise and specific (under 175 characters)\n"
        "- Use a strong action verb\n"
        "- Quantify impact or scope if possible\n"
        "- Use relevant technologies or keywords\n"
        "- Do NOT copy phrases from the job description directly\n"
        "- Do NOT invent tools, languages, or frameworks not in the original content\n"
        "- Avoid generic phrases like 'worked on', 'was responsible for'\n"
        "- Output only the rewritten bullet — no list symbols or explanation"
    )

    user_prompt = (
        f"User Background:\n{background}\n\n"
        f"Job Description:\n{job_desc}\n\n"
        f"Project Title:\n{title}\n\n"
        f"Existing Bullets:\n{existing_bullets}\n\n"
        f"Target Bullet:\n{target_bullet}\n\n"
        "Now rewrite this bullet to be stronger and more aligned with the job."
    )

    response = ollama.chat(
        model="mistral",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ]
    )

    raw_output = response['message']['content'].strip()
    return clean_bullet_lines(raw_output)
