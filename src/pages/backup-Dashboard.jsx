import React from 'react';

export default function Dashboard() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      <h1 className="text-2xl font-bold text-green-700 mb-4">PEOS Dashboard</h1>
      
      {/* VERSION BOX - NELA PEELA */}
      <div className="bg-gradient-to-r from-blue-600 to-yellow-400 text-white p-4 rounded-lg mb-6 border-l-4 border-yellow-500 shadow-lg">
        <p className="my-1"><b>Version:</b> v1.0.3-auto</p>
        <p className="my-1"><b>Status:</b> Auto Mode Active [OK]</p>
        <p className="my-1"><b>Owner:</b> Arif GM Sahib</p>
        <p className="my-1"><b>Build:</b> 13-09-2026</p>
      </div>

      {/* TASK MANAGER BOX - GREEN */}
      <div className="bg-white border-2 border-green-600 rounded-xl p-6 shadow-md">
        <h2 className="text-lg font-semibold text-green-700 mb-4">PEOS Task Manager</h2>
        <p className="text-gray-700">Total Tasks: 0 | Completed: 0</p>
        <p className="text-sm text-gray-500 mt-2">System Ready for Auto Mode</p>
      </div>
    </div>
  );
}