// scripts/marketplace.js
// Marketplace + local stats + premium key handling

window.OmniMarketplace = (function(){
  const S_KEY = 'omniverse_settings';
  const USAGE_KEY = 'omniverse_usage';
  const DL_KEY = 'omniverse_downloads';

  function readSettings(){
    try { return JSON.parse(localStorage.getItem(S_KEY)||'{}'); } catch { return {}; }
  }
  function saveSettings(s){
    localStorage.setItem(S_KEY, JSON.stringify(s||{}));
  }

  function incUsage(toolId){
    const u = JSON.parse(localStorage.getItem(USAGE_KEY)||'{}');
    u[toolId] = (u[toolId]||0)+1;
    localStorage.setItem(USAGE_KEY, JSON.stringify(u));
  }
  function incDownload(){
    const n = parseInt(localStorage.getItem(DL_KEY)||'0')+1;
    localStorage.setItem(DL_KEY, String(n));
  }
  function getUsageCount(toolId){
    const u = JSON.parse(localStorage.getItem(USAGE_KEY)||'{}');
    return u[toolId]||0;
  }
  function getDownloadCount(){
    return parseInt(localStorage.getItem(DL_KEY)||'0');
  }

  // Premium key validation (pure local)
  function setPremiumKey(key){ const s = readSettings(); s.premiumKey = String(key||''); saveSettings(s); }
  function getPremiumKey(){ return readSettings().premiumKey || null; }
  function checkUnlockKey(entered){ const key = getPremiumKey(); return key && key.length && entered===key; }

  // Payment link
  function setPaymentLink(url){ const s = readSettings(); s.paymentLink = url; saveSettings(s); }
  function getPaymentLink(){ return readSettings().paymentLink || ''; }

  return {
    readSettings, saveSettings,
    incUsage, incDownload, getUsageCount, getDownloadCount,
    setPremiumKey, getPremiumKey, checkUnlockKey,
    setPaymentLink, getPaymentLink
  };
})();
