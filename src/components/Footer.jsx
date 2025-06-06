import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">TGW Blog</h3>
          <p className="mb-4">Share your thoughts with the world</p>
          <div className="flex justify-center space-x-4 mb-4">
            <Link to="/" className="hover:text-gray-300">Home</Link>
            <Link to="/about" className="hover:text-gray-300">About</Link>
            <Link to="/all-blogs" className="hover:text-gray-300">All Blogs</Link>
            <Link to="/contact" className="hover:text-gray-300">Contact</Link>
          </div>
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} TGW Blog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer