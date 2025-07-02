// Generate an improved version of a single bullet
async function generateExperienceBullet(button) {
  const bulletInput = button.closest(".bullet-row").querySelector(".bullet-input");
  const targetBullet = bulletInput.value.trim();

  const parent = button.closest(".experience-entry");
  const company = parent.querySelector(".company-input")?.value || "";
  const title = parent.querySelector(".title-input")?.value || "";
  const bullets = Array.from(parent.querySelectorAll(".bullet-input"))
    .map(input => input.value.trim())
    .join("\n");

  const payload = {
    target_bullet: targetBullet,
    background: document.getElementById("user-background").value,
    job_description: document.getElementById("job-desc").value,
    experience: `Company: ${company}\nTitle: ${title}\nBullets:\n${bullets}`
  };

  const response = await fetch("/generate-bullet", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const data = await response.json();
  if (data.status === "ok") {
    bulletInput.value = data.bullet;
  } else {
    alert("⚠️ Failed to generate bullet.");
  }
}

// Generate a full rewritten experience section
async function generateFullExperienceAI(button) {
  const parent = button.closest(".experience-entry");
  const company = parent.querySelector(".company-input")?.value || "";
  const title = parent.querySelector(".title-input")?.value || "";
  const bullets = Array.from(parent.querySelectorAll(".bullet-input"))
    .map(input => input.value.trim())
    .join("\n");

  const bulletInputs = Array.from(parent.querySelectorAll(".bullet-input"));
  const numBullets = bulletInputs.length;

  const payload = {
    background: document.getElementById("user-background").value,
    job_description: document.getElementById("job-desc").value,
    experience: `Company: ${company}\nTitle: ${title}\nBullets:\n${bullets}`,
    num_bullets: numBullets
  };

  const response = await fetch("/generate-experience", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const data = await response.json();
  if (data.status === "ok") {
    const container = parent.querySelector(".bullet-container");
    container.innerHTML = "";

    data.bullets.split("\n").forEach(line => {
      if (!line.trim()) return;
      const row = document.createElement("div");
      row.classList.add("bullet-row");
      row.innerHTML = `
        <textarea class="bullet-input">${line.replace(/^[-•]\s*/, "")}</textarea>
        <button type="button" class="generate-ai-btn" onclick="generateExperienceBullet(this)">⚡ Generate with AI</button>
        <button type="button" class="remove-btn" onclick="removeBullet(this)">🗑</button>
      `;
      container.appendChild(row);
    });
  } else {
    alert("⚠️ Failed to generate experience section.");
  }
}

function getCurrentSkillsAsText() {
  const skillSections = document.querySelectorAll(".skill-category");
  let result = "";

  skillSections.forEach(section => {
    const title = section.querySelector(".skill-title-input")?.value.trim() || "Untitled";
    const skills = section.querySelector(".skill-values-input")?.value.trim() || "";

    if (skills) {
      result += `${title}: ${skills}\n`;
    }
  });

  return result.trim();
}


async function generateSkillsWithAI() {
  const skillCategories = document.querySelectorAll(".skill-category");
  const numCategories = skillCategories.length;

  const currentSkills = getCurrentSkillsAsText();

  const payload = {
    background: document.getElementById("user-background").value,
    job_description: document.getElementById("job-desc").value,
    current_skills: currentSkills,
    num_categories: numCategories
  };

  const response = await fetch("/generate-skills", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const data = await response.json();
  if (data.status === "ok") {
    const skillData = data.skills;

    skillData.forEach((skillBlock, index) => {
      const category = skillCategories[index];
      const titleInput = category.querySelector(".skill-title-input");
      const valuesInput = category.querySelector(".skill-values-input");

      if (titleInput && valuesInput) {
        titleInput.value = skillBlock.title;
        valuesInput.value = skillBlock.skills;
      }
    });

    alert("✅ Skill categories generated.");
  } else {
    alert("❌ Failed to generate skills.");
  }
}

async function generateProjectBullet(button) {
  const projectEntry = button.closest(".project-entry");

  const title = projectEntry.querySelector(".project-title-input")?.value || "";
  const bullets = Array.from(projectEntry.querySelectorAll(".project-bullet-input"))
    .map(input => input.value.trim())
    .join("\n");

  const bulletInput = button.closest(".bullet-row").querySelector(".project-bullet-input");
  const targetBullet = bulletInput.value.trim();

  const payload = {
    title,
    background: document.getElementById("user-background").value,
    job_description: document.getElementById("job-desc").value,
    existing_bullets: bullets,
    target_bullet: targetBullet
  };

  const response = await fetch("/generate-project-bullet", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const data = await response.json();
  if (data.status === "ok") {
    bulletInput.value = data.bullet;
  } else {
    alert("⚠️ Failed to generate project bullet.");
  }
}

