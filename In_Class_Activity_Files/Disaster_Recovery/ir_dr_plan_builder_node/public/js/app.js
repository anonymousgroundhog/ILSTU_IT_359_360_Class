// Main App Router and State Management

let planData = makeDefaultPlan();
window.planData = planData;

const pages = [
  WelcomePage,
  OrgInfoPage,
  IRTeamPage,
  IRPlanPage,
  DRPlanPage,
  ReviewPage,
  AIScenarioPage,
];

let currentPageIdx = 0;

function showPage(idx) {
  if (idx < 0 || idx >= pages.length) return;

  // Flush current page
  if (pages[currentPageIdx].onLeave) {
    pages[currentPageIdx].onLeave();
  }

  // Hide current, show next
  document.querySelector("section.active").classList.remove("active");
  document.getElementById(`page-${idx}`).classList.add("active");

  // Load new page
  currentPageIdx = idx;
  if (pages[idx].onEnter) {
    pages[idx].onEnter();
  }

  // Update sidebar
  updateSidebar();

  // Scroll to top
  document.querySelector(".pages-container").scrollTop = 0;
}

function updateSidebar() {
  const buttons = document.querySelectorAll(".step-button");
  buttons.forEach((btn, idx) => {
    btn.classList.toggle("active", idx === currentPageIdx);
    if (idx <= currentPageIdx) {
      btn.classList.add("visited");
    }
  });

  // Update progress bar
  const progress = (currentPageIdx / (pages.length - 1)) * 100;
  document.querySelector(".progress-fill").style.width = `${progress}%`;
}

// Navigation event listeners
document.querySelectorAll(".step-button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const idx = parseInt(btn.dataset.step);
    showPage(idx);
  });
});

document.querySelectorAll(".next-page-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const nextIdx = parseInt(btn.dataset.next);
    showPage(nextIdx);
  });
});

document.querySelectorAll(".prev-page-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const prevIdx = parseInt(btn.dataset.prev);
    showPage(prevIdx);
  });
});

// Welcome page buttons
document.getElementById("start-btn").addEventListener("click", () => {
  planData = makeDefaultPlan();
  window.planData = planData;
  showPage(1);
});

document.getElementById("load-file-btn").addEventListener("click", () => {
  document.getElementById("file-input").click();
});

// Save/Load buttons in sidebar
document.getElementById("save-btn").addEventListener("click", async () => {
  // Flush current page
  pages[currentPageIdx].onLeave();

  const filename = window.prompt(
    "Enter filename (without extension):",
    "incident_recovery_plan"
  );
  if (!filename) return;

  const response = await fetch("/api/save", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      filename: filename.replace(/[^a-z0-9_-]/gi, "_"),
      plan: planData,
    }),
  });

  if (response.ok) {
    alert("Plan saved successfully!");
  } else {
    alert("Failed to save plan");
  }
});

document.getElementById("load-btn").addEventListener("click", () => {
  document.getElementById("file-input").click();
});

// File input handler
document.getElementById("file-input").addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const text = await file.text();
  try {
    const loaded = JSON.parse(text);
    planData = loaded;
    window.planData = planData;
    showPage(1);
    alert("Plan loaded successfully!");
  } catch (err) {
    alert("Failed to load plan: Invalid JSON");
  }
  e.target.value = ""; // Reset input
});

// Initialize
window.addEventListener("DOMContentLoaded", () => {
  updateSidebar();
});
