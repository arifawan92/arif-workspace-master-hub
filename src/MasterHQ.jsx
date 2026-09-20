import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export default function MasterHQ() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState('');
  const [status, setStatus] = useState('Checking...');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkHealth();
    loadProjects();
  }, []);

  const checkHealth = async () => {
    try {
      const res = await axios.get(`${API_URL}/health`);
      setStatus(res.data.message);
    } catch {
      setStatus('❌ AI Engine Offline');
    }
  };

  const loadProjects = async () => {
    try {
      const res = await axios.get(`${API_URL}/projects`);
      setProjects(res.data.projects);
    } catch (e) {
      alert('Projects load nahi hue: ' + e.message);
    }
  };

  const createProject = async () => {
    if (!name) return alert('Project ka naam likhen');
    setLoading(true);
    try {
      await axios.post(`${API_URL}/create-project`, { name });
      setName('');
      loadProjects();
      alert('✅ Project ban gaya');
    } catch (e) {
      alert('Error: ' + e.response?.data?.error);
    }
    setLoading(false);
  };

  const openFolder = async (path) => {
    try {
      await axios.post(`${API_URL}/open-folder`, { path });
    } catch (e) {
      alert('Error: ' + e.response?.data?.error);
    }
  };

  const deleteProject = async (path) => {
    if (!confirm('Pakka delete karna hai?')) return;
    try {
      await axios.post(`${API_URL}/delete-project`, { path });
      loadProjects();
      alert('🗑️ Delete ho gaya');
    } catch (e) {
      alert('Error: ' + e.response?.data?.error);
    }
  };

  const autoHeal = async (path) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/auto-heal`, { path });
      alert(res.data.message);
    } catch (e) {
      alert('Error: ' + e.response?.data?.error);
    }
    setLoading(false);
  };

  const autoBuild = async (path) => {
    const code = `console.log('PEOS AI ne auto build kiya ${new Date().toLocaleString()}');`;
    if (!confirm('index.js overwrite kar dun?')) return;
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/auto-build`, { path, code });
      alert(res.data.message);
    } catch (e) {
      alert('Error: ' + e.response?.data?.error);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', maxWidth: '800px', margin: 'auto' }}>
      <h1 style={{ color: 'green' }}>PEOS v3.2 - AI AUTO + SELF CHECK + SECURE</h1>
      <div style={{ background: '#e8ffe8', padding: '10px', borderRadius: '5px', marginBottom: '20px' }}>
        Status: {status.includes('Online') ? '✅' : '❌'} {status}
      </div>
      <div style={{ marginBottom: '20px' }}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Project Name" style={{ padding: '8px', marginRight: '10px' }}/>
        <button onClick={createProject} disabled={loading} style={{ padding: '8px 15px', background: 'green', color: 'white', border: 'none' }}>+ Add Project</button>
      </div>
      <h2>Projects ({projects.length})</h2>
      {projects.map((p) => (
        <div key={p.path} style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '10px', borderRadius: '5px' }}>
          <p><b>📁 Path:</b> {p.path}</p>
          <p><small>Created: {p.created}</small></p>
          <button onClick={() => openFolder(p.path)} style={{ marginRight: '10px', padding: '6px 12px', background: 'blue', color: 'white', border: 'none' }}>Open Folder</button>
          <button onClick={() => autoHeal(p.path)} disabled={loading} style={{ marginRight: '10px', padding: '6px 12px', background: 'orange', color: 'white', border: 'none' }}>🛠️ Auto Heal</button>
          <button onClick={() => autoBuild(p.path)} disabled={loading} style={{ marginRight: '10px', padding: '6px 12px', background: 'purple', color: 'white', border: 'none' }}>⚡ Auto Build</button>
          <button onClick={() => deleteProject(p.path)} style={{ padding: '6px 12px', background: 'red', color: 'white', border: 'none' }}>Delete</button>
        </div>
      ))}
      {loading && <p>⏳ Kaam ho raha hai...</p>}
    </div>
  );
}