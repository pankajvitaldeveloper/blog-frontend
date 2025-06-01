import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Image Section - Using order utility for mobile/desktop */}
          <div className="order-first md:order-last relative">
            <div className="absolute -inset-1 bg-white/30 rounded-lg blur"></div>
            <div className="relative bg-white p-4 md:p-6 rounded-lg shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80" 
                alt="Web Development" 
                className="rounded-lg w-full h-auto"
              />
            </div>
          </div>

          {/* Content Section - Using order utility */}
          <div className="order-last md:order-first text-center md:text-left space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Welcome to Web Development Blog
            </h1>
            <p className="text-lg md:text-xl text-gray-200">
              Discover the latest insights, tutorials, and best practices in web development. 
              From beginner guides to advanced techniques.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link 
                to="/all-blogs" 
                className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300"
              >
                Explore Blogs
              </Link>
              <Link 
                to="/signup" 
                className="bg-transparent border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition duration-300"
              >
                Start Writing
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold">500+</div>
            <div className="text-gray-200">Articles</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold">10K+</div>
            <div className="text-gray-200">Readers</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold">100+</div>
            <div className="text-gray-200">Authors</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold">50+</div>
            <div className="text-gray-200">Topics</div>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default Header