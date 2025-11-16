// scripts/marketplace.js

(function(){
  // show analytics summary in the "Usage Summary" area (element id analyticsList)
  function refreshAnalytics(){
    const el = document.getElementById('analyticsList');
    if(!el) return;
    const tools = OmniTools.all();
    const rows = tools.map(t=>{
      const k = 'omnianal_'+t.id;
      const v = parseInt(localStorage.getItem(k) || '0');
      return `<div>${t.title}: <strong>${v}</strong> runs</div>`;
    }).join('');
    el.innerHTML = rows || '<div class="small muted">No activity yet.</div>';
  }

  // call periodically
  window.addEventListener('load', ()=>{ refreshAnalytics(); setInterval(refreshAnalytics, 5000); });

  // expose for console if owner wants to reset
  window.OmniAdmin = {
    resetAnalytics: function(){ OmniTools.all().forEach(t=>localStorage.removeItem('omnianal_'+t.id)); refreshAnalytics(); alert('analytics reset'); },
    exportAnalytics: function(){ 
      const obj = {}; OmniTools.all().forEach(t=> obj[t.id] = parseInt(localStorage.getItem('omnianal_'+t.id)||'0'));
      const blob = new Blob([JSON.stringify(obj,null,2)],{type:'application/json'}); const a=document.createElement('a');
      a.href = URL.createObjectURL(blob); a.download='omnianal.json'; a.click();
    }
  };
})();
