// scripts/tools.js
window.OmniTools = (function(){
  const tools = [
    {id:'resume', name:'Resume Generator', desc:'Professional resume from simple fields', price:49,
      run: async (inp)=> {
        const name = inp.name||'John Doe', title=inp.title||'Software Engineer';
        return `RESUME\nName: ${name}\nTitle: ${title}\nSummary: An experienced ${title} with expertise in ${inp.skills||'JavaScript, Python'}.\nExperience:\n- Company A: Role\n- Company B: Role\nEducation: ${inp.education||'B.Tech / M.Sc'}`;
      }
    },
    {id:'bio', name:'Short Bio', desc:'2-line professional bio', price:9,
      run: async (inp)=> `I am ${inp.name||'John Doe'}, a ${inp.title||'developer'} focused on ${inp.field||'AI & automation'}. Passionate about building practical tools.` },
    {id:'linkedin', name:'LinkedIn Headline + About', desc:'Optimized LinkedIn headline and about text', price:29,
      run: async (inp)=> `Headline: ${inp.title||'Product Engineer'} • ${inp.keySkill||'AI, ML'}\nAbout: I build... (AI-generated summary tailored to ${inp.industry||'tech'})`},
    {id:'cover', name:'Cover Letter', desc:'Job application cover letter', price:49,
      run: async (inp)=> `To Hiring Manager,\nI, ${inp.name||'John Doe'}, apply for ${inp.position||'role'} at ${inp.company||'Company'}. I bring ${inp.experience||'X years'} of experience...`},
    {id:'script', name:'Code Snippet Generator', desc:'JS/Python starter snippet', price:19,
      run: async (inp)=> `// Snippet for: ${inp.task||'example task'}\nconsole.log('This is a starter snippet for ${inp.task||'task'}');`},
    {id:'website', name:'Simple Website Template', desc:'Static HTML template (single page)', price:99,
      run: async (inp)=> `<html><head><title>${inp.siteTitle||'My Site'}</title></head><body><h1>${inp.siteTitle||'Hello'}</h1><p>Powered by Omniverse</p></body></html>`},
    {id:'notes', name:'Meeting / Study Notes', desc:'Organize topics into notes', price:9,
      run: async (inp)=> `Notes for ${inp.topic||'Topic'}\n- Point 1\n- Point 2\nActions:\n- Next steps`},
    {id:'idea', name:'Business Idea', desc:'New startup/product idea', price:19,
      run: async (inp)=> `Idea: ${inp.field||'AI-enabled scheduling'}\nWhy: Solves ... Audience: ...`},
    {id:'social', name:'Social Media Captions', desc:'10 captions for a post', price:9,
      run: async (inp)=> Array.from({length:10},(_,i)=>`Caption ${i+1} about ${inp.subject||'your topic'}`).join('\n')},
    {id:'seo', name:'SEO Meta + Title', desc:'Title + meta description suggestions', price:9,
      run: async (inp)=> `Title: ${inp.title||'Your Page Title'} | ${inp.brand||'Brand'}\nMeta: Short description focusing on ${inp.keywords||'keywords'}`},
    {id:'email', name:'Cold Email Template', desc:'Sales/outreach email', price:29,
      run: async (inp)=> `Hi ${inp.contact||'Name'},\nI'm reaching out about ${inp.offer||'service'}...`},
    {id:'sop', name:'Statement of Purpose (SOP)', desc:'Academic / Program SOP starter', price:49,
      run: async (inp)=> `Statement of Purpose for ${inp.program||'program'} by ${inp.name||'Applicant'}...`},
    {id:'contract', name:'Simple Contract/Letter', desc:'Basic agreement template', price:49,
      run: async (inp)=> `Agreement between ${inp.partyA||'A'} and ${inp.partyB||'B'} regarding ${inp.subject||'work'}.`},
    {id:'logo', name:'Brand Slogan / Tagline', desc:'Slogans & taglines', price:9,
      run: async (inp)=> `Tagline ideas for ${inp.brand||'Brand'}:\n- ${inp.brand||'Brand'}: Make it simple.`},
    {id:'prompt', name:'Prompt Generator (for AI)', desc:'High-quality prompts for ChatGPT / image models', price:19,
      run: async (inp)=> `Prompt:\nGenerate a ${inp.style||'concise'} ${inp.type||'marketing copy'} about ${inp.topic||'topic'} with examples.`},
    {id:'resume-review', name:'Resume Review + Tips', desc:'Feedback + quick edits', price:59,
      run: async (inp)=> `Quick review notes for resume: improve headings, use metrics, clarify experience.`},
    {id:'ad', name:'Short Ad Copy (Google/Facebook)', desc:'3 variations of ad copy', price:29,
      run: async (inp)=> `1) ${inp.product||'Product'} — fast, reliable\n2) Variation two\n3) Variation three`},
    {id:'namegen', name:'Product / Company Name', desc:'Name ideas and rationale', price:9,
      run: async (inp)=> `Names: ${[ 'Nova', 'Koyab', 'OmniPlus' ].join(', ')}\nReasons: Memorable, short.`},
    {id:'studyplan', name:'Study / Learning Plan', desc:'30-day study plan', price:19,
      run: async (inp)=> `30-day plan for ${inp.subject||'ML'}: Week1: Basics; Week2: Intermediate...`},
    {id:'pitch', name:'Investor Pitch Summary', desc:'One-page pitch summary', price:99,
      run: async (inp)=> `Pitch: Problem: ${inp.problem||'...'}\nSolution: ${inp.solution||'...'}\nMarket: ${inp.market||'...'}\nAsk: ${inp.ask||'...'} `},
  ];

  function getAll(){ return tools; }
  function find(id){ return tools.find(t=>t.id===id); }
  return { getAll, find };
})();
