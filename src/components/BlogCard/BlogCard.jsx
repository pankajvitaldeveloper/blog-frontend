import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <>
      <article
        key={blog.id}
        className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
      >
        <div className="relative">
          <img
            src={blog.img}
            alt={blog.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent h-20" />
        </div>

        <div className="p-6">
          <h3 className="text-xl font-semibold text-white mb-3">
            {blog.title}
          </h3>
          <p className="text-gray-400 mb-4 line-clamp-2">{blog.description}</p>
          <div className="flex justify-between items-center">
            <Link
              to={`/description/${blog.id}`}
              data={blog}
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300"
            >
              Read More
            </Link> 
            <span className="text-gray-500 text-sm">5 min read</span>
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogCard;
