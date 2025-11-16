// scripts/ai-core.js
// Core generator — provides generate(toolId, input, options)
// By default uses lightweight deterministic templates so no API key needed.
// Optionally, you can enable OpenAI / HF by editing useExternalLlm and providing an API key in owner settings (not enabled by default).

window.AICore = (function(){
  const useExternalLlm = false; // set true if you update marketplace.js to store an API key and want real LLM calls

  async function generateWithTemplates(toolId, input, premium=false){
    // basic templates for several tools
    input = input || {};
    switch(toolId){
      case 'resume':
        return [
          `${input.name||'John Doe'}`,
          `${input.title||'Software Engineer'}`,
          ``,
          `Summary: ${input.summary || 'Experienced professional skilled in ' + (input.skills || 'software development') + '.'}`,
          ``,
          `Experience:`,
          `- ${input.experience || 'Company A — Role (Year–Year) — Achievements...'}`,
          ``,
          `Skills: ${input.skills || 'JavaScript, Python, AI'}`,
          ``,
          premium ? `Premium Tip: Add quantified achievements and metrics.` : `Upgrade to premium for tailored ATS-optimized resume.`
        ].join('\n');
      case 'bio':
        return `${input.name || 'John Doe'} — ${input.field || 'AI & Tech Enthusiast'}. ${input.hook || 'I build practical AI tools to solve real problems.'} ${premium ? 'Premium: Includes emotional tone variants.' : ''}`;
      case 'script':
        return `// Script: ${input.task || 'Example Task'}\n(function(){\n  console.log('Omniverse AI script — ${input.task||'demo'}');\n})();\n${premium ? '// Premium: Add unit tests and CLI wrapper' : ''}`;
      case 'notes':
        return `Notes — ${input.topic||'Untitled'}\n\n1) ${input.point1||'Main takeaway'}\n2) ${input.point2||'Action items'}\n\n${premium ? 'Premium: Summarized action plan included.' : ''}`;
      case 'idea':
        return `Business Idea for ${input.field||'a niche'}:\n\nConcept: ${input.concept || 'AI-assisted automation for small businesses.'}\nProblem: ${input.problem || 'Manual repetitive tasks'}\nSolution: ${input.solution || 'A toolkit of ready automations & templates.'}\n${premium ? 'Premium: Includes go-to-market steps and pricing.' : ''}`;
      default:
        return `Tool ${toolId} generated text. Input: ${JSON.stringify(input).slice(0,300)}`;
    }
  }

  // OPTIONAL: Example OpenAI fetch wrapper (commented)
  async function generateWithLLM(prompt, model='gpt-3.5-turbo'){
    // if you enable external LLM use in marketplace.js, set window.__OMNI_API_KEY
    const key = window.__OMNI_API_KEY;
    if(!key) throw new Error('No API key configured.');
    const body = {
      model,
      messages: [{role:'user', content:prompt}],
      temperature: 0.7,
      max_tokens: 600
    };
    const res = await fetch('https://api.openai.com/v1/chat/completions',{
      method:'POST',
      headers: {'Authorization':'Bearer '+key, 'Content-Type':'application/json'},
      body: JSON.stringify(body)
    });
    if(!res.ok) throw new Error('LLM error: '+res.status);
    const j = await res.json();
    return j.choices && j.choices[0] && j.choices[0].message ? j.choices[0].message.content : JSON.stringify(j);
  }

  // main generate function
  async function generate(toolId, input, options = { premium:false, useLLM:false }){
    // prefer external LLM only if allowed
    if(options.useLLM && useExternalLlm){
      // build prompt from tool + input (simple)
      const prompt = `Generate ${toolId} content. Input: ${JSON.stringify(input)}`;
      return await generateWithLLM(prompt);
    }
    // fallback to templates
    return await generateWithTemplates(toolId, input, options.premium);
  }

  return { generate };
})();
      
