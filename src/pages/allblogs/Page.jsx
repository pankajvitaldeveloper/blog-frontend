import React, { useEffect } from "react";
import BlogCard from "../../components/BlogCard/BlogCard";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

const Page = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const backendUrl = useSelector((state) => state.prod.link);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${backendUrl}/api/blogs`);
        console.log('Blogs response:', response.data);
        // Check if response.data is an array, if not get the data from correct property
        const blogsData = Array.isArray(response.data) ? response.data : response.data.blogs || [];// Adjust based on your API response structure
        setBlogs(blogsData);
        // toast.success('Blogs loaded successfully');
      } catch (error) {
        console.error('Error fetching blogs:', error);
        toast.error('Failed to load blogs');
        setBlogs([]); // Set empty array on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, [backendUrl]);

  if (isLoading) {
    return (
      <section className="py-16 gradient-primary">
        <div className="container mx-auto px-4 text-center">
          Loading blogs...
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 gradient-primary">
      {/* <Toaster position="top-center" reverseOrder={false} /> */}
      <div className="container mx-auto px-4">
        <h1 className="text-center text-3xl mb-5">ALL Blogs</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.isArray(blogs) && blogs.length > 0 ? (
            blogs.map((blog, index) => (
              <div key={blog._id || index}>
                <BlogCard blog={blog} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center">No blogs found</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Page;
