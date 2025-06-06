import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from "react-router-dom";

const EditBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const backendUrl = useSelector((state) => state.prod.link);

  // Calculate reading time based on content length
  const calculateReadTime = (content) => {
    const wordsPerMinute = 200; // Average reading speed
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes < 1 ? '1 min read' : `${minutes} min read`;
  };

  // Delete blog handler
  const handleDeleteBlog = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await axios.delete(`${backendUrl}/api/blog/${blogId}`);
        setBlogs(blogs.filter(blog => blog._id !== blogId));
        toast.success('Blog deleted successfully');
      } catch (error) {
        console.error('Error deleting blog:', error);
        toast.error('Failed to delete blog');
      }
    }
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${backendUrl}/api/blogs`);
        const blogsData = Array.isArray(response.data) ? response.data : response.data.blogs || [];
        setBlogs(blogsData);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        toast.error('Failed to load blogs');
        setBlogs([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, [backendUrl]);

  if (isLoading) {
    return (
      <section className="py-16 ">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto"></div>
          <p className="mt-4">Loading blogs...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-100 min-h-screen">
      <Toaster position="top-right" />
      <div className="container mx-auto px-4">
        <h1 className="text-center text-gray-800 text-3xl font-bold mb-8">Manage Blogs</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div key={blog._id}>
              <article className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-0 right-0 p-2 flex gap-2">
                    <Link 
                      to={`/admin-dashboard/edit-blogs/${blog._id}`}
                      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors duration-200"
                    >
                      <FaEdit size={16} />
                    </Link>
                    <button 
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors duration-200"
                      onClick={() => handleDeleteBlog(blog._id)}
                    >
                      <FaTrash size={16} />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{blog.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-600">
                      Category: {blog.category?.name || 'Uncategorized'}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {calculateReadTime(blog.description)}
                    </span>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EditBlog;