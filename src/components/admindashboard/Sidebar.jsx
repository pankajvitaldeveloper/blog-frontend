import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiMenuAlt2, HiX } from 'react-icons/hi';
import { FaHome, FaPlus, FaEdit } from 'react-icons/fa';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const links = [
        {
            id: 1,
            name: "Dashboard",
            to: "/admin-dashboard",
            icon: <FaHome className="w-5 h-5" />
        },
        {
            id: 2,
            name: "Add Blog",
            to: "/admin-dashboard/add-blogs",
            icon: <FaPlus className="w-5 h-5" />
        },
        {
            id: 3,
            name: "Edit Blog",
            to: "/admin-dashboard/edit-blogs",
            icon: <FaEdit className="w-5 h-5" />
        },
        {
            id: 4,
            name: "Logout",
            to: "/admin-dashboard/logout",
            icon: <FaEdit className="w-5 h-5" />
        },
    ];

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Mobile Toggle Button */}
            <button 
                onClick={toggleSidebar}
                className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-200"
            >
                {isOpen ? <HiX size={24} /> : <HiMenuAlt2 size={24} />}
            </button>

            {/* Sidebar */}
            <div className={`fixed  h-full  bg-purple-600 text-white w-64 transform transition-transform duration-300 ease-in-out z-40
                ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
            >
                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>
                    
                    <nav className="space-y-4">
                        {links.map((link) => (
                            <Link
                                key={link.id}
                                to={link.to}
                                onClick={() => window.innerWidth < 768 && toggleSidebar()}
                                className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200
                                    ${location.pathname === link.to 
                                        ? 'bg-white/10 text-white' 
                                        : 'hover:bg-white/5'}`}
                            >
                                {link.icon}
                                <span className="font-medium">{link.name}</span>
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Overlay for mobile */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                    onClick={toggleSidebar}
                />
            )}
        </>
    );
};

export default Sidebar;