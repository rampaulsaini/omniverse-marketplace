// scripts/ui.js
// UI helpers + modals + Owner Settings

function openSettings(){ document.getElementById('owner-modal').style.display='flex'; loadOwnerSettings(); }
function closeSettings(){ document.getElementById('owner-modal').style.display='none'; }

function loadOwnerSettings(){
  document.getElementById('owner-name').value=localStorage.getItem('omniverse_owner_name')||'';
  document.getElementById('owner-links').value=localStorage.getItem('omniverse_owner_links_raw')||'';
}

function saveOwnerSettings(){
  const name=document.getElementById('owner-name').value.trim();
  const links=document.getElementById('owner-links').value.split(',').map(s=>s.trim()).filter(s=>s);
  localStorage.setItem('omniverse_owner_name',name);
  localStorage.setItem('omniverse_owner_links',JSON.stringify(links));
  localStorage.setItem('omniverse_owner_links_raw',document.getElementById('owner-links').value);
  alert('Owner settings saved.');
  omniverseTools.renderTips();
}

function exportOwnerSettings(){
  const data = {
    name: document.getElementById('owner-name').value,
    links: document.getElementById('owner-links').value,
    tools: omniverseTools.getTools()
  };
  const blob = new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a=document.createElement('a'); a.href=url; a.download='omniverse_settings.json'; a.click(); URL.revokeObjectURL(url);
}

function importOwnerSettings(){
  const input=document.createElement('input'); input.type='file'; input.accept='.json';
  input.onchange=async function(){
    const file=this.files[0];
    const text=await file.text();
    try{
      const data=JSON.parse(text);
      document.getElementById('owner-name').value=data.name||'';
      document.getElementById('owner-links').value=data.links||'';
      localStorage.setItem('omniverse_owner_links',JSON.stringify(data.links.split(',').map(s=>s.trim()).filter(s=>s)));
      localStorage.setItem('omniverse_owner_links_raw',data.links);
      omniverseTools.resetTools();
      if(data.tools) data.tools.forEach(t=>omniverseTools.addTool(t.name));
      alert('Settings imported successfully.');
    }catch(e){ alert('Invalid JSON file'); }
  };
  input.click();
}

// Tool operations
function addTool(){
  const name = prompt('Enter new tool name:');
  if(!name) return;
  omniverseTools.addTool(name);
}
function resetTools(){ if(confirm('Reset all tools?')) omniverseTools.resetTools(); }

function runTool(){ if(omniverseTools.selectedIndex!==null) omniverseTools.runTool(omniverseTools.selectedIndex); else alert('Select a tool first.'); }
function downloadOutput(){ omniverseTools.downloadOutput(); }

// Initial render
omniverseTools.renderToolList();
omniverseTools.renderTips();
    
