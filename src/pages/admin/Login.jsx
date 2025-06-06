import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/authReducer';
const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    // below backend link
    const backendUrl = useSelector((state)=>state.prod.link);
    // redux login code
    const dispatch = useDispatch()


    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Form validation
        if (!formData.email || !formData.password) {
            toast.error('Please fill in all fields');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            toast.error('Please enter a valid email address');
            return;
        }

        setLoading(true);
        const loadingToast = toast.loading('Logging in...');

        try {
            const response = await axios.post(
                `${backendUrl}/api/login`,
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true  // Important for receiving cookies
                }
            );

            // Dispatch login action with user data
            dispatch(login(response.data.user));

            toast.dismiss(loadingToast);

            if (response.data.success) {
                toast.success('Login successful!');
                // Remove localStorage usage since we're using JWT cookies
                setTimeout(() => {
                    navigate('/profile');
                }, 1000);
            }
        } catch (error) {
            toast.dismiss(loadingToast);
            const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center gradient-primary p-4">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="max-w-md w-full space-y-8 bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white/20">
                <div>
                    <h2 className="text-center text-3xl font-bold ">
                        Welcome Back
                    </h2>
                    <p className="mt-2 text-center text-sm ">
                        Please sign in to your account
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                className="appearance-none relative block w-full px-3 py-3 border border-gray-300/20  bg-white/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="Email address"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                className="appearance-none relative block w-full px-3 py-3 border border-gray-300/20  bg-white/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-black"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`group relative w-full flex text-white justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg  bg-purple-600 
                            ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-purple-700'} 
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300`}
                    >
                        {loading ? (
                            <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Signing in...
                            </span>
                        ) : (
                            'Sign in'
                        )}
                    </button>
                    <p className="mt-4 text-center text-sm ">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-medium transition-colors duration-200">
                            Register here
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;