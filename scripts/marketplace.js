// scripts/marketplace.js
window.OmniMarketStorage = (function(){
  const KEY_PREFIX = 'omniverse_market_v1_';
  function set(k,v){ localStorage.setItem(KEY_PREFIX+k, JSON.stringify(v)); }
  function get(k, def=null){ try{ const v=localStorage.getItem(KEY_PREFIX+k); return v?JSON.parse(v):def; }catch(e){return def} }
  return { set, get };
})();

window.OmniMarket = (function(){
  const DOM = {};
  let usageCount = 0;

  function initDOM(){
    DOM.ownerToggle = document.getElementById('ownerToggle');
    DOM.ownerPanel = document.getElementById('ownerPanel');
    DOM.saveKeyBtn = document.getElementById('saveKeyBtn');
    DOM.ownerKey = document.getElementById('ownerKey');
    DOM.savePayBtn = document.getElementById('savePayBtn');
    DOM.donationLink = document.getElementById('donationLink');
    DOM.donationDisplay = document.getElementById('donationDisplay');

    DOM.unlockKey = document.getElementById('unlockKey');
    DOM.unlockBtn = document.getElementById('unlockBtn');
    DOM.unlockStatus = document.getElementById('unlockStatus');

    DOM.toolSelect = document.getElementById('toolSelect');
    DOM.toolInput = document.getElementById('toolInput');
    DOM.generateBtn = document.getElementById('generateBtn');
    DOM.clearInput = document.getElementById('clearInput');

    DOM.toolOutput = document.getElementById('toolOutput');
    DOM.downloadBtn = document.getElementById('downloadBtn');
    DOM.copyBtn = document.getElementById('copyBtn');
    DOM.clearOutput = document.getElementById('clearOutput');
    DOM.usageInfo = document.getElementById('usageInfo');
  }

  function bindEvents(){
    DOM.ownerToggle.addEventListener('click', ()=>{ DOM.ownerPanel.classList.toggle('show'); });
    DOM.saveKeyBtn.addEventListener('click', saveOwnerKey);
    DOM.savePayBtn.addEventListener('click', saveDonationLink);

    DOM.unlockBtn.addEventListener('click', attemptUnlock);
    DOM.generateBtn.addEventListener('click', onGenerate);
    DOM.clearInput.addEventListener('click', ()=>DOM.toolInput.value='');

    DOM.downloadBtn.addEventListener('click', onDownload);
    DOM.copyBtn.addEventListener('click', onCopy);
    DOM.clearOutput.addEventListener('click', ()=>{ DOM.toolOutput.value=''; });

    DOM.toolSelect.addEventListener('change', onToolChange);
  }

  function loadTools(){
    const tools = OmniTools.list();
    DOM.toolSelect.innerHTML = tools.map(t=>`<option value="${t.id}">${t.name}</option>`).join('');
    // default input
    DOM.toolInput.value = JSON.stringify({name:"Your Name", skills:"JavaScript, AI"}, null, 2);
  }

  function saveOwnerKey(){
    const key = DOM.ownerKey.value.trim();
    if(!key){ alert('Enter a key'); return; }
    OmniMarketStorage.set('ownerKey', key);
    alert('Owner key saved locally.');
  }
  function saveDonationLink(){
    const l = DOM.donationLink.value.trim();
    OmniMarketStorage.set('donationLink', l);
    updateDonationDisplay();
    alert('Donation link saved locally.');
  }
  function updateDonationDisplay(){
    const l = OmniMarketStorage.get('donationLink', '');
    DOM.donationDisplay.textContent = l || 'Not set';
  }

  function attemptUnlock(){
    const entered = DOM.unlockKey.value.trim();
    const stored = OmniMarketStorage.get('ownerKey', '');
    if(!stored){ alert('No owner key set. Owner must set key in Owner Settings first.'); return; }
    if(entered === stored){ OmniMarketStorage.set('premiumUnlocked', true); DOM.unlockStatus.textContent = 'Premium unlocked ✔️'; }
    else{ alert('Incorrect key. If you want to accept payments instead, press Unlock / Pay to open donation link.'); 
      const link = OmniMarketStorage.get('donationLink','');
      if(link) window.open(link,'_blank');
    }
  }

  function isPremium(){ return OmniMarketStorage.get('premiumUnlocked', false) === true; }

  async function onGenerate(){
    const toolId = DOM.toolSelect.value;
    let input = {};
    try{ input = JSON.parse(DOM.toolInput.value); }catch(e){ alert('Invalid JSON in input. Fix it and try again.'); return; }
    DOM.toolOutput.value = 'Generating...';
    const premium = isPremium();
    try{
      const out = await AICore.generate(toolId, input, { premium, useLLM:false });
      DOM.toolOutput.value = out;
      usageCount++;
      DOM.usageInfo.textContent = `Uses: ${usageCount}`;
      // track basic analytics
      const k = 'usage_'+toolId;
      const prev = parseInt(localStorage.getItem(k) || '0'); localStorage.setItem(k, prev+1);
    }catch(e){
      DOM.toolOutput.value = 'Error: '+e.message;
    }
  }

  function onDownload(){
    const text = DOM.toolOutput.value || '';
    const blob = new Blob([text], {type:'text/plain;charset=utf-8'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = (DOM.toolSelect.value || 'omniverse') + '-output.txt';
    a.click();
  }
  function onCopy(){
    const t = DOM.toolOutput.value || '';
    navigator.clipboard?.writeText(t).then(()=> alert('Copied to clipboard'), ()=> alert('Copy failed'));
  }

  function onToolChange(){
    // small helper: update placeholder input for selected tool
    const id = DOM.toolSelect.value;
    switch(id){
      case 'resume': DOM.toolInput.value = JSON.stringify({name:"Your Name","title":"Your Title","skills":"JS, Python","summary":"Short summary"}, null, 2); break;
      case 'bio': DOM.toolInput.value = JSON.stringify({name:"Your Name","field":"AI & Software","hook":"I build..."} , null, 2); break;
      case 'script': DOM.toolInput.value = JSON.stringify({task:"Small utility script"} , null, 2); break;
      case 'notes': DOM.toolInput.value = JSON.stringify({topic:"Meeting notes","point1":"Agenda","point2":"Decisions"} , null, 2); break;
      case 'idea': DOM.toolInput.value = JSON.stringify({field:"Education tech","concept":"AI guided tutors"} , null, 2); break;
      default: DOM.toolInput.value = '{}';
    }
  }

  function loadInitialState(){
    const unlocked = OmniMarketStorage.get('premiumUnlocked', false);
    DOM.unlockStatus.textContent = unlocked ? 'Premium unlocked ✔️' : 'Premium locked';
    updateDonationDisplay();
  }

  function init(){
    initDOM();
    bindEvents();
    loadTools();
    loadInitialState();
    // small UX: select first tool
    onToolChange();
  }

  return { init };
})();
    
