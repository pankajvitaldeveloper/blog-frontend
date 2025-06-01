import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/authReducer'

const Sidebar = ({ onLinkClick }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const backendUrl = useSelector(state=>state.prod.link);
    const dispatch = useDispatch();
    const sidebarLinks = [
        {
            name: "Dashboard",
            to: '/profile',
            icon: "📊"
        },
        {
            name: "Favorites",
            to: '/profile/favorites',
            icon: "⭐"
        },
        {
            name: "Liked Blogs",
            to: '/profile/likedblogs',
            icon: "❤️"
        },
    ]

    const handleLinkClick = () => {
        // Only call onLinkClick if it exists and we're on mobile
        if (onLinkClick && window.innerWidth < 768) {
            onLinkClick();
        }
    };

    const handleLogout = async () => {
        try {
            const loadingToast = toast.loading('Logging out...');
            
            // Call logout API which will clear the JWT cookie on the server side
            await axios.post(
                `${backendUrl}/api/logout`,
                {},
                { withCredentials: true }
            );

            // Dispatch logout action to clear Redux state
            dispatch(logout());
            
            toast.dismiss(loadingToast);
            toast.success('Logged out successfully');

            // Redirect to login page after a short delay
            setTimeout(() => {
                navigate('/login');
            }, 1000);

        } catch (error) {
            toast.error('Failed to logout. Please try again.');
            console.error('Logout error:', error);
        }
    };

    return (
        <div className="flex flex-col h-full bg-white shadow-lg rounded-xl p-4 transition-all duration-300 w-full">
            <div className="flex flex-col space-y-2">
                {sidebarLinks.map((item) => (
                    <Link 
                        key={item.name}
                        to={item.to}
                        onClick={handleLinkClick}
                        className={`flex items-center gap-3 p-4 rounded-lg transition-all duration-200 hover:bg-blue-50 
                            ${location.pathname === item.to 
                                ? 'bg-blue-100 text-blue-600 font-medium shadow-sm' 
                                : 'text-gray-600 hover:text-blue-600'}`}
                    >
                        <span className="text-xl">{item.icon}</span>
                        <span className="text-base">{item.name}</span>
                    </Link>
                ))}
            </div>
            
            <div className="mt-auto pt-6">
                <button 
                    onClick={handleLogout}
                    className="w-full bg-red-500 text-white p-4 rounded-lg font-medium
                        transition-all duration-200 hover:bg-red-600 active:scale-95
                        focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Sidebar