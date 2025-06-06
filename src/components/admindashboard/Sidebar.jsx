import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { HiMenuAlt2, HiX } from 'react-icons/hi';
import { FaHome, FaPlus, FaEdit, FaSignOutAlt } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { logout } from '../../store/authReducer';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const backendUrl = useSelector(state => state.prod.link);

    useEffect(() => {
        const validateAdmin = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/check-cookie`, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.data.success) {
                    toast.error('Admin access required', {
                        id: 'admin-auth'
                    });
                    navigate('/');
                }
            } catch (error) {
                toast.error('Please login as admin', {
                    id: 'admin-auth'
                });
                navigate('/');
            } finally {
                setIsLoading(false);
            }
        };

        validateAdmin();
    }, [backendUrl, navigate]);

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
        </div>;
    }

    const handleLogout = async () => {
        try {
            const loadingToast = toast.loading('Logging out...');
            
            await axios.post(
                `${backendUrl}/api/logout`,
                {},
                { withCredentials: true }
            );

            dispatch(logout());
            
            toast.dismiss(loadingToast);
            toast.success('Logged out successfully');

            setTimeout(() => {
                navigate('/admin-login');
            }, 1000);

        } catch (error) {
            toast.error('Failed to logout. Please try again.');
            console.error('Logout error:', error);
        }
    };

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
            onClick: handleLogout,
            icon: <FaSignOutAlt className="w-5 h-5" />
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
                            link.onClick ? (
                                <button
                                    key={link.id}
                                    onClick={() => {
                                        link.onClick();
                                        if (window.innerWidth < 768) toggleSidebar();
                                    }}
                                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200
                                        hover:bg-white/5`}
                                >
                                    {link.icon}
                                    <span className="font-medium">{link.name}</span>
                                </button>
                            ) : (
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
                            )
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