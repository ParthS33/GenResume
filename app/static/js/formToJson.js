window.getResumeFormData = function () {
  const data = {};

  // Personal Info
  data.personalInfo = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    links: Array.from(document.querySelectorAll(".link-pair")).map(pair => ({
      title: pair.querySelector(".link-title-input").value.trim(),
      url: pair.querySelector(".link-url-input").value.trim()
    }))
  };

  // Summary, Background, Job Description
  data.summary = document.getElementById("summary").value.trim();
  data.background = document.getElementById("user-background").value.trim();
  data.jobDescription = document.getElementById("job-desc").value.trim();

  // Education
  data.education = Array.from(document.querySelectorAll(".education-entry")).map(entry => ({
    university: entry.querySelector(".university-input").value.trim(),
    location: entry.querySelector(".location-input").value.trim(),
    degree: entry.querySelector(".degree-input").value.trim(),
    gpa: entry.querySelector(".gpa-input").value.trim(),
    startDate: entry.querySelector(".start-date-input").value.trim(),
    endDate: entry.querySelector(".end-date-input").value.trim()
  }));

  // Experience
  data.experience = Array.from(document.querySelectorAll(".experience-entry")).map(entry => ({
    company: entry.querySelector(".company-input").value.trim(),
    location: entry.querySelector(".location-input").value.trim(),
    title: entry.querySelector(".title-input").value.trim(),
    startDate: entry.querySelector(".start-date-input").value.trim(),
    endDate: entry.querySelector(".end-date-input").value.trim(),
    bullets: Array.from(entry.querySelectorAll(".bullet-input")).map(b => b.value.trim())
  }));

  // Projects
  data.projects = Array.from(document.querySelectorAll(".project-entry")).map(entry => ({
    title: entry.querySelector(".project-title-input").value.trim(),
    link: entry.querySelector(".project-link-input").value.trim(),
    bullets: Array.from(entry.querySelectorAll(".project-bullet-input")).map(b => b.value.trim())
  }));

  // Skills
  data.skills = Array.from(document.querySelectorAll(".skill-category")).map(entry => ({
    title: entry.querySelector(".skill-title-input").value.trim(),
    titleValues: entry.querySelector(".skill-values-input").value.split(",").map(s => s.trim()).filter(Boolean)
  }));

  return data;
};
