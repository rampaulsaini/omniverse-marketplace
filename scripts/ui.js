// scripts/ui.js
// Handles DOM, events, settings modal and generation flow.

window.OmniUI = (function(){

  function $(id){ return document.getElementById(id); }

  function populateTools(){
    const list = OmniTools.getList();
    const sel = $('toolSelect');
    sel.innerHTML = '';
    list.forEach(t => {
      const opt = document.createElement('option');
      opt.value = t.id;
      opt.textContent = t.name + (t.premium ? ' 🔒' : '');
      sel.appendChild(opt);
    });
    // build initial panel
  }

  function showCounts(toolId){
    $('usageCount').textContent = 'Uses: ' + OmniMarketplace.getUsageCount(toolId);
    $('downloadCount').textContent = 'Downloads: ' + OmniMarketplace.getDownloadCount();
  }

  function openSettings(){
    const modal = $('settingsModal');
    modal.setAttribute('aria-hidden','false');
    // populate fields
    $('premiumKeyInput').value = OmniMarketplace.getPremiumKey() || '';
    $('modalPaymentLink').value = OmniMarketplace.getPaymentLink() || '';
  }
  function closeSettings(){
    const modal = $('settingsModal');
    modal.setAttribute('aria-hidden','true');
  }

  async function generateCurrent(){
    const toolId = $('toolSelect').value;
    const tool = OmniTools.getTool(toolId);
    if(!tool) return alert('Tool not found');
    let input = {};
    try { input = JSON.parse($('userInput').value || '{}'); } catch(e) { alert('Invalid JSON in input'); return; }
    const premiumRequested = $('usePremiumToggle').checked;
    // premium check
    if (premiumRequested && tool.premium) {
      const unlocked = sessionStorage.getItem('omniverse_premium_unlocked') === '1';
      if(!unlocked){ alert('Premium output locked — unlock via Owner Settings or enter correct key.'); return; }
    }

    $('aiOutput').value = 'Generating...';
    const out = await OmniAI.generate(tool, input, {premium: premiumRequested});
    $('aiOutput').value = out;
    $('downloadBtn').disabled = false;
    OmniMarketplace.incUsage(toolId);
    showCounts(toolId);
  }

  function downloadOutput(){
    const out = $('aiOutput').value || '';
    if(!out) return;
    const blob = new Blob([out], {type:'text/plain;charset=utf-8'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    const tool = $('toolSelect').value || 'output';
    a.download = tool + '-omniverse.txt';
    document.body.appendChild(a); a.click(); a.remove();
    OmniMarketplace.incDownload();
    showCounts($('toolSelect').value);
  }

  function clearAll(){
    $('aiOutput').value = '';
    $('userInput').value = '{}';
    $('downloadBtn').disabled = true;
  }

  function unlockPremiumFlow(){
    const entered = prompt('Enter unlock key to enable premium outputs:');
    if(!entered) return;
    if(OmniMarketplace.checkUnlockKey(entered)){
      sessionStorage.setItem('omniverse_premium_unlocked','1');
      alert('Premium unlocked for this browser session.');
    } else {
      alert('Incorrect key.');
    }
  }

  function savePremiumKey(){
    const k = $('premiumKeyInput').value.trim();
    OmniMarketplace.setPremiumKey(k);
    alert('Premium key saved locally.');
  }

  function savePaymentLink(){
    const u = $('modalPaymentLink').value.trim();
    OmniMarketplace.setPaymentLink(u);
    alert('Payment link saved locally.');
  }

  function openDonate(){
    const url = OmniMarketplace.getPaymentLink();
    if(!url) return alert('No payment link saved in settings.');
    window.open(url, '_blank');
  }

  function openDashboard(){
    // quick local dashboard (simple alert)
    const usages = JSON.parse(localStorage.getItem('omniverse_usage')||'{}');
    const downloads = localStorage.getItem('omniverse_downloads')||'0';
    const lines = ['Local Omniverse Stats:','Downloads: '+downloads,'Tool uses:'];
    for(const k of Object.keys(usages)) lines.push(`${k}: ${usages[k]}`);
    alert(lines.join('\n'));
  }

  function bind(){
    $('openSettingsBtn').addEventListener('click', openSettings);
    $('closeSettings').addEventListener('click', closeSettings);
    $('savePremiumKey').addEventListener('click', savePremiumKey);
    $('savePaymentLink').addEventListener('click', savePaymentLink);
    $('generateBtn').addEventListener('click', generateCurrent);
    $('downloadBtn').addEventListener('click', downloadOutput);
    $('clearBtn').addEventListener('click', clearAll);
    $('unlockBtn').addEventListener('click', unlockPremiumFlow);
    $('openDonate').addEventListener('click', openDonate);
    $('openDashboard').addEventListener('click', openDashboard);
    $('toolSelect').addEventListener('change', ()=> showCounts($('toolSelect').value));
  }

  function init(){
    populateTools();
    bind();
    // set defaults
    if(!$('userInput').value) $('userInput').value = '{"name":"John Doe"}';
    showCounts($('toolSelect').value);
  }

  return { init };
})();
                 
