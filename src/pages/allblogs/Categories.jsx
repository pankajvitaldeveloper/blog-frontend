import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import BlogCard from "../../components/BlogCard/BlogCard";
import { toast } from "react-hot-toast";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [categoryBlogs, setCategoryBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { categoryId } = useParams();
  const backendUrl = useSelector((state) => state.prod.link);

  // Fetch all categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/categories`);
        // console.log(response.data, "Categories response:");
        if (response.data.success) {
          setCategories(response.data.categories);
        }
      } catch (error) {
        // console.error("Error fetching categories:", error);
        toast.error("Failed to load categories");
      }
    };

    fetchCategories();
  }, [backendUrl]);

  // Fetch blogs by category ID when categoryId changes
  useEffect(() => {
    const fetchCategoryBlogs = async () => {
      if (!categoryId) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await axios.get(
          `${backendUrl}/api/category/${categoryId}`,
          { withCredentials: true }
        );

        if (response.data.success) {
          setCategoryBlogs(response.data.blogs);
        }
      } catch (error) {
        // console.error("Error fetching category blogs:", error);
        toast.error(
          error.response?.data?.message ||
            "Failed to load blogs for this category"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategoryBlogs();
  }, [categoryId, backendUrl]);

  if (isLoading) {
    return (
      <div className="min-h-screen gradient-primary py-8 flex items-center justify-center">
        <div className="text-2xl ">Loading...</div>
      </div>
    );
  }

  return (
    <section className="py-16 gradient-primary ">
      <div className="container mx-auto px-4">
        <h1 className="text-center  text-3xl mb-8">Categories</h1>

        {/* Category List */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          {categories.map((category) => (
            <Link
              key={category._id}
              to={`/categories/${category._id}`}
              className={`bg-white rounded-xl p-6 hover:shadow-xl transition-all duration-300 
                ${categoryId === category._id ? "ring-2 ring-blue-400" : ""}`}
            >
              <div className="text-blue-800 font-semibold text-center">
                {category.name}
              </div>
            </Link>
          ))}
        </div>

        {/* Blogs Grid */}
        {categoryId && (
          <div>
            <h2 className="text-2xl font-bold mb-6">
              {categories.find((c) => c._id === categoryId)?.name || "Category"}{" "}
              Blogs
            </h2>
            {categoryBlogs.length === 0 ? (
              <div className="text-center py-8">
                <p>No blogs found in this category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoryBlogs.map((blog) => (
                  <div key={blog._id}>
                    <BlogCard blog={blog} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Categories;
