import React from 'react';
import { FaReact, FaNodeJs, FaDatabase, FaUsers, FaCode, FaLightbulb } from 'react-icons/fa';
import { SiExpress, SiMongodb, SiTailwindcss, SiRedux } from 'react-icons/si';
import { Link } from 'react-router-dom';

const About = () => {

    
// Tech stack data
const techStack = [
  {
    name: "React.js",
    icon: <FaReact className="text-5xl text-blue-500" />,
    description: "Modern UI development with component-based architecture"
  },
  {
    name: "Node.js",
    icon: <FaNodeJs className="text-5xl text-green-600" />,
    description: "Server-side JavaScript runtime environment"
  },
  {
    name: "MongoDB",
    icon: <SiMongodb className="text-5xl text-green-500" />,
    description: "NoSQL database for flexible data storage"
  },
  {
    name: "Express.js",
    icon: <SiExpress className="text-5xl text-gray-600" />,
    description: "Fast, unopinionated web framework for Node.js"
  }
];

// Statistics data
const statistics = [
  { value: "10K+", label: "Active Users" },
  { value: "50K+", label: "Blog Posts" },
  { value: "100K+", label: "Monthly Views" },
  { value: "5K+", label: "Contributors" }
];

// Features data
const features = [
  {
    title: "User Authentication",
    description: "Secure user registration and login system with JWT authentication."
  },
  {
    title: "Rich Text Editor",
    description: "Create and edit blog posts with a powerful WYSIWYG editor."
  },
  {
    title: "Categories & Tags",
    description: "Organize content with categories and tags for better navigation."
  },
  {
    title: "Responsive Design",
    description: "Fully responsive layout that works on all devices and screen sizes."
  },
  {
    title: "Image Upload",
    description: "Support for image uploads with cloud storage integration."
  },
  {
    title: "Social Features",
    description: "Like, comment, and share functionality for enhanced engagement."
  }
];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero Section with Background */}
      <div className="relative mb-20">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg opacity-10"></div>
        <div className="relative text-center py-16 px-4">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to Our MERN Stack Blog
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Empowering developers and content creators with a modern, feature-rich blogging platform
            built using the latest web technologies.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="mb-20">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Mission</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            We're passionate about creating a platform where developers can share their knowledge,
            experiences, and insights with the global tech community. Our mission is to facilitate
            meaningful technical discussions and foster a collaborative learning environment.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <FaUsers className="text-4xl text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
              <p className="text-gray-600">Building a strong developer community through knowledge sharing</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <FaCode className="text-4xl text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Technical Excellence</h3>
              <p className="text-gray-600">Promoting best practices and innovative solutions</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <FaLightbulb className="text-4xl text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Continuous Learning</h3>
              <p className="text-gray-600">Encouraging growth and skill development</p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Tech Stack Section */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-20">
        <h2 className="text-3xl font-semibold text-gray-900 mb-12 text-center">
          Our Technology Stack
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {techStack.map((tech, index) => (
            <div key={index} 
                 className="flex flex-col items-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
              <div className="flex items-center justify-center h-16">
                {tech.icon}
              </div>
              <h3 className="text-xl font-semibold my-4">{tech.name}</h3>
              <p className="text-gray-600 text-center text-sm">{tech.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <div className="mb-20">
        <h2 className="text-3xl font-semibold text-gray-900 mb-12 text-center">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} 
                 className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-12 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          {statistics.map((stat, index) => (
            <div key={index}>
              <div className="text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-lg opacity-90">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Contact Section */}
      <div className="text-center bg-gray-50 rounded-lg p-12">
        <h2 className="text-3xl font-semibold text-gray-900 mb-6">
          Join Our Community
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Whether you're a seasoned developer or just starting your journey,
          we'd love to have you as part of our growing community.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/contact"
            className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200">
            Contact Us
          </Link>
          <Link
            to="/login"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200">
            Start Blogging
          </Link>
        </div>
      </div>
    </div>
  );
};


export default About;