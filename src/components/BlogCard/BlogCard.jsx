import React from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegClock } from "react-icons/fa";

const BlogCard = ({ blog }) => {
  return (
    <article
      key={blog._id}
      className="bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg 
                 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 
                 border border-white/20"
    >
      <div className="relative group">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-48 object-cover transition-transform duration-300 
                     group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 
                        bg-gradient-to-t from-black/50 to-transparent h-20" />
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium">
            {blog.category?.name || 'Uncategorized'}
          </span>
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <FaRegClock className="w-3 h-3" />
            <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2 
                       hover:text-purple-600 transition-colors duration-300">
          {blog.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-2">
          {blog.description}
        </p>

        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <Link
            to={`/description/${blog._id}`}
            className="px-4 py-2 bg-purple-100 text-purple-600 rounded-full 
                     hover:bg-purple-200 transition-colors duration-300 text-sm font-medium"
          >
            Read More →
          </Link>
          <div className="flex items-center gap-2">
            <FaHeart className="w-4 h-4 text-pink-500" />
            <span className="text-gray-600 text-sm font-medium">
              {blog.likeBlogs?.length || 0}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
