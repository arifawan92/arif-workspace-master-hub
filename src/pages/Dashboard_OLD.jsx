import React, { useState } from 'react';
import { AI_Engine } from '../ai-engine/AI_Engine';

export default function Dashboard() {
  const [projects, setProjects] = useState([
    { id: 1, name: 'KP_Police', status: 'Active' },
    { id: 2, name: 'BackupEngine', status: 'Building' }
  ]);
  const [newProject, setNewProject] = useState('');

  const addProject = () => {
    if (!newProject) return;
    const path = `src/subprojects/${newProject}`;
    
    // AI Engine ko call - Guard check kare ga
    AI_Engine.autoCompleteProject(newProject, "Initial setup");
    
    setProjects([...projects, { id: Date.now(), name: newProject, status: 'New' }]);
    setNewProject('');
  };

  const deleteProject = (name) => {
    if (window.confirm(`CONFIRM DELETE? Ye: src/subprojects/${name}`)) {
      if (window.confirm('FINAL CONFIRM? Data wapas nahi aye ga')) {
        setProjects(projects.filter(p => p.name !== name));
        alert('Deleted');
      }
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', background: '#f5f5f5', minHeight: '100vh' }}>
      <h1 style={{ color: '#2E7D32' }}>PEOS MASTER HQ 🚀</h1>
      <p style={{ color: 'gray' }}>Rule: All projects must be inside src/subprojects/</p>
      
      <div style={{ margin: '20px 0', padding: '15px', background: 'white', borderRadius: '8px' }}>
        <input 
          value={newProject}
          onChange={(e) => setNewProject(e.target.value)}
          placeholder="New Project Name e.g. AISF_Bot"
          style={{ padding: '10px', width: '250px', border: '1px solid #ccc' }}
        />
        <button onClick={addProject} style={{ padding: '10px 20px', marginLeft: '10px', background: '#2E7D32', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          + Add Project
        </button>
      </div>

      <h2>Active Sub-Projects</h2>
      {projects.map(p => (
        <div key={p.id} style={{ border: '1px solid #ccc', padding: '15px', margin: '10px 0', borderRadius: '5px', background: 'white' }}>
          <b>{p.name}</b> - <span style={{ color: 'green' }}>{p.status}</span>
          <span style={{ color: 'gray', fontSize: '12px' }}> Path: src/subprojects/{p.name}</span>
          <button onClick={() => deleteProject(p.name)} style={{ float: 'right', background: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>Delete</button>
        </div>
      ))}
    </div>
  );
}