import '../styles/blogs.css'
import '../styles/bootstrap.css'
import Blog from './blog.jsx'
import context from '../App.js'
import {useContext} from 'react'
export default function Blogs({blogs}){

    
    return (
        <div class ='blogs'>
            <h1 class="blogs-header">Recent Blogs</h1>
            <h4 class="blogs-heading">Read our most recent Articles</h4>
           {blogs.map((blog,index) =>{
            return(
                <Blog blogs={blog}  key={blogs.id}/>
            )
            })}


        </div>
    )
}