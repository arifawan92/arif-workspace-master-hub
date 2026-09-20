import React, { useState, useEffect } from 'react';
export default function MasterHQ() {
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('peos_projects');
    return saved? JSON.parse(saved) : [];
  });
  const [newProject, setNewProject] = useState('');
  const [loading, setLoading] = useState(false);
  const [backendStatus, setBackendStatus] = useState('Checking...');

  // TRIGGER 1: Page load pe backend check
  useEffect(() => {
    fetch('http://localhost:3001/api/health')
      .then(res => res.json())
      .then(() => setBackendStatus('✅ AI Engine Online'))
      .catch(() => setBackendStatus('❌ Backend Offline - `node server.js` chalao'));
    
    localStorage.setItem('peos_projects', JSON.stringify(projects));
  }, [projects]);

  const openFolder = async (path) => {
    const res = await fetch('http://localhost:3001/api/open-folder', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path })
    });
    const data = await res.json();
    if(!data.success) alert(`⚠️ ${data.message}`); // TRIGGER 2
  };

  const addProject = async () => {
    if (!newProject) return alert('⚠️ Name likhna lazmi hai');
    if(backendStatus.includes('Offline')) return alert('⚠️ Pehle backend chalao');
    setLoading(true);
    
    try {
      const res = await fetch('http://localhost:3001/api/create-project', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newProject })
      });
      const data = await res.json();
      
      if(data.success && data.verified){
        setProjects([...projects, { name: newProject, path: data.path, created: new Date().toLocaleString() }]);
        alert(`✅ AI ne folder bana diya aur verify bhi kar liya: ${data.path}`);
      } else {
        alert(`❌ Step Fail: ${data.message}`); // TRIGGER 3
      }
    } catch(err) {
      alert('❌ Backend se connection nahi bana');
    }
    setNewProject('');
    setLoading(false);
  };

  const deleteProject = (name) => {
    if (window.confirm('Delete: ' + name + '?')) {
      setProjects(projects.filter(p => p.name!== name));
    }
  };

  return (
    <div style={{ padding: '30px', background: '#f5f5f5', minHeight: '100vh' }}>
      <h1 style={{ color: '#2E7D32' }}>PEOS v3.1 - AI AUTO + SELF CHECK</h1>
      <div style={{ background: backendStatus.includes('✅')? '#E8F5E9' : '#FFEBEE', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
        <b>Status:</b> {backendStatus}
      </div>
      <div style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
        <input value={newProject} onChange={(e) => setNewProject(e.target.value)} placeholder='Project Name' style={{ padding: '10px', width: '300px' }} />
        <button onClick={addProject} disabled={loading} style={{ padding: '10px 20px', background: '#2E7D32', color: 'white', marginLeft: '10px', border: 'none' }}>
          {loading? 'Creating...' : '+ Add Project'}
        </button>
      </div>

      <h2>Projects ({projects.length})</h2>
      {projects.map((x, i) => (
        <div key={i} style={{ background: 'white', padding: '15px', margin: '10px 0', borderLeft: '4px solid #2E7D32' }}>
          <div><b>📁 Path:</b> {x.path}</div>
          <div style={{ color: 'gray', fontSize: '12px' }}>Created: {x.created}</div>
          <div style={{ marginTop: '10px' }}>
            <button onClick={() => openFolder(x.path)} style={{ background: 'blue', color: 'white', border: 'none', padding: '5px 10px', marginRight: '10px' }}>Open Folder</button>
            <button onClick={() => deleteProject(x.name)} style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px' }}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
