// scripts/tools.js
// Replace existing file with this version that calls serverless AI proxy.

window.OmniTools = (function(){
  const tools = [
    { id:'resume', title:'Resume Generator', price:49,
      buildPrompt: (input)=> `Write a concise professional resume for ${input.name||'John Doe'}. Title: ${input.title||'Software Engineer'}. Skills: ${input.skills||'JavaScript, Python'}. Keep it 6-10 bullet points and a short summary.`,
      run: async (input)=> {
        const p = (typeof input === 'string') ? input : (typeof input==='object' ? JSON.stringify(input) : String(input));
        const prompt = toolsMap('resume').buildPrompt(input);
        try { return await AICore.callServer(prompt, { max_tokens: 400 }); }
        catch(e){ console.warn('AI server failed, fallback to mock', e); return await AICore.mockCall(prompt); }
      }
    },
    { id:'bio', title:'Short Bio', price:9,
      buildPrompt: (input)=> `Write a short two-line professional bio for ${input.name||'John Doe'}. Mention field: ${input.field||'AI'} and one sentence about strengths.`,
      run: async (input)=> {
        const prompt = toolsMap('bio').buildPrompt(input);
        try { return await AICore.callServer(prompt, { max_tokens: 80 }); }
        catch(e){ return AICore.mockCall(prompt); }
      }
    },
    { id:'script', title:'Script Writer', price:19,
      buildPrompt: (input)=> `Generate a small ${input.lang||'JavaScript'} script that ${input.task||'demonstrates the requested functionality'}. Keep it concise and runnable.`,
      run: async (input)=> {
        const prompt = toolsMap('script').buildPrompt(input);
        try { return await AICore.callServer(prompt, { max_tokens: 200 }); }
        catch(e){ return AICore.mockCall(prompt); }
      }
    },
    { id:'notes', title:'Notes Maker', price:9,
      buildPrompt: (input)=> `Summarize notes for topic: ${input.topic||'Meeting'}. Provide bullets, key points, and 3 action items.`,
      run: async (input)=> {
        const prompt = toolsMap('notes').buildPrompt(input);
        try { return await AICore.callServer(prompt, { max_tokens: 200 }); }
        catch(e){ return AICore.mockCall(prompt); }
      }
    },
    { id:'business', title:'Business Idea Generator', price:19,
      buildPrompt: (input)=> `Generate a short business idea for domain: ${input.domain||'AI automation'}. Include target users, revenue model, and a 2-sentence pitch.`,
      run: async (input)=> {
        const prompt = toolsMap('business').buildPrompt(input);
        try { return await AICore.callServer(prompt, { max_tokens: 200 }); }
        catch(e){ return AICore.mockCall(prompt); }
      }
    },
    { id:'caption', title:'Social Caption Maker', price:9,
      buildPrompt: (input)=> `Write 8 short social media captions for: ${input.subject||'product'}. Tone: ${input.tone||'friendly'}.`,
      run: async (input)=> {
        const prompt = toolsMap('caption').buildPrompt(input);
        try { return await AICore.callServer(prompt, { max_tokens: 160 }); }
        catch(e){ return AICore.mockCall(prompt); }
      }
    },
    { id:'slogan', title:'Brand Slogan Generator', price:9,
      buildPrompt: (input)=> `Create 10 slogan/tagline ideas for brand: ${input.brand||'Brand'}. Keep them short, catchy, and unique.`,
      run: async (input)=> {
        const prompt = toolsMap('slogan').buildPrompt(input);
        try { return await AICore.callServer(prompt, { max_tokens: 120 }); }
        catch(e){ return AICore.mockCall(prompt); }
      }
    },
    { id:'legal', title:'Legal Letter Generator', price:49,
      buildPrompt: (input)=> `Draft a simple legal letter for: ${input.subject||'agreement'} between ${input.partyA||'A'} and ${input.partyB||'B'}. Use clear formal tone.`,
      run: async (input)=> {
        const prompt = toolsMap('legal').buildPrompt(input);
        try { return await AICore.callServer(prompt, { max_tokens: 400 }); }
        catch(e){ return AICore.mockCall(prompt); }
      }
    },
    { id:'template', title:'Website Template Generator', price:99,
      buildPrompt: (input)=> `Generate a simple single-page HTML template for: ${input.title||'Landing Page'}. Include header, hero, features and footer (HTML only).`,
      run: async (input)=> {
        const prompt = toolsMap('template').buildPrompt(input);
        try { return await AICore.callServer(prompt, { max_tokens: 600 }); }
        catch(e){ return AICore.mockCall(prompt); }
      }
    },
    { id:'automation', title:'Task Automation Prompter', price:19,
      buildPrompt: (input)=> `Create a step-by-step prompt and plan for automating: ${input.task||'email scheduling'} using AI agents. Include triggers, inputs and expected outputs.`,
      run: async (input)=> {
        const prompt = toolsMap('automation').buildPrompt(input);
        try { return await AICore.callServer(prompt, { max_tokens: 300 }); }
        catch(e){ return AICore.mockCall(prompt); }
      }
    }
  ];

  // helper to find tool by id quickly inside run functions
  function toolsMap(id){
    return tools.find(t=>t.id===id);
  }

  function all(){ return tools; }
  function find(id){ return tools.find(t=>t.id===id); }

  return { all, find };
})();
                    
