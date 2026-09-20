/**
 * PEOS v1.0.4-secure - CHAR DEWARI ACTIVE - FINAL
 * Owner: Arif GM Sahib
 */
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
const app = express();
const PORT = 3001;
const SUBPROJECTS_DIR = path.join(__dirname, 'src', 'subprojects');
app.use(helmet());
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:3000'] }));
app.use(express.json());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
function isSafePath(p){ const r = path.resolve(SUBPROJECTS_DIR, p); return r.startsWith(SUBPROJECTS_DIR); }
if (!fs.existsSync(SUBPROJECTS_DIR)) fs.mkdirSync(SUBPROJECTS_DIR, { recursive: true });
app.get('/api/health', (req,res)=>{ res.json({ status:'ok', message:'PEOS AI Engine Online - SECURE v1.0.4', version:'v1.0.4-secure' }); });
app.get('/api/projects', (req,res)=>{ try{ const projects = fs.readdirSync(SUBPROJECTS_DIR).filter(f=>{ const full=path.join(SUBPROJECTS_DIR,f); return fs.statSync(full).isDirectory() && isSafePath(f); }); res.json(projects.map(name=>({name, path:path.join(SUBPROJECTS_DIR,name)}))); }catch(e){ res.status(500).json({error:e.message}); } });
app.post('/api/projects', (req,res)=>{ const {name}=req.body; if(!name||!isSafePath(name)) return res.status(400).json({error:'Invalid name'}); const projectPath=path.join(SUBPROJECTS_DIR,name); if(fs.existsSync(projectPath)) return res.status(400).json({error:'Already exists'}); fs.mkdirSync(projectPath,{recursive:true}); fs.writeFileSync(path.join(projectPath,'index.js'), `// ${name} - PEOS v1.0.4\nconsole.log('${name} started');`); fs.writeFileSync(path.join(projectPath,'README.md'), `# ${name}\nCreated by PEOS v1.0.4-secure`); res.json({success:true,name}); });
app.delete('/api/projects/:name', (req,res)=>{ const {name}=req.params; if(!isSafePath(name)) return res.status(400).json({error:'Invalid path'}); const p=path.join(SUBPROJECTS_DIR,name); if(fs.existsSync(p)) fs.rmSync(p,{recursive:true,force:true}); res.json({success:true}); });
app.post('/api/open', (req,res)=>{ const {name}=req.body; if(!isSafePath(name)) return res.status(400).json({error:'Invalid path'}); const projectPath=path.join(SUBPROJECTS_DIR,name); exec(`code "${projectPath}"`, (err)=>{ if(err) return res.status(500).json({error:err.message}); res.json({success:true}); }); });
app.post('/api/auto-heal', (req,res)=>{ const {name}=req.body; if(!isSafePath(name)) return res.status(400).json({error:'Invalid'}); const projectPath=path.join(SUBPROJECTS_DIR,name); if(!fs.existsSync(path.join(projectPath,'README.md'))){ fs.writeFileSync(path.join(projectPath,'README.md'), `# ${name} - Healed by PEOS v1.0.4`); } res.json({success:true,healed:true}); });
app.post('/api/auto-build', (req,res)=>{ const {name}=req.body; if(!isSafePath(name)) return res.status(400).json({error:'Invalid'}); const projectPath=path.join(SUBPROJECTS_DIR,name); if(!fs.existsSync(path.join(projectPath,'index.js'))){ fs.writeFileSync(path.join(projectPath,'index.js'), `console.log('${name} auto-built');`); } res.json({success:true,built:true}); });
app.listen(PORT, ()=> console.log(`PEOS AI Engine running on http://localhost:${PORT} - SECURE v1.0.4 CHAR DEWARI ON`));
