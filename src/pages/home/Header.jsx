import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className="gradient-primary">
      <div className="container mx-auto px-4 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div className="order-first md:order-last relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative transform transition duration-500 hover:scale-105">
              <div className="glass-effect p-4 md:p-6 rounded-xl shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80" 
                  alt="Web Development" 
                  className="rounded-lg w-full h-auto shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="order-last md:order-first text-center md:text-left space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-purple-900">
              Welcome to Web Development Blog
            </h1>
            <p className="text-lg md:text-xl text-purple-800/90 leading-relaxed">
              Discover the latest insights, tutorials, and best practices in web development. 
              From beginner guides to advanced techniques.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start">
              <Link 
                to="/all-blogs" 
                className="glass-effect border px-8 py-4 rounded-full font-semibold text-purple-900 hover:bg-purple-600 hover:text-white transition-all duration-300"
              >
                Explore Blogs
              </Link>
              <Link 
                to="/login" 
                className="gradient-button"
              >
                Start Writing
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="glass-effect rounded-2xl p-6 gradient-hover">
              <div className="text-4xl font-bold text-purple-900">
                {stat.value}
              </div>
              <div className="text-purple-800/80 mt-2 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Stats data
const stats = [
  { value: '500+', label: 'Articles' },
  { value: '10K+', label: 'Readers' },
  { value: '100+', label: 'Authors' },
  { value: '50+', label: 'Topics' }
];

export default Header