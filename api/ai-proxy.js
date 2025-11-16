// api/ai-proxy.js (ESM, Vercel)
import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') return res.status(405).send('Method not allowed');

    const { prompt = '', max_tokens, temperature } = req.body || {};
    const provider = process.env.AI_PROVIDER || 'openai';
    if (!prompt) return res.status(400).json({ error: 'prompt required' });

    if (provider === 'openai') {
      const OPENAI_KEY = process.env.OPENAI_API_KEY;
      if (!OPENAI_KEY) return res.status(500).json({ error: 'OpenAI key missing' });
      const payload = {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: max_tokens || 512,
        temperature: typeof temperature !== 'undefined' ? temperature : 0.7
      };
      const r = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { Authorization: `Bearer ${OPENAI_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await r.json();
      if (!r.ok) return res.status(502).json({ error: data });
      const text = (data.choices?.[0]?.message?.content) || JSON.stringify(data);
      return res.status(200).json({ output: text });
    }

    if (provider === 'hf') {
      const HF_KEY = process.env.HUGGINGFACE_API_KEY;
      if (!HF_KEY) return res.status(500).json({ error: 'HF key missing' });
      const model = req.body.model || 'gpt2';
      const r = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${HF_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputs: prompt, parameters: { max_new_tokens: max_tokens || 256 } })
      });
      const data = await r.json();
      if (!r.ok) return res.status(502).json({ error: data });
      const text = (Array.isArray(data) && (data[0]?.generated_text || data[0]?.text)) || data.generated_text || JSON.stringify(data);
      return res.status(200).json({ output: text });
    }

    res.status(400).json({ error: 'unknown provider' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'server error' });
  }
}
