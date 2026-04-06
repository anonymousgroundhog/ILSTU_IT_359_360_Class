#!/usr/bin/env node
/**
 * Test connection to OpenWebUI server
 * Usage: node test-connection.js <server-url> <api-key>
 */

const serverUrl = process.argv[2];
const apiKey = process.argv[3];

if (!serverUrl || !apiKey) {
  console.log("Usage: node test-connection.js <server-url> <api-key>");
  console.log(
    "Example: node test-connection.js http://sushi.it.ilstu.edu:8080 your-api-key"
  );
  process.exit(1);
}

async function testConnection() {
  console.log("🔍 Testing connection to OpenWebUI server...\n");
  console.log(`Server URL: ${serverUrl}`);
  console.log(`API Key: ${apiKey.substring(0, 5)}***\n`);

  // Test 1: Fetch models
  console.log("1️⃣  Testing /api/models endpoint...");
  try {
    const response = await fetch(`${serverUrl}/api/models`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    console.log(`   Status: ${response.status}`);

    if (response.ok) {
      const data = await response.json();
      console.log("   ✅ SUCCESS - Got models response");

      // Try to extract models
      let models = [];
      if (Array.isArray(data)) {
        models = data;
      } else if (data.data && Array.isArray(data.data)) {
        models = data.data;
      } else if (data.models && Array.isArray(data.models)) {
        models = data.models;
      }

      if (models.length > 0) {
        console.log(`   Found ${models.length} model(s):`);
        models.slice(0, 3).forEach((m) => {
          const modelId = m.id || m.name || m;
          console.log(`     - ${modelId}`);
        });
        if (models.length > 3) {
          console.log(`     ... and ${models.length - 3} more`);
        }
      } else {
        console.log("   ⚠️  No models found in response");
        console.log("   Response data:", JSON.stringify(data, null, 2).substring(0, 200));
      }
    } else {
      const text = await response.text();
      console.log(`   ❌ FAILED - ${response.status}`);
      console.log(`   Response: ${text.substring(0, 100)}`);
    }
  } catch (err) {
    console.log(`   ❌ ERROR - ${err.message}`);
  }

  // Test 2: Chat completion
  console.log("\n2️⃣  Testing /api/chat/completions endpoint...");
  try {
    const response = await fetch(`${serverUrl}/api/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "translategemma:latest",
        messages: [{ role: "user", content: "Say 'test successful'" }],
        stream: false,
      }),
    });

    console.log(`   Status: ${response.status}`);

    if (response.ok) {
      const data = await response.json();
      let content = "";

      if (data.choices && Array.isArray(data.choices) && data.choices.length > 0) {
        content = data.choices[0]?.message?.content || "";
      } else if (data.result) {
        content = data.result;
      }

      if (content) {
        console.log("   ✅ SUCCESS - Got chat response");
        console.log(`   Response: ${content.substring(0, 100)}`);
      } else {
        console.log("   ⚠️  Got empty response");
        console.log("   Response data:", JSON.stringify(data, null, 2).substring(0, 200));
      }
    } else {
      const text = await response.text();
      console.log(`   ❌ FAILED - ${response.status}`);
      console.log(`   Response: ${text.substring(0, 100)}`);
    }
  } catch (err) {
    console.log(`   ❌ ERROR - ${err.message}`);
  }

  console.log("\n✨ Connection test complete!");
  console.log(
    "\nIf both tests passed, you're ready to use the AI Scenario Generator."
  );
}

testConnection();
