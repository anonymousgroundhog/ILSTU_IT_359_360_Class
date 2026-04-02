// IR Plan Page

const IRPlanPage = {
  currentTab: 0,

  onEnter() {
    this.buildTabs();
    this.buildContent();
    this.switchTab(0);
  },

  onLeave() {
    this.flushCurrentTab();
  },

  buildTabs() {
    const container = document.getElementById("ir-tabs");
    container.innerHTML = "";

    window.planData.ir_stages.forEach((stage, idx) => {
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
    const container = document.getElementById("ir-content");
    container.innerHTML = "";

    window.planData.ir_stages.forEach((stage, idx) => {
      const content = document.createElement("div");
      content.className = `tab-content ${idx === 0 ? "active" : ""}`;
      content.id = `ir-tab-${idx}`;
      content.innerHTML = `
        <div class="form-group">
          <label for="ir-notes-${idx}">Notes & Description</label>
          <textarea id="ir-notes-${idx}" placeholder="Add notes about this stage...">${
        stage.description || ""
      }</textarea>
        </div>

        <div class="form-group">
          <label>Checklist Items</label>
          <div id="ir-checklist-${idx}"></div>
        </div>

        <button type="button" class="btn-secondary add-item-btn" data-stage-type="ir" data-stage-idx="${idx}">+ Add Item</button>
      `;
      container.appendChild(content);
      this.buildChecklist(idx);
    });
  },

  buildChecklist(stageIdx) {
    const container = document.getElementById(`ir-checklist-${stageIdx}`);
    const stage = window.planData.ir_stages[stageIdx];

    container.innerHTML = "";
    stage.checklist.forEach((item, itemIdx) => {
      const div = document.createElement("div");
      div.className = "checklist-item";
      div.innerHTML = `
        <input type="checkbox" id="ir-check-${stageIdx}-${itemIdx}" ${
        item.completed ? "checked" : ""
      }>
        <label for="ir-check-${stageIdx}-${itemIdx}">${item.text}</label>
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
    document.querySelectorAll("#ir-tabs .tab-button").forEach((btn, i) => {
      btn.classList.toggle("active", i === idx);
    });

    // Update content
    document.querySelectorAll("#ir-content .tab-content").forEach((content, i) => {
      content.classList.toggle("active", i === idx);
    });
  },

  flushCurrentTab() {
    const idx = this.currentTab;
    const notes = document.getElementById(`ir-notes-${idx}`).value.trim();
    window.planData.ir_stages[idx].description = notes;
  },
};

// Event delegation for add item buttons
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-item-btn")) {
    e.preventDefault();
    const stageType = e.target.dataset.stageType;
    if (stageType === "ir") {
      const stageIdx = parseInt(e.target.dataset.stageIdx);
      const newItem = { text: "New item", completed: false };
      window.planData.ir_stages[stageIdx].checklist.push(newItem);
      IRPlanPage.buildChecklist(stageIdx);
    }
  }
});
