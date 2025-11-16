// scripts/ai-core.js
// Minimal helper to call AI provider later. For now returns mock responses.
// Replace `mockCall` with real fetch to serverless endpoint which proxies OpenAI/HF.

window.AICore = (function(// scripts/ai-core.js (replace mockCall with callServer)
window.AICore = (function(){
  async function callServer(prompt, opts = {}) {
    // choose endpoint: Netlify or Vercel
    const endpoint = opts.endpoint || '/.netlify/functions/ai-proxy'; // or '/api/ai-proxy' for Vercel
    const payload = { prompt, max_tokens: opts.max_tokens || 512, temperature: opts.temperature || 0.7, model: opts.model };
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      const err = await res.text();
      throw new Error('AI server error: ' + err);
    }
    const data = await res.json();
    return data.output;
  }

  // keep mockCall as fallback
  async function mockCall(prompt){ return `MOCK: ${prompt.slice(0,200)}...`; }

  return { callServer, mockCall };
})();
                      ){
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
