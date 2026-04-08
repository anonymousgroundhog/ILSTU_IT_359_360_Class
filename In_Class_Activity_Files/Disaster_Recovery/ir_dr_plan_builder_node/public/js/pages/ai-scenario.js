// AI Scenario Page

const AIScenarioPage = {
  onEnter() {
    // Restore saved values from sessionStorage and planData
    const savedUrl = sessionStorage.getItem("ai_server_url") || "";
    const savedKey = sessionStorage.getItem("ai_api_key") || "";

    document.getElementById("ai-server-url").value = savedUrl;
    document.getElementById("ai-api-key").value = savedKey;

    // Restore generated scenarios from raw markdown
    const tabletopMarkdown =
      window.planData.ai_scenarios.tabletop || "";
    const simulationMarkdown =
      window.planData.ai_scenarios.simulation || "";

    // Store raw markdown in hidden fields
    document.getElementById("ai-tabletop-raw").value = tabletopMarkdown;
    document.getElementById("ai-sim-raw").value = simulationMarkdown;

    // Render markdown to HTML
    this.renderMarkdown("ai-tabletop-output", tabletopMarkdown);
    this.renderMarkdown("ai-sim-output", simulationMarkdown);

    this.clearStatus();
  },

  onLeave() {
    // Save raw markdown from hidden fields to planData
    window.planData.ai_scenarios.tabletop = document.getElementById(
      "ai-tabletop-raw"
    ).value;
    window.planData.ai_scenarios.simulation = document.getElementById(
      "ai-sim-raw"
    ).value;

    // Save connection settings to sessionStorage for convenience
    sessionStorage.setItem(
      "ai_server_url",
      document.getElementById("ai-server-url").value
    );
    sessionStorage.setItem(
      "ai_api_key",
      document.getElementById("ai-api-key").value
    );
  },

  renderMarkdown(elementId, markdown) {
    const container = document.getElementById(elementId);
    if (!markdown || markdown.trim().length === 0) {
      container.innerHTML = "";
      return;
    }

    // Configure marked options
    marked.setOptions({
      breaks: true,
      gfm: true,
    });

    // Render markdown to HTML
    const html = marked.parse(markdown);

    // Clear container and add markdown content
    container.innerHTML = html;
    container.classList.add("markdown-output");

    // Find or create button wrapper
    let wrapper = container.nextElementSibling;
    if (!wrapper || wrapper.className !== "copy-btn-wrapper") {
      wrapper = document.createElement("div");
      wrapper.className = "copy-btn-wrapper";
      container.parentNode.insertBefore(wrapper, container.nextSibling);
    } else {
      wrapper.innerHTML = "";
    }

    // Add copy button to wrapper
    const copyBtn = document.createElement("button");
    copyBtn.type = "button";
    copyBtn.className = "btn-copy";
    copyBtn.textContent = "📋 Copy to Clipboard";
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(markdown).then(() => {
        copyBtn.textContent = "✓ Copied!";
        setTimeout(() => {
          copyBtn.textContent = "📋 Copy to Clipboard";
        }, 2000);
      });
    });
    wrapper.appendChild(copyBtn);
  },

  setStatus(message, type = "info") {
    const el = document.getElementById("ai-status");
    el.textContent = message;
    el.style.color =
      type === "error"
        ? "var(--accent-red)"
        : type === "success"
          ? "var(--accent-green)"
          : "var(--text-muted)";
  },

  clearStatus() {
    document.getElementById("ai-status").textContent = "";
  },

  async fetchModels() {
    const serverUrl = document.getElementById("ai-server-url").value.trim();
    const apiKey = document.getElementById("ai-api-key").value.trim();

    if (!serverUrl || !apiKey) {
      this.setStatus("Please enter both server URL and API key", "error");
      return;
    }

    this.setStatus("Fetching models...");
    try {
      const response = await fetch("/api/ai/models", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serverUrl, apiKey }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}: Failed to fetch models`);
      }

      const models = data.models || [];

      if (!models || models.length === 0) {
        this.setStatus("No models found on server", "error");
        return;
      }

      const select = document.getElementById("ai-model-select");
      select.innerHTML = models
        .map((m) => `<option value="${m.id}">${m.name}</option>`)
        .join("");

      this.setStatus(`Loaded ${models.length} model(s)`, "success");
    } catch (err) {
      this.setStatus(`Error: ${err.message}`, "error");
      console.error("Models fetch failed:", err);
    }
  },

  async generateScenario(type) {
    const serverUrl = document.getElementById("ai-server-url").value.trim();
    const apiKey = document.getElementById("ai-api-key").value.trim();
    const selectedModel = document.getElementById("ai-model-select").value;

    if (!serverUrl || !apiKey || !selectedModel) {
      this.setStatus(
        "Please configure connection and select a model first",
        "error"
      );
      return;
    }

    const planData = window.planData;
    const systemsList =
      planData.critical_systems.length > 0
        ? planData.critical_systems.join(", ")
        : "(no systems specified)";

    let prompt =
      type === "tabletop"
        ? `You are a cybersecurity expert. Create a detailed tabletop exercise scenario for ${planData.org_name || "the organization"}, a ${planData.industry || "general"} organization with these critical systems: ${systemsList}. Include: scenario title, background, inject timeline (5 injects), and discussion questions. Format the output clearly with sections and bullet points.`
        : `You are a cybersecurity expert. Create a realistic incident simulation scenario for testing the IR/DR plan of ${planData.org_name || "the organization"} (${planData.industry || "general"} sector) with critical systems: ${systemsList}. Include: incident type, attack timeline, affected systems, indicators of compromise, and expected IR team actions per phase. Format the output clearly with sections and bullet points.`;

    const outputId =
      type === "tabletop" ? "ai-tabletop-output" : "ai-sim-output";
    const rawId = type === "tabletop" ? "ai-tabletop-raw" : "ai-sim-raw";

    this.setStatus(
      `Generating ${type === "tabletop" ? "tabletop exercise" : "incident simulation"}...`
    );

    try {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serverUrl, apiKey, model: selectedModel, prompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}: Failed to generate scenario`);
      }

      if (!data.content) {
        throw new Error("Model returned empty response. Check server logs.");
      }

      // Save raw markdown to hidden field
      document.getElementById(rawId).value = data.content;

      // Render markdown to display
      this.renderMarkdown(outputId, data.content);

      this.setStatus("Scenario generated successfully", "success");
    } catch (err) {
      this.setStatus(`Error: ${err.message}`, "error");
      console.error("Generate failed:", err);
    }
  },
};

// Event listeners
document.getElementById("ai-fetch-models-btn").addEventListener("click", () => {
  AIScenarioPage.fetchModels();
});

document
  .getElementById("ai-gen-tabletop-btn")
  .addEventListener("click", () => {
    AIScenarioPage.generateScenario("tabletop");
  });

document.getElementById("ai-gen-sim-btn").addEventListener("click", () => {
  AIScenarioPage.generateScenario("simulation");
});
