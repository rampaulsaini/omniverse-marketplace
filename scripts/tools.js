// scripts/tools.js
// AI tool logic + tips integration

window.omniverseTools = (function(){
  const LS_KEY = 'omniverse_tools_v1';
  let tools = JSON.parse(localStorage.getItem(LS_KEY)||'[]');

  function saveTools(){ localStorage.setItem(LS_KEY, JSON.stringify(tools)) }

  function getTools(){ return tools }

  function addTool(toolName, generator=null){
    tools.push({name:toolName, generator:generator||defaultGenerator});
    saveTools(); renderToolList();
  }

  function resetTools(){ tools=[]; saveTools(); renderToolList(); document.getElementById('tool-output').value=''; }

  function defaultGenerator(){
    return "यह output placeholder है। आप AI code यहाँ जोड़ सकते हैं।";
  }

  async function runTool(index){
    const tool = tools[index];
    if(!tool) return;
    const output = await (tool.generator instanceof Function ? tool.generator() : defaultGenerator());
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
  
