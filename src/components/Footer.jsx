import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">TGW Blog</h3>
          <p className="mb-4">Share your thoughts with the world</p>
          <div className="flex justify-center space-x-4 mb-4">
            <a href="#" className="hover:text-gray-300">About</a>
            <a href="#" className="hover:text-gray-300">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300">Terms of Service</a>
            <a href="#" className="hover:text-gray-300">Contact</a>
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