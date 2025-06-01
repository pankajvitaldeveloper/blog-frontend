import React from 'react'
import { Link } from 'react-router-dom'

const Categories = () => {
    const categories = [
      {
        name: 'All',
        to: '/categories/all',
        bg: 'bg-pink-500',
      },
      {
        name: 'DSA',
        to: '/categories/dsa',
        bg: 'bg-blue-500',
        
      },
      {
        name: 'Web Development',
        to: '/categories/web-development',
        bg: 'bg-purple-500',
      },
      {
        name: 'MERN Stack',
        to: '/categories/mern-stack',
        bg: 'bg-green-500',
      },
      {
        name: 'Node.js',
        to: '/categories/node',
        bg: 'bg-yellow-500',
      },
      {
        name: 'React.js',
        to: '/categories/react',
        bg: 'bg-red-500',
      },
      {
        name: 'JavaScript',
        to: '/categories/javaScript',
        bg: 'bg-indigo-500',
      }


    ]



  return (
    <div className="py-12 bg-blue-600">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-white mb-8">Popular Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={category.to}
              className={`${category.bg} transform hover:scale-105 transition-all duration-300 rounded-lg p-4 text-white text-center shadow-lg hover:shadow-xl flex items-center justify-center min-h-[100px] font-medium`}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Categories