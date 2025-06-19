window.fillFormWithResumeData = function (data) {
  // Personal Info
  document.getElementById("name").value = data.personalInfo?.name || "";
  document.getElementById("email").value = data.personalInfo?.email || "";
  document.getElementById("phone").value = data.personalInfo?.phone || "";

  const linkInputs = document.querySelectorAll(".link-pair");
  if (data.personalInfo?.links && linkInputs.length >= data.personalInfo.links.length) {
    data.personalInfo.links.forEach((link, index) => {
      const pair = linkInputs[index];
      if (pair) {
        pair.querySelector(".link-title-input").value = link.title || "";
        pair.querySelector(".link-url-input").value = link.url || "";
      }
    });
  }

  // Summary, Background, Job Description
  document.getElementById("summary").value = data.summary || "";
  document.getElementById("user-background").value = data.background || "";
  document.getElementById("job-desc").value = data.jobDescription || "";

  // Clear and populate Education
  const eduContainer = document.getElementById("education-container");
  eduContainer.innerHTML = "";
  (data.education || []).forEach(edu => {
    window.addEducation();
    const entry = eduContainer.lastElementChild;
    entry.querySelector(".university-input").value = edu.university || "";
    entry.querySelector(".location-input").value = edu.location || "";
    entry.querySelector(".degree-input").value = edu.degree || "";
    entry.querySelector(".gpa-input").value = edu.gpa || "";
    entry.querySelector(".start-date-input").value = edu.startDate || "";
    entry.querySelector(".end-date-input").value = edu.endDate || "";
  });

  // Clear and populate Experience
  const expContainer = document.getElementById("experience-container");
  expContainer.innerHTML = "";
  (data.experience || []).forEach(exp => {
    window.addExperience();
    const entry = expContainer.lastElementChild;
    entry.querySelector(".company-input").value = exp.company || "";
    entry.querySelector(".location-input").value = exp.location || "";
    entry.querySelector(".title-input").value = exp.title || "";
    entry.querySelector(".start-date-input").value = exp.startDate || "";
    entry.querySelector(".end-date-input").value = exp.endDate || "";

    const bulletContainer = entry.querySelector(".bullet-container");
    bulletContainer.innerHTML = `<label>Bullet Points</label>`; // Reset bullets
    (exp.bullets || []).forEach(bullet => {
      const row = document.createElement("div");
      row.classList.add("bullet-row");
      row.innerHTML = `
        <textarea class="bullet-input">${bullet}</textarea>
        <button type="button" class="generate-ai-btn" onclick="generateExperienceBullet(this)">⚡ Generate with AI</button>
        <button type="button" class="remove-btn" onclick="removeBullet(this)">🗑</button>
      `;
      bulletContainer.appendChild(row);
    });
  });

  // Clear and populate Projects
  const projContainer = document.getElementById("project-container");
  projContainer.innerHTML = "";
  (data.projects || []).forEach(proj => {
    window.addProject();
    const entry = projContainer.lastElementChild;
    entry.querySelector(".project-title-input").value = proj.title || "";
    entry.querySelector(".project-link-input").value = proj.link || "";

    const bulletContainer = entry.querySelector(".bullet-container");
    bulletContainer.innerHTML = `<label>Bullet Points</label>`;
    (proj.bullets || []).forEach(bullet => {
      const row = document.createElement("div");
      row.classList.add("bullet-row");
      row.innerHTML = `    
        <textarea class="project-bullet-input">${bullet}</textarea>
        <button type="button" class="generate-ai-btn" onclick="generateProjectBullet(this)">⚡ Generate with AI</button>
        <button type="button" class="remove-btn" onclick="removeBullet(this)">🗑</button>
      `;
      bulletContainer.appendChild(row);
    });
  });

  // Clear and populate Skills
  const skillsContainer = document.getElementById("skills-container");
  // skillsContainer.querySelectorAll(".skill-category").forEach(e => e.remove());
  skillsContainer.innerHTML = "";
  (data.skills || []).forEach(skill => {
    window.addSkillCategory();
    const entry = skillsContainer.querySelector(".skill-category:last-of-type");
    entry.querySelector(".skill-title-input").value = skill.title || "";
    entry.querySelector(".skill-values-input").value = (skill.titleValues || []).join(", ");
  });

};
