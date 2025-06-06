import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import BlogCard from '../BlogCard/BlogCard';
import { toast } from 'react-hot-toast';

const Favourites = () => {
    const [favoriteBlogs, setFavoriteBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const backendUrl = useSelector((state) => state.prod.link);

    useEffect(() => {
        const fetchFavoriteBlogs = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`${backendUrl}/api/favorites`, {
                    withCredentials: true
                });

                if (response.data.success) {
                    // Filter out any duplicate blogs by ID
                    const uniqueBlogs = Array.from(new Map(
                        response.data.favorites.map(blog => [blog._id, blog])
                    ).values());
                    setFavoriteBlogs(uniqueBlogs);
                }
            } catch (error) {
                console.error('Error fetching favorites:', error);
                toast.error('Failed to load favorite blogs');
            } finally {
                setIsLoading(false);
            }
        };

        fetchFavoriteBlogs();
    }, [backendUrl]);

    if (isLoading) {
        return (
            <div className="min-h-screen gradient-primary py-8 flex items-center justify-center">
                <div className="text-2xl ">Loading...</div>
            </div>
        );
    }

    if (favoriteBlogs.length === 0) {
        return (
            <section className="py-16 gradient-primary ">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">No Favorite Blogs Yet</h2>
                    <p className="mb-8">Start exploring and add blogs to your favorites!</p>
                    <Link 
                        to="/all-blogs" 
                        className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors duration-300"
                    >
                        Explore Blogs
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 gradient-primary ">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-12">
                    <h2 className="text-3xl font-bold ">
                        Favourite Blogs ({favoriteBlogs.length})
                    </h2>
                    <Link 
                        to="/all-blogs" 
                        className="bg-black p-2 hover:text-blue-300 transition-colors duration-300"
                    >
                        View All →
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {favoriteBlogs.map((blog, index) => (
                        <div key={`${blog._id}-${index}`}>
                            <BlogCard blog={blog} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Favourites;
// working