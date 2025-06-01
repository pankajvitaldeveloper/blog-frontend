import React from 'react'
import { Link } from 'react-router-dom'
import BlogCard from '../BlogCard/BlogCard'

const LikedBlog = () => {
    const blogs = [
        {
            id:1,
            title:'Web Development',
            description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, repellendus.',
            img: 'https://media.istockphoto.com/id/1371339413/photo/co-working-team-meeting-concept-businessman-using-smart-phone-and-digital-tablet-and-laptop.jpg?s=612x612&w=0&k=20&c=ysEsVw3q2axYt3oVZAuQjtHRlN3lY-U_e0ikK5yKIXQ='
        },
        {
            id:2,
            title:'Full Stack Development',
            description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, repellendus.',
            img: 'https://www.clariwell.in/resources/best-web-development-course-top-training-institute-in-pune.webp'
        },
        {
            id:3,
            title:'Digital Marketing',
            description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, repellendus.',
            img: 'https://www.reliablesoft.net/images/digital-marketing-basics-course-example.webp'
        },
        {
            id:4,
            title:'Data Structure and Algorithms',
            description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, repellendus.',
            img: 'https://media.geeksforgeeks.org/wp-content/uploads/20240927124548/DSA-Self-Paced-Course.webp'
        },
        {
            id:5,
            title:'Node & React',
            description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, repellendus.',
            img: 'https://positiwise.com/blog/wp-content/uploads/2022/10/node-js-v-react-js-1.jpg'
        },
        {
            id:6,
            title:'Ai Course',
            description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, repellendus.',
            img: 'https://cdn.analyticsvidhya.com/wp-content/uploads/2023/08/generative-ai-course-672ca52b9cf04.webp'
        }
    ]

    return (
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-12">
                    <h2 className="text-3xl font-bold text-white">Liked Blog</h2>
                    <Link to="/all-blogs" className="bg-black p-2 hover:text-blue-300 transition-colors duration-300">
                        View All →
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog, index) => (
                     <div key={index}>
                        <BlogCard blog={blog} />
                     </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
export default LikedBlog