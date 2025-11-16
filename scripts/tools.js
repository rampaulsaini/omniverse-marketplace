// Initialize 100 tools if not already in localStorage
const LS_KEY = 'omniverse_tools_v1';
let tools = JSON.parse(localStorage.getItem(LS_KEY) || '[]');

if (tools.length === 0) {
    tools = [];
    for (let i = 1; i <= 100; i++) {
        tools.push({
            name: `Tool ${i}`,                // नाम sidebar में दिखेगा
            generatorPrompt: `Generate content for Tool ${i}` // AI prompt
        });
    }
    localStorage.setItem(LS_KEY, JSON.stringify(tools));
}

// Render sidebar
function renderToolList() {
    const container = document.getElementById('tool-list');
    container.innerHTML = '';
    tools.forEach((t, i) => {
        const btn = document.createElement('button');
        btn.textContent = t.name;        // यहाँ text set किया
        btn.id = 'tool-btn-' + i;
        btn.onclick = () => selectTool(i);
        container.appendChild(btn);
    });
}

// Call render on page load
renderToolList();
// Generate 100 tools dynamically
let tools = [];
for(let i=1; i<=100; i++){
  tools.push({
    name: `Tool ${i}`,
    generator: ()=> `This is the output of Tool ${i}`
  });
}

// Save to localStorage
localStorage.setItem('omniverse_tools_v1', JSON.stringify(tools));

// Functions (same as before)
function saveTools(){ localStorage.setItem('omniverse_tools_v1',JSON.stringify(tools)) }
let selectedIndex=null;

function runTool(){
  if(selectedIndex!==null){
    const output=tools[selectedIndex].generator();
    document.getElementById('tool-output').value=output;
    renderTips();
  } else alert('Select a tool first.');
}

function downloadOutput(){
  const val=document.getElementById('tool-output').value;
  if(!val) return alert('No output');
  const blob=new Blob([val],{type:'text/plain'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;
  a.download=(selectedIndex!==null?tools[selectedIndex].name:'output')+'.txt';
  a.click(); URL.revokeObjectURL(url);
}

function selectTool(i){
  selectedIndex=i;
  document.querySelectorAll('.sidebar button').forEach(b=>b.classList.remove('active'));
  document.getElementById('tool-btn-'+i).classList.add('active');
  document.getElementById('tool-title').textContent=tools[i].name;
  document.getElementById('tool-output').value='';
  renderTips();
}

function renderToolList(){
  const container=document.getElementById('tool-list');
  container.innerHTML='';
  tools.forEach((t,i)=>{
    const btn=document.createElement('button');
    btn.textContent=t.name;
    btn.id='tool-btn-'+i;
    btn.onclick=()=>selectTool(i);
    container.appendChild(btn);
  });
}

function renderTips(){
  const div=document.getElementById('tips-links');
  const links=JSON.parse(localStorage.getItem('omniverse_owner_links')||'[]');
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

// Initial render
renderToolList();
renderTips();
