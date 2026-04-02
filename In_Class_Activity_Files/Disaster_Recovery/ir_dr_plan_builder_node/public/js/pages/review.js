// Review Page

const ReviewPage = {
  onEnter() {
    this.updatePreview();
    this.updateCompleteness();
  },

  onLeave() {
    // Review page is read-only
  },

  updatePreview() {
    const plan = window.planData;

    let preview = "INCIDENT RESPONSE & DISASTER RECOVERY PLAN\n";
    preview += "=============================================\n\n";

    preview += "ORGANIZATION INFORMATION\n";
    preview += "------------------------\n";
    preview += `Organization: ${plan.org_name || "(Not specified)"}\n`;
    preview += `Industry: ${plan.industry || "(Not specified)"}\n\n`;

    preview += "Critical Systems:\n";
    if (plan.critical_systems.length > 0) {
      plan.critical_systems.forEach((sys) => {
        preview += `  • ${sys}\n`;
      });
    } else {
      preview += "  (None added)\n";
    }
    preview += "\n";

    preview += "IR RESPONSE TEAM\n";
    preview += "----------------\n";
    if (plan.team.length > 0) {
      preview += `${"Name".padEnd(20)} | ${"Role".padEnd(15)} | ${"Phone".padEnd(14)} | Email\n`;
      preview += "-".repeat(80) + "\n";
      plan.team.forEach((member) => {
        preview += `${member.name.substring(0, 20).padEnd(20)} | ${member.role
          .substring(0, 15)
          .padEnd(15)} | ${member.phone.substring(0, 14).padEnd(14)} | ${member.email}\n`;
      });
    } else {
      preview += "(No team members added)\n";
    }
    preview += "\n";

    preview += "INCIDENT RESPONSE PLAN\n";
    preview += "----------------------\n";
    plan.ir_stages.forEach((stage) => {
      preview += `${stage.name.toUpperCase()}\n`;
      if (stage.description) {
        preview += `  ${stage.description}\n`;
      }
      if (stage.checklist.length > 0) {
        stage.checklist.forEach((item) => {
          const status = item.completed ? "✓" : "✗";
          preview += `  [${status}] ${item.text}\n`;
        });
      }
      preview += "\n";
    });

    preview += "DISASTER RECOVERY PLAN\n";
    preview += "----------------------\n";
    plan.dr_stages.forEach((stage) => {
      preview += `${stage.name.toUpperCase()}\n`;
      if (stage.description) {
        preview += `  ${stage.description}\n`;
      }
      if (stage.checklist.length > 0) {
        stage.checklist.forEach((item) => {
          const status = item.completed ? "✓" : "✗";
          preview += `  [${status}] ${item.text}\n`;
        });
      }
      preview += "\n";
    });

    preview += "Recovery Objectives:\n";
    preview += `  RTO: ${plan.rto || "(Not specified)"}\n`;
    preview += `  RPO: ${plan.rpo || "(Not specified)"}\n`;

    document.getElementById("preview-content").textContent = preview;
  },

  updateCompleteness() {
    const plan = window.planData;
    let totalChecks = 0;
    let completedChecks = 0;

    plan.ir_stages.forEach((stage) => {
      stage.checklist.forEach((item) => {
        totalChecks++;
        if (item.completed) completedChecks++;
      });
    });

    plan.dr_stages.forEach((stage) => {
      stage.checklist.forEach((item) => {
        totalChecks++;
        if (item.completed) completedChecks++;
      });
    });

    let percentage = 0;
    if (totalChecks > 0) {
      percentage = Math.round((completedChecks / totalChecks) * 100);
    }

    let fieldsChecked = 0;
    const totalFields = 5;
    if (plan.org_name) fieldsChecked++;
    if (plan.industry) fieldsChecked++;
    if (plan.team.length > 0) fieldsChecked++;
    if (plan.rto) fieldsChecked++;
    if (plan.rpo) fieldsChecked++;

    document.getElementById("completeness-fill").style.width = `${percentage}%`;
    document.getElementById("completeness-text").textContent =
      `${percentage}% checklists complete • ${fieldsChecked}/${totalFields} info fields filled`;
  },
};

// Export functions
async function exportMarkdown() {
  const plan = window.planData;
  const response = await fetch("/api/export/markdown", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(plan),
  });

  if (response.ok) {
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "incident_recovery_plan.md";
    a.click();
    URL.revokeObjectURL(url);
  } else {
    alert("Failed to export Markdown");
  }
}

async function exportPDF() {
  const plan = window.planData;
  const response = await fetch("/api/export/pdf", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(plan),
  });

  if (response.ok) {
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "incident_recovery_plan.pdf";
    a.click();
    URL.revokeObjectURL(url);
  } else {
    alert("Failed to export PDF");
  }
}

// Event listeners
document.getElementById("export-md-btn").addEventListener("click", exportMarkdown);
document.getElementById("export-pdf-btn").addEventListener("click", exportPDF);
