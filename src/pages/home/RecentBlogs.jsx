import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import BlogCard from "../../components/BlogCard/BlogCard";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const RecentBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const backendUrl = useSelector((state) => state.prod.link);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${backendUrl}/api/recent-blogs`);
        // Check if response.data is an array, if not get the data from correct property
        const blogsData = Array.isArray(response.data)
          ? response.data
          : response.data.blogs || [];
        // // Get only the 3 most recent blogs
        // const recentBlogs = blogsData.slice(0, 3);
        setBlogs(blogsData);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        toast.error("Failed to load blogs");
        setBlogs([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, [backendUrl]);

  if (isLoading) {
    return (
      <section className="py-16 gradient-primary ">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-white border-t-transparent"></div>
            <span className="ml-3">Loading blogs...</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 gradient-primary">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold ">Recent Blogs</h2>
          <Link
            to="/all-blogs"
            className="bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full 
                     hover:bg-white/20 transition-all duration-300 
                     border border-white/20"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.isArray(blogs) && blogs.length > 0 ? (
            blogs.map((blog, index) => (
              <div key={blog._id || index} className="transform hover:-translate-y-1 transition-transform duration-300">
                <BlogCard blog={blog} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
              <p className="text-xl ">No blogs found</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RecentBlogs;
