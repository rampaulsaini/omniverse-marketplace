// scripts/tools.js
window.OmniTools = (function(){
  const tools = [
    { id:'resume', name:'Resume Generator', desc:'Generate professional resumes (basic/free).'},
    { id:'bio', name:'Bio Generator', desc:'Short bios / About me.'},
    { id:'script', name:'Script Writer', desc:'Small JS/Python script templates.'},
    { id:'notes', name:'Notes Generator', desc:'Meeting / study notes.'},
    { id:'idea', name:'Business Idea Generator', desc:'Startup / product ideas.'}
  ];
  function list(){ return tools; }
  function find(id){ return tools.find(t=>t.id===id); }
  return { list, find };
})();
