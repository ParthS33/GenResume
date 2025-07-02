
document.addEventListener("DOMContentLoaded", () => {
  // Reset all fields
    window.resetAllFields = function () {
    if (!confirm("Are you sure you want to clear all fields?")) return;

    const form = document.getElementById("resume-form");
    form.reset(); // resets all static inputs

    // Clear all textareas
    form.querySelectorAll("textarea").forEach(t => t.value = "");

    // Remove dynamic sections
    document.getElementById("education-container").innerHTML = "";
    document.getElementById("experience-container").innerHTML = "";
    document.getElementById("project-container").innerHTML = "";
    document.getElementById("skills-container").innerHTML = "";

    // Re-add one blank entry for each section
    addEducation();
    addExperience();
    addProject();
    addSkillCategory();

    // Clear filename display (for loaded resume)
    const fileNameDisplay = document.getElementById("selected-filename");
    if (fileNameDisplay) fileNameDisplay.textContent = "";

    window.scrollTo(0, 0);
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
  window.generateExperienceBullet = generateExperienceBullet;

  window.generateProjectBullet = generateProjectBullet;

});


  window.generateFullExperienceAI = generateFullExperienceAI;

