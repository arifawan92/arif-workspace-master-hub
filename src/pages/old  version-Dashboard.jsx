import React, { useState } from 'react';

const Dashboard = () => {
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Auto Backup', status: 'Completed' },
    { id: 2, name: 'Integrity Check', status: 'Running' },
  ]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-green-600">PEOS Dashboard ROCKET</h1>
      
     {/* YE NELA PEELA VERSION BOX HAI */}
<div style={{
  background:'linear-gradient(135deg, #2563eb 0%, #fbbf24 100%)', 
  color:'white', 
  padding:'16px', 
  borderRadius:'12px', 
  marginTop:'16px',
  borderLeft:'5px solid #fbbf24',
  boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
}}>
  <p style={{margin: '6px 0', fontSize: '15px'}}><b>Version:</b> v1.0.3-auto</p>
  <p style={{margin: '6px 0', fontSize: '15px'}}><b>Status:</b> Auto Mode Active [OK]</p>
  <p style={{margin: '6px 0', fontSize: '15px'}}><b>Owner:</b> Arif GM Sahib</p>
  <p style={{margin: '6px 0', fontSize: '15px'}}><b>Build:</b> 13-09-2026</p>
</div>

      {/* YE GREEN TASK MANAGER BOX HAI */}
      <div className="bg-white border-2 border-green-500 rounded-xl p-6 shadow-md mt-4">
        <h2 className="text-lg font-semibold text-green-600 mb-4">PEOS Task Manager - Auto Mode [AUTO]</h2>
        <ul className="space-y-2">
          {tasks.map(task => (
            <li key={task.id} className="flex justify-between p-2 bg-gray-100 rounded">
              <span>{task.name}</span>
              <span className="text-green-600 font-bold">{task.status}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* AUTO TESTER SECTION */}
      <div className="bg-white border-2 border-blue-500 rounded-xl p-6 shadow-md mt-4">
        <h2 className="text-lg font-semibold text-blue-600 mb-4">PEOS AutoTester v1.0</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Run Auto Test
        </button>
      </div>
    </div>
  );
};

export default Dashboard;