import { useState } from 'react'

const INITIAL_PROJECTS = [
  { id: 1, name: "Ami Jan Health Tracker", status: "Active" },
  { id: 2, name: "Ghar ke Akhrajat", status: "Active" },
  { id: 3, name: "Dawakhana Records", status: "Active" },
  { id: 4, name: "Quran Hifz Progress", status: "Active" },
  { id: 5, name: "Bachon ki Taleem", status: "Active" },
  { id: 6, name: "Zameen Hisab", status: "Active" },
  { id: 7, name: "PEOS Secure Backup", status: "Active" },
]

export default function App() {
  const [projects, setProjects] = useState(INITIAL_PROJECTS)
  const [name, setName] = useState("")

  const addProject = () => {
    if(!name.trim()) return
    setProjects([...projects, { id: Date.now(), name, status: "Active" }])
    setName("")
  }

  return (
    <div style={{ padding: 40, fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#0a7a00', fontSize: 32, fontWeight: 'bold' }}>PEOS v3.2 - AI AUTO + SELF CHECK + SECURE</h1>
      
      <div style={{ background: '#d4edda', padding: 12, borderRadius: 6, marginTop: 20 }}>
        Status: ✅✅ AI Engine Online - Node 20 Stable
      </div>

      <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
        <input 
          placeholder="Project Name" 
          value={name} 
          onChange={e=>setName(e.target.value)}
          style={{ padding: '8px 12px', border: '1px solid #999' }}
        />
        <button onClick={addProject} style={{ background: '#0a7a00', color: 'white', padding: '8px 16px', border: 'none', cursor: 'pointer' }}>+ Add Project</button>
      </div>

      <h2 style={{ marginTop: 30, fontWeight: 'bold', fontSize: 24 }}>Projects ({projects.length})</h2>
      <div style={{ marginTop: 15 }}>
        {projects.map(p=>(
          <div key={p.id} style={{ border: '1px solid #ddd', padding: 12, marginBottom: 8, borderRadius: 4 }}>
            {p.id}. {p.name} - <span style={{color: 'green'}}>{p.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
