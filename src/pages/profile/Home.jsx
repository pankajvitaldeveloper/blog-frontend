import React, { useState } from 'react'
import Sidebar from '../../components/profile/Sidebar'
import { Outlet } from 'react-router-dom'
import { HiMenuAlt2, HiX } from 'react-icons/hi'

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 relative">
      {/* Mobile Menu Button */}
      <button 
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 right-4 z-50 p-2 rounded-lg bg-white shadow-lg text-gray-700 hover:bg-gray-100"
      >
        {isOpen ? <HiX size={24} /> : <HiMenuAlt2 size={24} />}
      </button>

      {/* Sidebar with animation */}
      <div className={`fixed md:static w-64 h-full transform transition-transform duration-300 ease-in-out z-40
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        bg-white border-r border-gray-200`}
      >
        <div className="p-4">
          <Sidebar onLinkClick={toggleSidebar} />
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Main content area */}
      <div className="flex-1 p-4 md:p-6 overflow-auto md:ml-0 mt-16 md:mt-0">
        <Outlet />
      </div>
    </div>
  )
}

export default Home