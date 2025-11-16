function saveOpenAIKey(){
  const key = document.getElementById('omniverse-openai-key').value.trim();
  localStorage.setItem('omniverse_openai_key', key);
  alert('OpenAI API key saved locally.');
}
// netlify/functions/ai-proxy.js
const fetch = require('// top of netlify function file
const RATE = {// top of netlify function file
const RATE = {};
function checkRate(ip) {
  const now = Date.now();
  const bucket = RATE[ip] || { t: now, n: 0 };
  if (now - bucket.t > 60_000) { bucket.t = now; bucket.n = 1; RATE[ip] = bucket; return true; }
  bucket.n++;
  RATE[ip] = bucket;
  return bucket.n <= 40; // 40 requests per minute
}
};
function checkRate(ip) {
  const now = Date.now();
  const bucket = RATE[ip] || { t: now, n: 0 };
  if (now - bucket.t > 60_000) { bucket.t = now; bucket.n = 1; RATE[ip] = bucket; return true; }
  bucket.n++;
  RATE[ip] = bucket;
  return bucket.n <= 40; // 40 requests per minute
}
');

exports.handler = async function(event) {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: 'Method not allowed' };
    }

    const body = JSON.parse(event.body || '{}');
    const prompt = body.prompt || '';
    const provider = process.env.AI_PROVIDER || 'openai';

    if (!prompt) {
      return { statusCode: 400, body: JSON.stringify({ error: 'prompt required' }) };
    }

    if (provider === 'openai') {
      const OPENAI_KEY = process.env.OPENAI_API_KEY;
      if (!OPENAI_KEY) return { statusCode: 500, body: JSON.stringify({ error: 'OpenAI key not configured' }) };

      // using chat completions (gpt-3.5-turbo) as safe default
      const payload = {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: body.max_tokens || 512,
        temperature: typeof body.temperature !== 'undefined' ? body.temperature : 0.7
      };

      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        timeout: 60000
      });

      const data = await res.json();
      if (!res.ok) return { statusCode: 502, body: JSON.stringify({ error: data }) };

      const text = (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || JSON.stringify(data);
      return { statusCode: 200, body: JSON.stringify({ output: text }) };
    }

    if (provider === 'hf') {
      const HF_KEY = process.env.HUGGINGFACE_API_KEY;
      if (!HF_KEY) return { statusCode: 500, body: JSON.stringify({ error: 'HuggingFace key not configured' }) };

      // Using Hugging Face text-generation inference (model slug should be set by owner if needed)
      const model = body.model || 'gpt2';
      const res = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${HF_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputs: prompt, parameters: { max_new_tokens: body.max_tokens || 256 } }),
        timeout: 60000
      });

      const data = await res.json();
      if (!res.ok) return { statusCode: 502, body: JSON.stringify({ error: data }) };

      // HF returns array or object depending on model
      const text = (Array.isArray(data) && data[0] && (data[0].generated_text || data[0].text)) || data.generated_text || JSON.stringify(data);
      return { statusCode: 200, body: JSON.stringify({ output: text }) };
    }

    return { statusCode: 400, body: JSON.stringify({ error: 'unknown provider' }) };

  } catch (err) {
    console.error('ai-proxy error', err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message || 'server error' }) };
  }
};
