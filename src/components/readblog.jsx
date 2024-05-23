import {useParams} from 'react-router-dom'
import {useState,useEffect} from 'react'
import MyNavbar from './MyNavbar.jsx'
import '../styles/blogs.css'
export default function ReadBlog(){
	let {id} = useParams()
	const [blog,setBlog] = useState()
	const url = `https://codebase-fawn.vercel.app/api/v1/blog/${id}`
	const options  = {method : "GET",headers : {"Content-Type":"application/json"}}
	const markup = (text) => {
		return {__html:text}
	}
	const getBlog = ()=>{
		fetch(url,options)
		.then(res=> {return res.json()})
		.then(data => {setBlog(data)
				console.log(blog)
				})
	}
	useEffect(()=>{
		getBlog()
	},[id])
	if (!blog){
		return 
		<>
		<MyNavbar />
		<p>loading ...</p>
		</>
	}
	return (
		<>
		<MyNavbar />
		<div class="blog-container">
		{/*<p class="blog-date">{new Date(blog.date).toLocaleString()}</p>*/}


		<p class="blog-header">{blog.title}</p>
		<p class="blog-readtime">Read time : {blog.readtime}</p>
		<hr />
		{/*<h class="33333blog-category">{blog.category}</h>*/}


		<div dangerouslySetInnerHTML={markup(blog.body)} class="blog-body"/>

		</div>
		</>
		)
}