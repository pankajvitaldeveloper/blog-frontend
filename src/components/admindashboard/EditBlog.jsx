import React from 'react'
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

const EditBlog = () => {
    const blogs = [
        {
          id: 1,
          title: "Web Development",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, repellendus.",
          img: "https://media.istockphoto.com/id/1371339413/photo/co-working-team-meeting-concept-businessman-using-smart-phone-and-digital-tablet-and-laptop.jpg?s=612x612&w=0&k=20&c=ysEsVw3q2axYt3oVZAuQjtHRlN3lY-U_e0ikK5yKIXQ=",
        },
        {
          id: 2,
          title: "Full Stack Development",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, repellendus.",
          img: "https://www.clariwell.in/resources/best-web-development-course-top-training-institute-in-pune.webp",
        },
        {
          id: 3,
          title: "Digital Marketing",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, repellendus.",
          img: "https://www.reliablesoft.net/images/digital-marketing-basics-course-example.webp",
        },
        {
          id: 4,
          title: "Data Structure and Algorithms",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, repellendus.",
          img: "https://media.geeksforgeeks.org/wp-content/uploads/20240927124548/DSA-Self-Paced-Course.webp",
        },
        {
          id: 5,
          title: "Node & React",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, repellendus.",
          img: "https://positiwise.com/blog/wp-content/uploads/2022/10/node-js-v-react-js-1.jpg",
        },
        {
          id: 6,
          title: "Ai Course",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, repellendus.",
          img: "https://cdn.analyticsvidhya.com/wp-content/uploads/2023/08/generative-ai-course-672ca52b9cf04.webp",
        },
        {
          id: 1,
          title: "Web Development",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, repellendus.",
          img: "https://media.istockphoto.com/id/1371339413/photo/co-working-team-meeting-concept-businessman-using-smart-phone-and-digital-tablet-and-laptop.jpg?s=612x612&w=0&k=20&c=ysEsVw3q2axYt3oVZAuQjtHRlN3lY-U_e0ikK5yKIXQ=",
        },
        {
          id: 2,
          title: "Full Stack Development",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, repellendus.",
          img: "https://www.clariwell.in/resources/best-web-development-course-top-training-institute-in-pune.webp",
        },
        {
          id: 3,
          title: "Digital Marketing",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, repellendus.",
          img: "https://www.reliablesoft.net/images/digital-marketing-basics-course-example.webp",
        },
        {
          id: 4,
          title: "Data Structure and Algorithms",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, repellendus.",
          img: "https://media.geeksforgeeks.org/wp-content/uploads/20240927124548/DSA-Self-Paced-Course.webp",
        },
        {
          id: 5,
          title: "Node & React",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, repellendus.",
          img: "https://positiwise.com/blog/wp-content/uploads/2022/10/node-js-v-react-js-1.jpg",
        },
        {
          id: 6,
          title: "Ai Course",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, repellendus.",
          img: "https://cdn.analyticsvidhya.com/wp-content/uploads/2023/08/generative-ai-course-672ca52b9cf04.webp",
        },
      ];
      return (
        <section className="py-16 bg-gray-100 min-h-screen">
          <div className="container mx-auto px-4">
            <h1 className="text-center text-gray-800 text-3xl font-bold mb-8">Manage Blogs</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog, index) => (
                <div key={index}>
                  <article className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                    <div className="relative">
                      <img
                        src={blog.img}
                        alt={blog.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-0 right-0 p-2 flex gap-2">
                        <button 
                          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors duration-200"
                          onClick={() => console.log('Edit', blog.id)}
                        >
                          <FaEdit size={16} />
                        </button>
                        <button 
                          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors duration-200"
                          onClick={() => console.log('Delete', blog.id)}
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">
                        {blog.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{blog.description}</p>
                      <div className="flex justify-between items-center">
                        <Link
                          to={`/admin-dashboard/edit-blogs/${blog.id}`}
                          className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300"
                        >
                          Edit Details
                        </Link> 
                        <span className="text-gray-500 text-sm">5 min read</span>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </section>
    );
};

export default EditBlog