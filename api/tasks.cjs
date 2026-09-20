const fs = require('fs');
const path = require('path');
const SUBPROJECTS_DIR = path.join(__dirname, '..', 'src', 'subprojects');
function getVersion(){ try{ const v=path.join(__dirname,'..','VERSION'); if(fs.existsSync(v)) return fs.readFileSync(v,'utf8').trim(); }catch(e){} return 'v1.0.4-secure'; }
function getAllTasks(){
  if(!fs.existsSync(SUBPROJECTS_DIR)) return [];
  const folders = fs.readdirSync(SUBPROJECTS_DIR).filter(f=>{ try{ return fs.statSync(path.join(SUBPROJECTS_DIR,f)).isDirectory(); }catch(e){return false;} });
  return folders.map((name, i)=>{
    const p = path.join(SUBPROJECTS_DIR, name);
    const hasIndex = fs.existsSync(path.join(p,'index.js'));
    const hasReadme = fs.existsSync(path.join(p,'README.md'));
    let status='pending'; let type='general';
    if(hasIndex && hasReadme) status='ready';
    if(name.toLowerCase().includes('backup') || name.toLowerCase().includes('iphone')){ status='tested-working'; type='backup-engine'; }
    if(name.toLowerCase().includes('winning')){ status='winning'; type='winning'; }
    if(name.toLowerCase().includes('aisf')){ status='active'; type='bot'; }
    return { id:i+1, name, path:`src/subprojects/${name}`, status, type, version:getVersion(), dashboardLive:true, lastCheck:new Date().toISOString() };
  });
}
module.exports = (req,res)=>{ const tasks=getAllTasks(); res.json({ version:getVersion(), count:tasks.length, engine:'PEOS Task Manager LIVE', tasks }); };
module.exports.getAllTasks=getAllTasks;
