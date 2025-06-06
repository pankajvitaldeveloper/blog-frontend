import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  //below of redux auth implementation
  const isLoggeIn = useSelector(state=>state.auth.isAuthenticated)

  const links = [
    {
      name: "Home",
      to: '/',
    },
    {
      name: "About",
      to: '/about',
    },
    {
      name: "Profile",
      to: '/profile',
    },
    {
      name: "All Blogs",
      to: '/all-blogs',
    },
    {
      name: "Contact",
      to: '/contact',
    },
    
  ]

  //below of redux auth implementation
  if(!isLoggeIn){
    links.splice(2,1)
  }
  // else{
  //   links.splice(2,0,{
  //     name: "My Blogs",
  //     to: '/my-blogs',
  //   })
  // }


  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-gray-800">
              TGW Blog
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center">
            <div className="flex items-center space-x-4">
              {links.map((link, index) => (
                <Link
                  key={index}
                  to={link.to}
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            {/* Auth Links */}
            <div className="ml-6 flex items-center space-x-3">
            {!isLoggeIn && (
              <>
              <Link
                to="/login"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium border border-gray-300 hover:border-gray-400"
              >
                Login
              </Link>
              
                <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
              >
                Register
              </Link></>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((link, index) => (
              <Link
                key={index}
                to={link.to}
                className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {/* Mobile Auth Links */}
            <div className="mt-4 space-y-2">
            {!isLoggeIn && (
              <>
              <Link
                to="/login"
                className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium border border-gray-300"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
             
                <Link
                to="/register"
                className="bg-blue-600 text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Register
              </Link></>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar