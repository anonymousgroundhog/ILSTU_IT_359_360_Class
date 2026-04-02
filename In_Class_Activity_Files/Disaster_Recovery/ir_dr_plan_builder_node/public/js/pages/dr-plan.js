// DR Plan Page

const DRPlanPage = {
  currentTab: 0,

  onEnter() {
    this.buildTabs();
    this.buildContent();
    this.switchTab(0);

    document.getElementById("rto").value = window.planData.rto || "";
    document.getElementById("rpo").value = window.planData.rpo || "";
  },

  onLeave() {
    this.flushCurrentTab();
    window.planData.rto = document.getElementById("rto").value.trim();
    window.planData.rpo = document.getElementById("rpo").value.trim();
  },

  buildTabs() {
    const container = document.getElementById("dr-tabs");
    container.innerHTML = "";

    window.planData.dr_stages.forEach((stage, idx) => {
      const btn = document.createElement("button");
      btn.className = `tab-button ${idx === 0 ? "active" : ""}`;
      btn.type = "button";
      btn.textContent = `${idx + 1}. ${stage.name}`;
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        this.flushCurrentTab();
        this.switchTab(idx);
      });
      container.appendChild(btn);
    });
  },

  buildContent() {
    const container = document.getElementById("dr-content");
    container.innerHTML = "";

    window.planData.dr_stages.forEach((stage, idx) => {
      const content = document.createElement("div");
      content.className = `tab-content ${idx === 0 ? "active" : ""}`;
      content.id = `dr-tab-${idx}`;
      content.innerHTML = `
        <div class="form-group">
          <label for="dr-notes-${idx}">Notes & Description</label>
          <textarea id="dr-notes-${idx}" placeholder="Add notes about this stage...">${
        stage.description || ""
      }</textarea>
        </div>

        <div class="form-group">
          <label>Checklist Items</label>
          <div id="dr-checklist-${idx}"></div>
        </div>

        <button type="button" class="btn-secondary add-item-btn" data-stage-type="dr" data-stage-idx="${idx}">+ Add Item</button>
      `;
      container.appendChild(content);
      this.buildChecklist(idx);
    });
  },

  buildChecklist(stageIdx) {
    const container = document.getElementById(`dr-checklist-${stageIdx}`);
    const stage = window.planData.dr_stages[stageIdx];

    container.innerHTML = "";
    stage.checklist.forEach((item, itemIdx) => {
      const div = document.createElement("div");
      div.className = "checklist-item";
      div.innerHTML = `
        <input type="checkbox" id="dr-check-${stageIdx}-${itemIdx}" ${
        item.completed ? "checked" : ""
      }>
        <label for="dr-check-${stageIdx}-${itemIdx}">${item.text}</label>
        <button type="button" class="delete-btn" data-stage-idx="${stageIdx}" data-item-idx="${itemIdx}">✕</button>
      `;

      const checkbox = div.querySelector("input");
      checkbox.addEventListener("change", () => {
        stage.checklist[itemIdx].completed = checkbox.checked;
      });

      div.querySelector(".delete-btn").addEventListener("click", (e) => {
        e.preventDefault();
        stage.checklist.splice(itemIdx, 1);
        this.buildChecklist(stageIdx);
      });

      container.appendChild(div);
    });
  },

  switchTab(idx) {
    this.currentTab = idx;

    // Update tab buttons
    document.querySelectorAll("#dr-tabs .tab-button").forEach((btn, i) => {
      btn.classList.toggle("active", i === idx);
    });

    // Update content
    document.querySelectorAll("#dr-content .tab-content").forEach((content, i) => {
      content.classList.toggle("active", i === idx);
    });
  },

  flushCurrentTab() {
    const idx = this.currentTab;
    const notes = document.getElementById(`dr-notes-${idx}`).value.trim();
    window.planData.dr_stages[idx].description = notes;
  },
};

// Event delegation for add item buttons
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-item-btn")) {
    e.preventDefault();
    const stageType = e.target.dataset.stageType;
    if (stageType === "dr") {
      const stageIdx = parseInt(e.target.dataset.stageIdx);
      const newItem = { text: "New item", completed: false };
      window.planData.dr_stages[stageIdx].checklist.push(newItem);
      DRPlanPage.buildChecklist(stageIdx);
    }
  }
});
