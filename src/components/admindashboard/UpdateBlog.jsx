import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaImage } from 'react-icons/fa';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

const UpdateBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const backendUrl = useSelector((state) => state.prod.link);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
    currentImage: '',
    category: ''
  });

  // Fetch blog data on component mount
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${backendUrl}/api/blog/${id}`);
        
        const { blog } = response.data;
        
        if (!blog) {
          toast.error('Blog not found');
          return;
        }

        // Set the form data with the blog values
        setFormData({
          title: blog.title,
          description: blog.description,
          currentImage: blog.image,
          category: blog.category, // This should be the category ID
          image: null
        });

      } catch (error) {
        console.error('Error fetching blog:', error);
        toast.error('Failed to load blog data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [id, backendUrl]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/categories`, {
          withCredentials: true
        });
        
        if (response.data.success) {
          setCategories(response.data.categories);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast.error('Failed to fetch categories');
      }
    };

    fetchCategories();
  }, [backendUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        try {
            // Validate file size (10MB)
            const maxSize = 10 * 1024 * 1024; // 10MB in bytes
            if (file.size > maxSize) {
                toast.error('Image size must be less than 10MB');
                fileInputRef.current.value = ''; // Reset file input
                return;
            }

            // Validate file type
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!allowedTypes.includes(file.type)) {
                toast.error('Only JPG, PNG and GIF images are allowed');
                fileInputRef.current.value = ''; // Reset file input
                return;
            }

            // Create preview URL for immediate feedback
            const previewUrl = URL.createObjectURL(file);
            
            setFormData(prev => ({
                ...prev,
                image: file,
                currentImage: previewUrl // Show preview immediately
            }));

            // console.log('Image selected successfully:', {
            //     name: file.name,
            //     size: `${(file.size / 1024 / 1024).toFixed(2)}MB`,
            //     type: file.type
            // });
        } catch (error) {
            console.error('Error handling image:', error);
            toast.error('Error processing image file');
            fileInputRef.current.value = '';
        }
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await axios.delete(`${backendUrl}/api/blog/${id}`);
        toast.success('Blog deleted successfully');
        navigate('/admin-dashboard/edit-blogs');
      } catch (error) {
        console.error('Error deleting blog:', error);
        toast.error('Failed to delete blog');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        // Validate required fields
        if (!formData.title || !formData.description || !formData.category) {
            toast.error('Please fill all required fields');
            setLoading(false);
            return;
        }

        const formDataToSend = new FormData();
        
        // Append basic fields
        formDataToSend.append('title', formData.title.trim());
        formDataToSend.append('description', formData.description.trim());
        formDataToSend.append('category', formData.category);

        // Only append image if a new one is selected
        if (formData.image instanceof File) {
            formDataToSend.append('image', formData.image);
            // console.log('Appending new image:', formData.image.name);
        }

        // Log form data for debugging
        // for (let pair of formDataToSend.entries()) {
        //     console.log('FormData entry:', pair[0], pair[1] instanceof File ? pair[1].name : pair[1]);
        // }

        const response = await axios.put(
            `${backendUrl}/api/blog/${id}`,
            formDataToSend,
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                timeout: 30000,
                maxBodyLength: Infinity, // Important for file uploads
                maxContentLength: Infinity
            }
        );

        if (response.data.success) {
            toast.success('Blog updated successfully');
            // Cleanup preview URL
            if (formData.currentImage && formData.image) {
                URL.revokeObjectURL(formData.currentImage);
            }
            navigate('/admin-dashboard/edit-blogs');
        } else {
            toast.error(response.data.message || 'Failed to update blog');
        }
    } catch (error) {
        console.error('Error updating blog:', error);
        if (error.response?.status === 400) {
            toast.error(error.response?.data?.message || 'Invalid image file');
        } else {
            toast.error('Failed to update blog. Please try again.');
        }
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    // Cleanup preview URL when component unmounts
    return () => {
        if (formData.currentImage && formData.image) {
            URL.revokeObjectURL(formData.currentImage);
        }
    };
}, [formData.currentImage, formData.image]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Toaster position="top-right" />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Edit Blog</h2>
        <button
          type="button"
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
        >
          Delete Blog
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Blog Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter blog title"
            required
          />
        </div>

        {/* Description Input */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter blog description"
            required
          />
        </div>

      {/* working */}
        {/* Category Select */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Select Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Current Image Preview */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Image
          </label>
          <div className="w-full h-48 rounded-lg overflow-hidden bg-gray-100">
            {formData.currentImage ? (
              <img
                src={formData.currentImage}
                alt="Current blog"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <span className="text-gray-400">No image available</span>
              </div>
            )}
          </div>
        </div>

        {/* New Image Upload */}
        <div>
          <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700 mb-1">
            Upload New Image
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-purple-500 transition-colors duration-200">
            <div className="space-y-1 text-center">
              <FaImage className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label htmlFor="image-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500">
                  <span>Upload a file</span>
                  <input
                    id="image-upload"
                    name="image"
                    type="file"
                    className="sr-only"
                    onChange={handleImageChange}
                    accept="image/jpeg,image/png,image/gif"
                    ref={fileInputRef}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/admin-dashboard/edit-blogs')}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors duration-200 flex items-center gap-2
              ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Updating...
              </>
            ) : (
              'Update Blog'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBlog;