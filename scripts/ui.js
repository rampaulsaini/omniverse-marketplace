// scripts/ui.js
window.OmniUI = (function(){
  const toolsGrid = document.getElementById('toolsGrid');
  const modal = document.getElementById('modal');
  const modalClose = document.getElementById('modalClose');
  const btnDonate = document.getElementById('btnDonate');
  const btnOwner = document.getElementById('btnOwner');
  const ownerModal = document.getElementById('ownerModal');
  const ownerClose = document.getElementById('ownerClose');

  function getPaymentConfig(){
    try { return JSON.parse(localStorage.getItem('omni_pay_config')||'{}'); } catch { return {}; }
  }
  function savePaymentConfig(cfg){
    localStorage.setItem('omni_pay_config', JSON.stringify(cfg));
  }

  function getPremiumKey(){ return localStorage.getItem('omni_premium_key') || null; }
  function setPremiumKey(k){ if(!k) localStorage.removeItem('omni_premium_key'); else localStorage.setItem('omni_premium_key', k); }

  function createToolCard(t){
    const el = document.createElement('div'); el.className='tool card';
    el.innerHTML = `
      <h4>${t.name} <span class="price">₹${t.price}</span></h4>
      <div class="desc">${t.desc}</div>
      <label>Input (JSON)</label>
      <textarea id="input_${t.id}">${JSON.stringify(defaultInputFor(t.id),null,2)}</textarea>
      <div class="row">
        <button class="btn" id="run_${t.id}">Run</button>
        <button class="btn subtle" id="copy_${t.id}">Copy Output</button>
        <button class="btn subtle" id="download_${t.id}">Download</button>
        <button class="btn subtle" id="buy_${t.id}">Buy / Tip</button>
        <div style="margin-left:auto" id="status_${t.id}" class="small muted"></div>
      </div>
      <label>Output</label>
      <textarea id="output_${t.id}" readonly placeholder="Run tool to generate output..."></textarea>
    `;
    setTimeout(()=>{
      el.querySelector(`#run_${t.id}`).addEventListener('click', ()=>runTool(t.id));
      el.querySelector(`#copy_${t.id}`).addEventListener('click', ()=>copyOutput(t.id));
      el.querySelector(`#download_${t.id}`).addEventListener('click', ()=>downloadOutput(t.id));
      el.querySelector(`#buy_${t.id}`).addEventListener('click', ()=>openDonateModal());
    },0);
    return el;
  }

  function defaultInputFor(id){
    return { name:"John Doe", title:"Software Engineer", skills:"JS, Python" };
  }

  async function runTool(id){
    const tool = OmniTools.find(id);
    const inputText = document.getElementById('input_'+id).value;
    let input = {};
    try { input = JSON.parse(inputText); } catch(e){ alert('Invalid JSON input'); return; }
    const outEl = document.getElementById('output_'+id);
    const statusEl = document.getElementById('status_'+id);
    outEl.value = 'Generating...';
    try {
      const result = await tool.run(input);
      outEl.value = typeof result === 'string' ? result : JSON.stringify(result,null,2);
      statusEl.textContent = 'Ready';
      OmniAnalytics.track(id);
      refreshAnalyticsCard();
    } catch (e){
      outEl.value = 'Error: '+e.message;
      statusEl.textContent = 'Error';
    }
  }

  function copyOutput(id){
    const out = document.getElementById('output_'+id).value;
    if(!out) return alert('No output to copy');
    navigator.clipboard.writeText(out).then(()=>alert('Copied to clipboard'));
  }

  function downloadOutput(id){
    const out = document.getElementById('output_'+id).value;
    if(!out) return alert('No output to download');
    const tool = OmniTools.find(id);
    const key = getPremiumKey();
    if(tool.price > 0 && !key){
      const ok = confirm('This is a paid output. Click OK to see payment options / donate. After paying, owner must provide you an unlock key.');
      if(ok) openDonateModal();
      return;
    }
    const blob = new Blob([out], {type:'text/plain'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = id + '-omniverse-output.txt';
    a.click();
  }

  function openDonateModal(){
    const cfg = getPaymentConfig();
    document.getElementById('inputPayPal').value = cfg.paypal||'';
    document.getElementById('inputKofi').value = cfg.kofi||'';
    document.getElementById('inputUPI').value = cfg.upi||'';
    modal.classList.remove('hidden');
  }

  function refreshAnalyticsCard(){
    const listWrap = document.getElementById('analyticsList');
    const all = OmniTools.getAll();
    const rows = all.map(t=>{
      const k = 'omnianal_'+t.id;
      const v = parseInt(localStorage.getItem(k)||'0');
      return `<div>${t.name}: <strong>${v}</strong> runs</div>`;
    }).join('');
    listWrap.innerHTML = rows;
  }

  function openOwnerModal(){
    const key = getPremiumKey();
    document.getElementById('premiumKeyInput').value = key || '';
    ownerModal.classList.remove('hidden');
  }

  function init(){
    const arr = OmniTools.getAll();
    arr.forEach(t=>{
      const card = createToolCard(t);
      toolsGrid.appendChild(card);
    });
    modalClose.addEventListener('click', ()=>modal.classList.add('hidden'));
    btnDonate.addEventListener('click', openDonateModal);
    btnOwner.addEventListener('click', openOwnerModal);
    ownerClose.addEventListener('click', ()=>ownerModal.classList.add('hidden'));

    document.getElementById('savePayment').addEventListener('click', ()=>{
      const cfg = { paypal: document.getElementById('inputPayPal').value.trim(),
                    kofi: document.getElementById('inputKofi').value.trim(),
                    upi: document.getElementById('inputUPI').value.trim() };
      savePaymentConfig(cfg);
      alert('Payment links saved locally (owner only). For production, use server-side storage.');
      modal.classList.add('hidden');
    });

    document.getElementById('saveKey').addEventListener('click', ()=>{
      const k = document.getElementById('premiumKeyInput').value.trim();
      if(!k) return alert('Type a key to save');
      setPremiumKey(k);
      alert('Premium key saved locally. Share this key with paid users to unlock downloads.');
      ownerModal.classList.add('hidden');
    });
    document.getElementById('removeKey').addEventListener('click', ()=>{
      setPremiumKey(null);
      alert('Premium key removed');
      ownerModal.classList.add('hidden');
    });

    refreshAnalyticsCard();
  }

  return { init, runTool, downloadOutput, copyOutput, openDonateModal, getPaymentConfig, getPremiumKey };
})();
