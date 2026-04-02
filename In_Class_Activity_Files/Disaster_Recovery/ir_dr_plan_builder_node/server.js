const express = require("express");
const path = require("path");
const fs = require("fs").promises;
const PDFDocument = require("pdfkit");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// API Routes

// Save plan as JSON file
app.post("/api/save", async (req, res) => {
  try {
    const { filename, plan } = req.body;
    const filePath = path.join(
      require("os").homedir(),
      "Downloads",
      `${filename}.json`
    );

    await fs.writeFile(filePath, JSON.stringify(plan, null, 2));
    res.json({ success: true, path: filePath });
  } catch (err) {
    console.error("Save error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Export as Markdown
app.post("/api/export/markdown", async (req, res) => {
  try {
    const plan = req.body;
    const markdown = generateMarkdown(plan);

    res.setHeader("Content-Type", "text/markdown");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="incident_recovery_plan.md"'
    );
    res.send(markdown);
  } catch (err) {
    console.error("Export markdown error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Export as PDF
app.post("/api/export/pdf", async (req, res) => {
  try {
    const plan = req.body;
    const doc = new PDFDocument({ margin: 40 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="incident_recovery_plan.pdf"'
    );

    doc.pipe(res);

    // Title
    doc.fontSize(24).font("Helvetica-Bold").text("IR/DR Plan", { align: "center" });
    doc.moveDown(0.5);

    // Organization Info
    doc.fontSize(16).font("Helvetica-Bold").text("Organization Information");
    doc.fontSize(11).font("Helvetica");
    doc.text(`Organization: ${plan.org_name || "(Not specified)"}`);
    doc.text(`Industry: ${plan.industry || "(Not specified)"}`);
    doc.moveDown();

    doc.text("Critical Systems:");
    if (plan.critical_systems.length > 0) {
      plan.critical_systems.forEach((sys) => {
        doc.text(`  • ${sys}`);
      });
    } else {
      doc.text("  (None added)");
    }
    doc.moveDown();

    // Team
    doc.fontSize(16).font("Helvetica-Bold").text("Incident Response Team");
    doc.fontSize(11).font("Helvetica");
    if (plan.team.length > 0) {
      plan.team.forEach((member, idx) => {
        if (idx > 0) doc.moveDown(0.2);
        doc.font("Helvetica-Bold").text(member.name);
        doc.font("Helvetica")
          .text(`  Role: ${member.role}`)
          .text(`  Phone: ${member.phone}`)
          .text(`  Email: ${member.email}`);
      });
    } else {
      doc.text("(No team members added)");
    }
    doc.moveDown();

    // IR Plan
    doc.fontSize(16).font("Helvetica-Bold").text("Incident Response Plan");
    doc.fontSize(11).font("Helvetica");
    plan.ir_stages.forEach((stage) => {
      doc.font("Helvetica-Bold").text(stage.name);
      if (stage.description) {
        doc.font("Helvetica").text(stage.description);
      }
      stage.checklist.forEach((item) => {
        const status = item.completed ? "✓" : "✗";
        doc.text(`  [${status}] ${item.text}`);
      });
      doc.moveDown(0.3);
    });
    doc.moveDown();

    // DR Plan
    doc.fontSize(16).font("Helvetica-Bold").text("Disaster Recovery Plan");
    doc.fontSize(11).font("Helvetica");
    plan.dr_stages.forEach((stage) => {
      doc.font("Helvetica-Bold").text(stage.name);
      if (stage.description) {
        doc.font("Helvetica").text(stage.description);
      }
      stage.checklist.forEach((item) => {
        const status = item.completed ? "✓" : "✗";
        doc.text(`  [${status}] ${item.text}`);
      });
      doc.moveDown(0.3);
    });
    doc.moveDown();

    // Recovery Objectives
    doc.fontSize(16).font("Helvetica-Bold").text("Recovery Objectives");
    doc.fontSize(11).font("Helvetica");
    doc.text(`RTO: ${plan.rto || "(Not specified)"}`);
    doc.text(`RPO: ${plan.rpo || "(Not specified)"}`);

    doc.end();
  } catch (err) {
    console.error("Export PDF error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Serve index.html for all other routes (SPA)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Generate Markdown
function generateMarkdown(plan) {
  let markdown = "# Incident Response & Disaster Recovery Plan\n\n";

  markdown += "## Organization Information\n\n";
  markdown += `- **Organization:** ${plan.org_name || "(Not specified)"}\n`;
  markdown += `- **Industry:** ${plan.industry || "(Not specified)"}\n`;
  markdown += "\n### Critical Systems\n";
  if (plan.critical_systems.length > 0) {
    plan.critical_systems.forEach((sys) => {
      markdown += `- ${sys}\n`;
    });
  } else {
    markdown += "- (None added)\n";
  }
  markdown += "\n";

  markdown += "## Incident Response Team\n\n";
  if (plan.team.length > 0) {
    markdown += "| Name | Role | Phone | Email |\n";
    markdown += "|------|------|-------|-------|\n";
    plan.team.forEach((member) => {
      markdown += `| ${member.name} | ${member.role} | ${member.phone} | ${member.email} |\n`;
    });
  } else {
    markdown += "(No team members added)\n";
  }
  markdown += "\n";

  markdown += "## Incident Response Plan\n\n";
  plan.ir_stages.forEach((stage) => {
    markdown += `### ${stage.name}\n`;
    if (stage.description) {
      markdown += `${stage.description}\n\n`;
    }
    markdown += "**Checklist:**\n";
    stage.checklist.forEach((item) => {
      const checkbox = item.completed ? "[x]" : "[ ]";
      markdown += `- ${checkbox} ${item.text}\n`;
    });
    markdown += "\n";
  });

  markdown += "## Disaster Recovery Plan\n\n";
  plan.dr_stages.forEach((stage) => {
    markdown += `### ${stage.name}\n`;
    if (stage.description) {
      markdown += `${stage.description}\n\n`;
    }
    markdown += "**Checklist:**\n";
    stage.checklist.forEach((item) => {
      const checkbox = item.completed ? "[x]" : "[ ]";
      markdown += `- ${checkbox} ${item.text}\n`;
    });
    markdown += "\n";
  });

  markdown += "## Recovery Objectives\n\n";
  markdown += `- **RTO (Recovery Time Objective):** ${plan.rto || "(Not specified)"}\n`;
  markdown += `- **RPO (Recovery Point Objective):** ${plan.rpo || "(Not specified)"}\n`;

  return markdown;
}

// Start server
app.listen(PORT, () => {
  const url = `http://localhost:${PORT}`;
  console.log(`\n✅ IR/DR Plan Builder running at ${url}`);
  console.log(`\n📖 Open your browser and visit: ${url}\n`);
});
