/**
 * Simple fetch-based health check for multiple URLs
 */
async function checkSites(urls){
  const results=[];
  for(const u of urls){
    try{
      const r=await fetch(u,{method:'HEAD',mode:'no-cors'});
      results.push({url:u,status:r.status||'no-cors'});
    }catch(e){
      results.push({url:u,status:'error',error:e.message||e});
    }
  }
  return results;
}
// Usage: checkSites(["https://example.com"]).then(console.log);
