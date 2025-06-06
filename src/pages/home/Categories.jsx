import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast, Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { FaFolder, FaSpinner } from 'react-icons/fa'; // Import icons

const Categories = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const backendUrl = useSelector((state) => state.prod.link);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backendUrl}/api/categories`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response
        .data.success) {
        setCategories(response.data.categories);
        // toast.success('Categories loaded successfully');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      // toast.error('Failed to fetch categories');
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="py-16 gradient-primary">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <FaSpinner className="animate-spin mr-2 text-2xl" />
            <span className="text-xl">Loading categories...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 gradient-primary">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Explore Categories
          </h2>
          <p className="text-lg">
            Discover content across various topics
          </p>
        </div>

        {categories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category._id}
                to={`/categories/${category._id}`}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 
                         shadow-lg hover:shadow-2xl transition-all duration-300 
                         transform hover:-translate-y-1 group border border-white/20
                         bg-gradient-to-br from-white/5 to-white/10"
              >
                <div className="flex flex-col items-center justify-center min-h-[140px]
                                relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-50"></div>
                  <FaFolder className="text-4xl text-pink-300 mb-4 group-hover:scale-110 
                                      transition-transform duration-300 relative z-10" />
                  <h3 className="text-xl font-semibold mb-2 text-center relative z-10">
                    {category.name}
                  </h3>
                  {category.count && (
                    <span className="text-sm text-gray-200 bg-white/20 px-4 py-1 rounded-full">
                      {category.count} posts
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
            <FaFolder className="text-4xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-200 text-lg">
              No categories found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;