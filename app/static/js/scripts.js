
document.addEventListener("DOMContentLoaded", () => {
  // Reset all fields
  window.resetAllFields = function () {
    if (confirm("Are you sure you want to clear all fields?")) {
      document.getElementById("resume-form").reset();
    }
  };

  // Remove a section (education, experience, skill-category, project)
  window.removeSection = function (button) {
    const block = button.closest(
      ".experience-entry, .education-entry, .project-entry, .skill-category"
    );
    if (block) block.remove();
  };

  // Remove a single bullet point
  window.removeBullet = function (button) {
    const row = button.closest(".bullet-row");
    if (row) row.remove();
  };

  // Experience Bullets
  window.addExperienceBullet = function (btn) {
    const container = btn
      .closest(".experience-entry")
      .querySelector(".bullet-container");
    const newBullet = document.createElement("div");
    newBullet.classList.add("bullet-row");
    newBullet.innerHTML = `
      <textarea placeholder="e.g. Designed scalable backend systems..." class="bullet-input"></textarea>
      <button type="button" class="generate-ai-btn" onclick="generateExperienceBullet(this)">⚡ Generate with AI</button>
      <button type="button" class="remove-btn" onclick="removeBullet(this)">🗑</button>
    `;
    container.appendChild(newBullet);
  };

  // Project Bullets
  window.addProjectBullet = function (btn) {
    const container = btn
      .closest(".project-entry")
      .querySelector(".bullet-container");
    const newBullet = document.createElement("div");
    newBullet.classList.add("bullet-row");
    newBullet.innerHTML = `
      <textarea placeholder="e.g. Built REST API..." class="project-bullet-input"></textarea>
      <button type="button" class="generate-ai-btn" onclick="generateProjectBullet(this)">⚡ Generate with AI</button>
      <button type="button" class="remove-btn" onclick="removeBullet(this)">🗑</button>
    `;
    container.appendChild(newBullet);
  };


  window.addExperience = function () {
  const container = document.getElementById("experience-container");
  const template = document.getElementById("experience-template");
  const newEntry = template.content.firstElementChild.cloneNode(true);
  container.appendChild(newEntry);
};



  window.addEducation = function () {
  const container = document.getElementById("education-container");
  const template = document.getElementById("education-template");
  const newEntry = template.content.firstElementChild.cloneNode(true);
  container.appendChild(newEntry);
};


  window.addProject = function () {
  const container = document.getElementById("project-container");
  const template = document.getElementById("project-template");
  const newEntry = template.content.firstElementChild.cloneNode(true);
  container.appendChild(newEntry);
};


  window.addSkillCategory = function () {
  const container = document.getElementById("skills-container");
  const template = document.getElementById("skill-template");
  const newEntry = template.content.firstElementChild.cloneNode(true);
  const addBtn = container.querySelector(".add-skill-btn");
  container.insertBefore(newEntry, addBtn);
};



  // Placeholder functions for AI
  window.generateExperienceBullet = function (button) {
    const textarea = button.parentElement.querySelector("textarea");
    textarea.value = "Generated experience bullet from AI based on job description.";
  };

  window.generateProjectBullet = function (button) {
    const textarea = button.parentElement.querySelector("textarea");
    textarea.value = "Generated project bullet from AI based on project context.";
  };

});


  window.generateFullExperienceAI = function (button) {
    const entry = button.closest(".experience-entry");

    // Fill out basic fields
    entry.querySelector(".company-input").value = "OpenAI";
    entry.querySelector(".location-input").value = "San Francisco, CA";
    entry.querySelector(".title-input").value = "Machine Learning Engineer";
    entry.querySelector(".start-date-input").value = "Jan 2023";
    entry.querySelector(".end-date-input").value = "Present";

    // Clear existing bullets
    const bulletContainer = entry.querySelector(".bullet-container");
    bulletContainer.innerHTML = `
      <label>Bullet Points</label>
      <div class="bullet-row">
        <textarea class="bullet-input">Developed and deployed transformer models for NLP tasks with 20% improved accuracy over baselines.</textarea>
        <button type="button" class="generate-ai-btn" onclick="generateExperienceBullet(this)">⚡ Generate with AI</button>
        <button type="button" class="remove-btn" onclick="removeBullet(this)">🗑</button>
      </div>
      <div class="bullet-row">
        <textarea class="bullet-input">Optimized distributed training pipeline, reducing model training time from 12 hours to 5 hours.</textarea>
        <button type="button" class="generate-ai-btn" onclick="generateExperienceBullet(this)">⚡ Generate with AI</button>
        <button type="button" class="remove-btn" onclick="removeBullet(this)">🗑</button>
      </div>
    `;
  };

