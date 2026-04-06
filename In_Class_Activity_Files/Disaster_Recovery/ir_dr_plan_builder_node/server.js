const express = require("express");
const path = require("path");
const fs = require("fs").promises;
const PDFDocument = require("pdfkit");

const app = express();
const PORT = process.env.PORT || 3001;

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

// Proxy: Fetch available models from OpenWebUI
app.post("/api/ai/models", async (req, res) => {
  try {
    let { serverUrl, apiKey } = req.body;

    if (!serverUrl || !apiKey) {
      return res
        .status(400)
        .json({ error: "serverUrl and apiKey are required" });
    }

    // Normalize URL (remove trailing slash, ensure http/https)
    serverUrl = serverUrl.trim().replace(/\/$/, "");
    if (!serverUrl.startsWith("http")) {
      serverUrl = "http://" + serverUrl;
    }

    // Try multiple endpoint variations and header formats
    // Based on OpenWebUI/Ollama API: https://docs.openwebui.com/reference/api-endpoints
    const endpoints = [
      { url: `${serverUrl}/api/models`, headerType: "bearer" },
      { url: `${serverUrl}/api/models`, headerType: "x-api-key" },
    ];

    let response, data;
    let lastError;

    for (const { url, headerType } of endpoints) {
      try {
        console.log(`Trying models endpoint: ${url} (${headerType})`);
        const headers =
          headerType === "bearer"
            ? { Authorization: `Bearer ${apiKey}` }
            : { "X-API-Key": apiKey };

        response = await fetch(url, {
          method: "GET",
          headers,
        });

        console.log(`Response status: ${response.status}`);

        if (response.ok) {
          const text = await response.text();
          console.log(`Response text (first 200 chars): ${text.substring(0, 200)}`);

          try {
            data = JSON.parse(text);
            console.log("Models fetched successfully:", data);
            break;
          } catch (jsonErr) {
            console.log(`Failed to parse JSON from ${url}:`, jsonErr.message);
            lastError = `Invalid JSON response from ${url}`;
          }
        } else {
          const text = await response.text();
          lastError = `${url} returned ${response.status}: ${text.substring(0, 100)}`;
          console.log(lastError);
        }
      } catch (err) {
        lastError = err.message;
        console.log(`Error with ${url}:`, err.message);
      }
    }

    if (!data) {
      return res.status(400).json({
        error: `Could not fetch models: ${lastError}. Please verify the server URL and API key. See console for details.`,
      });
    }

    // Handle different response formats
    let models = [];
    if (Array.isArray(data)) {
      models = data;
    } else if (data.data && Array.isArray(data.data)) {
      models = data.data;
    } else if (data.models && Array.isArray(data.models)) {
      models = data.models;
    } else {
      console.log("Unexpected data format, got:", data);
      return res.status(400).json({
        error: `Unexpected response format from ${serverUrl}. Expected array of models or {data: [...]} format.`,
      });
    }

    if (models.length === 0) {
      return res.status(400).json({
        error: `No models found on ${serverUrl}. Please check your server connection and verify the server has models available.`,
      });
    }

    const formatted = models.map((m) => {
      // Handle different model object formats
      const id = m.id || m.name || (typeof m === "string" ? m : null);
      const name = m.name || m.id || (typeof m === "string" ? m : null);
      return { id, name };
    });

    res.json({ models: formatted });
  } catch (err) {
    console.error("Models fetch error:", err);
    res.status(500).json({ error: `Server error: ${err.message}` });
  }
});

// Proxy: Generate scenario via OpenWebUI chat completion
app.post("/api/ai/generate", async (req, res) => {
  try {
    let { serverUrl, apiKey, model, prompt } = req.body;

    if (!serverUrl || !apiKey || !model || !prompt) {
      return res.status(400).json({
        error: "serverUrl, apiKey, model, and prompt are required",
      });
    }

    // Normalize URL (remove trailing slash, ensure http/https)
    serverUrl = serverUrl.trim().replace(/\/$/, "");
    if (!serverUrl.startsWith("http")) {
      serverUrl = "http://" + serverUrl;
    }

    // Try multiple endpoint variations and header formats
    const endpoints = [
      { url: `${serverUrl}/api/chat/completions`, headerType: "bearer" },
      { url: `${serverUrl}/api/chat/completions`, headerType: "x-api-key" },
      { url: `${serverUrl}/v1/chat/completions`, headerType: "bearer" },
    ];

    let response, data;
    let lastError;

    for (const { url, headerType } of endpoints) {
      try {
        console.log(`Trying chat endpoint: ${url} (${headerType})`);
        const headers =
          headerType === "bearer"
            ? {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
              }
            : {
                "Content-Type": "application/json",
                "X-API-Key": apiKey,
              };

        response = await fetch(url, {
          method: "POST",
          headers,
          body: JSON.stringify({
            model,
            messages: [{ role: "user", content: prompt }],
            stream: false,
          }),
        });

        console.log(`Response status: ${response.status}`);

        if (response.ok) {
          const text = await response.text();
          console.log(`Response text (first 200 chars): ${text.substring(0, 200)}`);
          try {
            data = JSON.parse(text);
            console.log("Chat completion received successfully");
            break;
          } catch (jsonErr) {
            console.log(`Failed to parse JSON from ${url}:`, jsonErr.message);
            lastError = `Invalid JSON response from ${url}`;
          }
        } else {
          const text = await response.text();
          lastError = `${url} returned ${response.status}: ${text.substring(0, 100)}`;
          console.log(lastError);
        }
      } catch (err) {
        lastError = err.message;
        console.log(`Error with ${url}:`, err.message);
      }
    }

    if (!data) {
      return res.status(400).json({
        error: `Could not generate scenario: ${lastError}. Please verify the server URL, API key, and model name.`,
      });
    }

    // Handle different response formats (OpenAI-compatible format)
    let content = "";
    if (data.choices && Array.isArray(data.choices) && data.choices.length > 0) {
      content = data.choices[0]?.message?.content || "";
    } else if (data.result) {
      content = data.result;
    } else if (data.message) {
      content = data.message;
    }

    if (!content) {
      return res.status(400).json({
        error: `Model returned empty response. Check that the model name "${model}" exists on the server.`,
      });
    }

    res.json({ content });
  } catch (err) {
    console.error("Generate error:", err);
    res.status(500).json({ error: `Server error: ${err.message}` });
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
