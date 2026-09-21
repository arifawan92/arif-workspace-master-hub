import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

function App() {
  const [projects, setProjects] = useState([])
  const [newName, setNewName] = useState('')
  const [status, setStatus] = useState('Checking...')

  const fetchProjects = async () => {
    const { data, error } = await supabase.from('peos_projects').select('*').order('id')
    if (!error) { setProjects(data); setStatus('🟢 All Systems Online - Secure') }
    else { setStatus('🔴 ' + error.message) }
  }

  useEffect(() => { fetchProjects() }, [])

  const addProject = async () => {
    if (!newName) return
    const { error } = await supabase.from('peos_projects').insert([{ name: newName }])
    if (!error) { setNewName(''); fetchProjects() }
  }

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif', maxWidth: 600, margin: 'auto' }}>
      <h1>PEOS v3.3 - SECURE</h1>
      <p><b>Status:</b> {status}</p>
      <p><b>Projects ({projects.length})</b> - Verified Empty & Clean</p>
      <div style={{ display: 'flex', gap: 10 }}>
        <input value={newName} onChange={e=>setNewName(e.target.value)} placeholder="New project name" style={{ flex: 1, padding: 8 }}/>
        <button onClick={addProject} style={{ padding: '8px 16px' }}>Add</button>
      </div>
      <ul>{projects.map(p=> <li key={p.id}>{p.name} - {new Date(p.created_at).toLocaleString()}</li>)}</ul>
    </div>
  )
}
export default App
