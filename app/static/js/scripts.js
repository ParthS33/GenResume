
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

  // Add new experience entry
  // window.addExperience = function () {
  //   const container = document.getElementById("experience-container");
  //   const newEntry = container.firstElementChild.cloneNode(true);
  //   newEntry.querySelectorAll("input, textarea").forEach((el) => (el.value = ""));
  //   container.appendChild(newEntry);
  // };
  window.addExperience = function () {
  const container = document.getElementById("experience-container");
  const template = document.getElementById("experience-template");
  const newEntry = template.content.firstElementChild.cloneNode(true);
  container.appendChild(newEntry);
};

  // Add new education entry
  // window.addEducation = function () {
  //   const container = document.getElementById("education-container");
  //   const newEntry = container.firstElementChild.cloneNode(true);
  //   newEntry.querySelectorAll("input").forEach((el) => (el.value = ""));
  //   container.appendChild(newEntry);
  // };

window.addEducation = function () {
  const container = document.getElementById("education-container");
  const template = document.getElementById("education-template");
  const newEntry = template.content.firstElementChild.cloneNode(true);
  container.appendChild(newEntry);
};

  // Add new project
  // window.addProject = function () {
  //   const container = document.getElementById("project-container");
  //   const newEntry = container.firstElementChild.cloneNode(true);
  //   newEntry.querySelectorAll("input, textarea").forEach((el) => (el.value = ""));
  //   const bullets = newEntry.querySelectorAll(".bullet-row");
  //   bullets.forEach((el, i) => {
  //     if (i > 0) el.remove();
  //   });
  //   container.appendChild(newEntry);
  // };
  window.addProject = function () {
  const container = document.getElementById("project-container");
  const template = document.getElementById("project-template");
  const newEntry = template.content.firstElementChild.cloneNode(true);
  container.appendChild(newEntry);
};

  // Add new skill category
  // window.addSkillCategory = function () {
  //   const container = document.getElementById("skills-container");
  //   const firstCategory = container.querySelector(".skill-category");
  //   const newCategory = firstCategory.cloneNode(true);
  //
  //   newCategory.querySelectorAll("input").forEach((input) => (input.value = ""));
  //
  //   // Insert new section before the "Add Skill Category" button
  //   const addBtn = document.querySelector(".add-skill-btn");
  //   container.insertBefore(newCategory, addBtn);
  // };
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

  window.loadExistingResume = function () {
    alert("This will load an existing resume file (feature coming soon).");
  };
});
