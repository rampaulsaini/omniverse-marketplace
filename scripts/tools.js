// scripts/tools.js — updated with 10+ ready AI tools
window.omniverseTools = (function(){
  const LS_KEY = 'omniverse_tools_v1';
  let tools = JSON.parse(localStorage.getItem(LS_KEY)||'[]');

  function saveTools(){ localStorage.setItem(LS_KEY, JSON.stringify(tools)) }
  function getTools(){ return tools }

  // Default AI generators (placeholders, can replace with real API)
  function resumeGenerator(){
    return `Name: John Doe
Objective: Seeking a position in AI/Tech
Skills: JavaScript, Python, AI/ML, GitHub Pages
Experience: 2 years in software development
Education: B.Tech in Computer Science`;
  }

  function bioGenerator(){
    return `John Doe is a passionate AI developer and content creator. Loves open-source projects and building zero-cost automation systems.`;
  }

  function scriptWriter(){
    return `// JavaScript Example
function greet(name){
  console.log('Hello, ' + name + '!');
}
greet('Omniverse');`;
  }

  function notesGenerator(){
    return `Meeting Notes:
- Project: Omniverse Marketplace
- Tasks: AI tools integration, owner settings, tips buttons
- Next Steps: Add 10+ ready tools, deploy to GitHub Pages
- Owner: rampaulsaini`;
  }

  function websiteTemplate(){
    return `<!DOCTYPE html>
<html>
<head><title>Omniverse Template</title></head>
<body><h1>Hello Omniverse!</h1></body>
</html>`;
  }

  function businessIdeaGenerator(){
    return `AI-Powered Marketplace for zero-cost automation tools, integrated with client-side GitHub Pages and tips system.`;
  }

  function legalLetterGenerator(){
    return `To Whom It May Concern,
This letter confirms that the services provided by John Doe are fully compliant with client agreements and privacy policies.`;
  }

  function socialMediaCaptionGenerator(){
    return `Boost your Omniverse project with zero-cost AI tools! 🚀 #AI #Automation #GitHubPages`;
  }

  function logoSloganGenerator(){
    return `Omniverse: Build, Automate, Earn`;
  }

  function promptGenerator(){
    return `AI Prompt:
"Create a short JS script to automate GitHub Pages content updates using client-side JavaScript."`;
  }

  // Mapping tools
  if(tools.length===0){
    tools = [
      {name:'Resume Generator', generator:resumeGenerator},
      {name:'Bio Generator', generator:bioGenerator},
      {name:'Script Writer', generator:scriptWriter},
      {name:'Notes Generator', generator:notesGenerator},
      {name:'Website Template', generator:websiteTemplate},
      {name:'Business Idea Generator', generator:businessIdeaGenerator},
      {name:'Legal Letter Generator', generator:legalLetterGenerator},
      {name:'Social Media Caption Generator', generator:socialMediaCaptionGenerator},
      {name:'Logo & Slogan Generator', generator:logoSloganGenerator},
      {name:'AI Prompt Generator', generator:promptGenerator}
    ];
    saveTools();
  }

  function addTool(toolName, generator=null){
    tools.push({name:toolName, generator:generator||(()=> "Output placeholder")});
    saveTools(); renderToolList();
  }

  function resetTools(){ tools=[]; saveTools(); renderToolList(); document.getElementById('tool-output').value=''; }

  async function runTool(index){
    const tool = tools[index];
    if(!tool) return;
    const output = await (tool.generator instanceof Function ? tool.generator() : "Output placeholder");
    document.getElementById('tool-output').value = output;
    renderTips();
  }

  function renderToolList(){
    const container = document.getElementById('tool-list');
    container.innerHTML='';
    tools.forEach((t,i)=>{
      const btn = document.createElement('button');
      btn.textContent=t.name;
      btn.onclick=()=>{ selectTool(i) };
      btn.id='tool-btn-'+i;
      container.appendChild(btn);
    });
  }

  let selectedIndex=null;
  function selectTool(index){
    selectedIndex=index;
    document.querySelectorAll('.sidebar button').forEach(b=>b.classList.remove('active'));
    document.getElementById('tool-btn-'+index).classList.add('active');
    document.getElementById('tool-title').textContent=tools[index].name;
    document.getElementById('tool-output').value='';
    renderTips();
  }

  function renderTips(){
    const div = document.getElementById('tips-links');
    const links = JSON.parse(localStorage.getItem('omniverse_owner_links')||'[]');
    div.innerHTML='';
    if(links.length>0){
      div.innerHTML='<strong>Support Owner:</strong> ';
      links.forEach(l=>{
        const a=document.createElement('a'); a.href=l; a.target='_blank'; a.style.marginRight='10px';
        a.textContent='💰 Tip';
        div.appendChild(a);
      });
    }
  }

  function downloadOutput(){
    const val=document.getElementById('tool-output').value;
    if(!val) return alert('No output to download.');
    const blob = new Blob([val],{type:'text/plain'});
    const url = URL.createObjectURL(blob);
    const a=document.createElement('a'); a.href=url;
    a.download=(selectedIndex!==null?tools[selectedIndex].name:'output')+'.txt';
    a.click(); URL.revokeObjectURL(url);
  }

  return { addTool, resetTools, getTools, runTool, selectTool, downloadOutput, renderToolList, renderTips, selectedIndex };
})();

// Initial render
omniverseTools.renderToolList();
omniverseTools.renderTips();
                  
