// scripts/ai-core.js
// Minimal helper to call AI provider later. For now returns mock responses.
// Replace `mockCall` with real fetch to serverless endpoint which proxies OpenAI/HF.

window.AICore = (function(){
  async function mockCall(prompt, opts = {}) {
    // simple deterministic mock - safe for zero-cost live
    return `### Generated (mock)\nPrompt:\n${prompt}\n\n--\nThis is a mock output. Replace AICore.mockCall with a real API call to OpenAI/HuggingFace when ready.`;
  }

  // Example of how a real function would look (commented)
  // async function callOpenAI(prompt, apiKey) {
  //   return fetch('/.netlify/functions/ai-proxy', {method:'POST', body: JSON.stringify({prompt})}).then(r=>r.text());
  // }

  return { mockCall };
})();
