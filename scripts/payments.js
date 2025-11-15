// scripts/payments.js
(function(){
  function showPaymentOptions(){
    const cfg = JSON.parse(localStorage.getItem('omni_pay_config')||'{}');
    let html = '<div class="card"><h4>Donate / Pay</h4>';
    if(cfg.paypal) html += `<div style="margin-top:8px"><a class="btn" href="${cfg.paypal}" target="_blank">Pay via PayPal</a></div>`;
    if(cfg.kofi) html += `<div style="margin-top:8px"><a class="btn" href="${cfg.kofi}" target="_blank">Support on Ko-fi</a></div>`;
    if(cfg.upi) html += `<div style="margin-top:8px"><button class="btn subtle" id="copyUpi">Copy UPI</button> <span class="muted small">Ask owner to send unlock key after payment.</span></div>`;
    if(!cfg.paypal && !cfg.kofi && !cfg.upi) html += `<div class="muted">No payment links configured by owner yet.</div>`;
    html += '</div>';
    const modalContent = document.querySelector('#modal .modal-content div');
    if(modalContent) modalContent.innerHTML = html;
    const copyBtn = document.getElementById('copyUpi');
    if(copyBtn){
      copyBtn.addEventListener('click', ()=>{
        navigator.clipboard.writeText(cfg.upi||'').then(()=>alert('UPI copied to clipboard'));
      });
    }
  }
  document.getElementById('btnDonate').addEventListener('click', showPaymentOptions);
  window.addEventListener('load', showPaymentOptions);
})();
