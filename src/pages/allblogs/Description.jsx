import React, { useEffect } from 'react'
import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast, Toaster } from 'react-hot-toast';
import { FaHeart, FaRegHeart } from 'react-icons/fa'; // Import heart icons

const Description = () => {
  const {id} = useParams();
  const [blogData, setBlogData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const backendUrl = useSelector((state) => state.prod.link);

  // Fetch blog data with authentication
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setIsLoading(true);
        
        // First fetch blog data without authentication
        const blogResponse = await axios.get(`${backendUrl}/api/blog/${id}`);
        
        if (blogResponse.data.success) {
          const { blog } = blogResponse.data;
          setBlogData(blog);
          setLikesCount(blog.likeBlogs?.length || 0);
          
          // Then try to get user data to check like status
          try {
            const userResponse = await axios.get(`${backendUrl}/api/getprofiledata`, { 
              withCredentials: true 
            });
            
            if (userResponse.data.success) {
              const userId = userResponse.data.user._id;
              
              // Check if user has liked this blog
              const hasLiked = blog.likeBlogs?.some(
                likedUserId => likedUserId.toString() === userId.toString()
              );
              
              setIsLiked(hasLiked);
            }
          } catch (userError) {
            // If user is not logged in, just continue without like status
            console.log('User not logged in');
            setIsLiked(false);
          }
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
        toast.error('Failed to load blog');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogData();
}, [id, backendUrl]);

  const handleLike = async () => {
    try {
      const endpoint = `${backendUrl}/api/blog/${isLiked ? 'remove' : 'add'}-favorite/${id}`;
      
      const response = await axios.post(endpoint, {}, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        setIsLiked(!isLiked);
        setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
        toast.success(response.data.message);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error('Please login to like blogs');
      } else {
        toast.error('Failed to update like');
      }
    }
  };
  
  const renderLikeButton = () => (
    <div className="flex items-center gap-2">
      <button 
        onClick={handleLike}
        className="transform transition-transform hover:scale-110"
        title={!blogData ? '' : 'Login to like this blog'}
      >
        {isLiked ? (
          <FaHeart className="w-6 h-6 text-red-500" />
        ) : (
          <FaRegHeart className="w-6 h-6 text-white" />
        )}
      </button>
      <span className="text-white text-sm">
        {likesCount} {likesCount === 1 ? 'like' : 'likes'}
      </span>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen gradient-primary py-8 flex items-center justify-center">
        <div className="text-2xl text-white">Loading...</div>
      </div>
    );
  }

  if (!blogData) {
    return (
      <div className="min-h-screen gradient-primary py-12 flex items-center justify-center">
        <div className="text-2xl text-white">Blog not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-primary py-12">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
          {/* Image Section */}
          <div className="w-full h-[400px] relative">
            <img 
              src={blogData?.image}
              alt={blogData?.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="text-4xl font-bold text-white mb-4">
                {blogData?.title}
              </h1>
              <div className="flex items-center gap-4 text-white/80">
                <span>
                  {new Date(blogData?.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
                <span>•</span>
                {renderLikeButton()}
              </div>
            </div>
          </div>
          
          {/* Content Section */}
          <div className="p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 text-lg leading-relaxed">
                {blogData?.description}
              </p>
            </div>
            
            <div className="mt-8 border-t pt-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-gray-600">
                  <span className="text-sm">Share this article:</span>
                  {/* Add your social share buttons here */}
                  <button className="hover:text-blue-600 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
                    </svg>
                  </button>
                  <button className="hover:text-blue-400 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
