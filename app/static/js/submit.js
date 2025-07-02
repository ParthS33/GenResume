document.addEventListener("DOMContentLoaded", () => {
  const generateBtn = document.getElementById("generate-btn");
  if (generateBtn) {
    generateBtn.addEventListener("click", window.submitResumeForm);
  }
  const saveBtn = document.getElementById("save-btn");
  if (saveBtn) {
    saveBtn.addEventListener("click", window.saveResumeData);
  }
  const fileInput = document.getElementById("resume-file-input");
  if (fileInput) {
    fileInput.addEventListener("change", function () {
      const file = this.files[0];
      if (!file) return;

      document.getElementById("selected-filename").textContent = `Loaded: ${file.name}`;

      const reader = new FileReader();
      reader.onload = function (e) {
        try {
          const jsonData = JSON.parse(e.target.result);
          if (typeof fillFormWithResumeData === "function") {
            fillFormWithResumeData(jsonData);
            alert("Resume loaded successfully!");
          } else {
            console.warn("fillFormWithResumeData not defined.");
          }
        } catch (err) {
          alert("Invalid JSON file!");
          console.error(err);
        }
      };
      reader.readAsText(file);
    });
  }
});

window.submitResumeForm = function (event) {
  if (event) event.preventDefault();

  const data = window.getResumeFormData();

  fetch("/generate-resume", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Resume generation failed");
      alert("✅ PDF resume generated and saved to disk.");
    })
    .catch((err) => {
      console.error("❌ Error sending resume data:", err);
      alert("Error: " + err.message);
    });
};

window.saveResumeData = function (event) {
  if (event) event.preventDefault();

  const filename = prompt("💾 Enter a name to save this resume as (without .json):");
  if (!filename || filename.trim() === "") {
    alert("⚠️ Save cancelled or no filename provided.");
    return;
  }

  const cleanFilename = filename.trim().replace(/[^a-zA-Z0-9-_]/g, "_");
  const data = window.getResumeFormData();

  fetch("/save-resume", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ filename: cleanFilename, data })
  })
    .then((res) => {
      if (!res.ok) throw new Error("Resume saving failed");
      return res.json();
    })
    .then((responseData) => {
      console.log("💾 Resume data saved:", responseData);
      alert(`✅ Resume saved as "${cleanFilename}.json"`);
    })
    .catch((err) => {
      console.error("❌ Error saving resume data:", err);
      alert("Error saving: " + err.message);
    });
};


window.loadExistingResume = function () {
  document.getElementById("resume-file-input").click();
};