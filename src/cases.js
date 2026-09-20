import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'

export default function Cases() {
  const [projects, setProjects] = useState([])
  const [newName, setNewName] = useState('')

  useEffect(() => {
    fetchProjects()
  }, [])

  async function fetchProjects() {
    const { data, error } = await supabase
   .from('peos_projects')
   .select('*')
   .order('created_at', { ascending: false })
    
    if (error) console.log('Error:', error)
    else setProjects(data)
  }

  async function addProject() {
    if (!newName) return
    const { data, error } = await supabase
   .from('peos_projects')
   .insert([{ name: newName }])
   .select()
    
    if (error) console.log('Error:', error)
    else {
      setProjects([data[0],...projects])
      setNewName('')
    }
  }

  // AUTO BUILDER FUNCTION
  async function autoBuild(projectId, projectName) {
    const defaultTasks = [
      '01-Planning',
      '02-Design', 
      '03-Development',
      '04-Testing',
      '05-Deployment'
    ]
    
    const tasksToInsert = defaultTasks.map(name => ({
      project_id: projectId,
      name: `${projectName} - ${name}`
    }))

    const { error } = await supabase
    .from('peos_tasks')
    .insert(tasksToInsert)
    
    if (error) alert('Error: ' + error.message)
    else alert(`Auto Builder: ${projectName} ke liye 5 tasks ban gaye!`)
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Projects</h2>
      <div style={{ marginBottom: 20 }}>
        <input 
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Project Name"
          style={{ marginRight: 10 }}
        />
        <button onClick={addProject}>+ New Project</button>
      </div>
      
      {projects.map(p => (
        <div key={p.id} style={{ border: '1px solid #ddd', padding: 15, marginBottom: 10, borderRadius: 5 }}>
          <b>{p.name}</b>
          <button 
            onClick={() => autoBuild(p.id, p.name)}
            style={{ marginLeft: 15, padding: '5px 10px' }}
          >
            Auto Build
          </button>
        </div>
      ))}
    </div>
  )
}