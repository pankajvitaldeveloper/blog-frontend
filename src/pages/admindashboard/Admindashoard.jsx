import React from 'react'
import Sidebar from '../../components/admindashboard/Sidebar'
import { Outlet } from 'react-router-dom'

const Admindashoard = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar Container */}
      <div className="md:w-64 flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 md:p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Admindashoard