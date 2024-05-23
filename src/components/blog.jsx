import '../styles/blogs.css'
import {Link} from 'react'
export default function Blog({blogs}){
    console.log(blogs)
    const readUrl = ''
    return (
        <div class="blog">
            <h class='category-label'>{blogs.category}</h>
            <h1>
                {blogs.title} 
            </h1>
            <p id="blog-body">
                {blogs.description}
            </p>
            <a href={`/blog/${blogs.id}`} id="blog-detail-btn">Read More </a>
            <p id="time">
                {blogs.readtime} minute read
            </p>
            <hr />
        </div>
    )
}