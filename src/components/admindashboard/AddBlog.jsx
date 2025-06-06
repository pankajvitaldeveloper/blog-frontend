import React, { useState, useRef, useEffect } from 'react'
import { FaImage } from 'react-icons/fa'
import { useSelector } from 'react-redux';
import { toast, Toaster } from 'react-hot-toast';
import axios from 'axios';


const AddBlog = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    image: null
  });

  const [categoryForm, setCategoryForm] = useState({
    name: '',
    description: ''
  });

  const backendUrl = useSelector((state)=>state.prod.link);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/categories`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data.success) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to fetch categories');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Add category handler
  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
        const trimmedName = categoryForm.name.trim();
        if (!trimmedName) {
            toast.error('Category name is required');
            return;
        }

        const response = await axios.post(
            `${backendUrl}/api/category`,
            {
                name: trimmedName,
                description: categoryForm.description.trim()
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }
        );

        if (response.data.success) {
            toast.success('Category added successfully');
            setCategoryForm({ name: '', description: '' });
            fetchCategories();
        }
    } catch (error) {
        console.error('Error adding category:', error.response?.data || error);
        toast.error(error.response?.data?.message || 'Failed to add category');
    }
  };

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
      setFormData(prev => ({
        ...prev,
        image: file
      }));
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    // Validate form data
    if (!formData.title.trim() || !formData.description.trim() || !formData.category || !formData.image) {
      toast.error('All fields are required');
      return;
    }

    setLoading(true);
    const formDataToSend = new FormData();// Create a new FormData object
    // Append form data
    formDataToSend.append('title', formData.title.trim());
    formDataToSend.append('description', formData.description.trim());
    formDataToSend.append('category', formData.category);
    formDataToSend.append('image', formData.image);

    const response = await axios.post(
      `${backendUrl}/api/add-blog`, // Make sure this endpoint is correct
      formDataToSend,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      }
    );

    // Check if response exists and has success property
    if (response && response.data && response.data.success) {
      // Show success message
      toast.success('Blog created successfully!', {
        duration: 3000,
        position: 'top-right'
      });

      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        image: null
      });

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  } catch (error) {
    console.error('Error details:', error.response?.data);
    toast.error(error.response?.data?.message || 'Failed to create blog');
  } finally {
    setLoading(false);
  }
};
// working

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="max-w-4xl mx-auto p-4">
        {/* Add Category Form */}
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Add New Category</h3>
          <form onSubmit={handleAddCategory} className="space-y-4">
            <div>
              <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-1">
                Category Name
              </label>
              <input
                type="text"
                id="categoryName"
                value={categoryForm.name}
                onChange={(e) => setCategoryForm(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter category name"
              />
            </div>
            <div>
              <label htmlFor="categoryDescription" className="block text-sm font-medium text-gray-700 mb-1">
                Category Description (Optional)
              </label>
              <textarea
                id="categoryDescription"
                value={categoryForm.description}
                onChange={(e) => setCategoryForm(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter category description"
                rows="2"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200"
              >
                Add Category
              </button>
            </div>
          </form>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-gray-800">Create New Blog</h2>
        
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

          {/* Updated Category Select */}
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

          {/* Image Upload */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
              Blog Image
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
                      accept="image/*"
                      required
                      ref={fileInputRef}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
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
                  Publishing...
                </>
              ) : (
                'Publish Blog'
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddBlog;

// working