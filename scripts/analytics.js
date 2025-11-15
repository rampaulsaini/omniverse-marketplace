// scripts/analytics.js
window.OmniAnalytics = (function(){
  function track(toolId){
    const k = 'omnianal_'+toolId;
    const v = parseInt(localStorage.getItem(k)||'0') + 1;
    localStorage.setItem(k, v);
    console.log(`[OmniAnalytics] ${toolId} run count = ${v}`);
  }
  return { track };
})();
