// Organization Info Page

const OrgInfoPage = {
  onEnter() {
    document.getElementById("org-name").value = window.planData.org_name || "";
    document.getElementById("industry").value = window.planData.industry || "";
    document.getElementById("critical-systems").value =
      window.planData.critical_systems.join("\n") || "";

    this.refreshSystemsList();
  },

  onLeave() {
    window.planData.org_name = document.getElementById("org-name").value.trim();
    window.planData.industry = document.getElementById("industry").value;
    window.planData.critical_systems = Array.from(
      document.querySelectorAll(".system-chip")
    ).map((chip) => chip.textContent.trim().replace(/×$/, "").trim());
  },

  refreshSystemsList() {
    const list = document.getElementById("systems-list");
    list.innerHTML = "";

    window.planData.critical_systems.forEach((system, idx) => {
      const chip = document.createElement("div");
      chip.className = "system-chip";
      chip.innerHTML = `
        ${system}
        <button type="button" data-idx="${idx}">×</button>
      `;
      chip.querySelector("button").addEventListener("click", (e) => {
        e.preventDefault();
        window.planData.critical_systems.splice(idx, 1);
        this.refreshSystemsList();
      });
      list.appendChild(chip);
    });
  },
};

// Event listeners
document.getElementById("add-systems-btn").addEventListener("click", (e) => {
  e.preventDefault();
  const text = document.getElementById("critical-systems").value.trim();
  if (text) {
    const lines = text.split("\n").map((line) => line.trim()).filter((line) => line);
    window.planData.critical_systems = lines;
    OrgInfoPage.refreshSystemsList();
  }
});
