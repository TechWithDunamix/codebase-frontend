import MyNavbar from  './MyNavbar.jsx'
import Blogs from './blogs.jsx'
import {useState,useEffect} from 'react'
import Loading from './loading.jsx'
export default function BlogPage(){
  const [blogs,setBlogs] = useState(null)

	useEffect(()=>{
    const options = {method:"GET",mode : "cors",headers : {"Content-Type" : "application/json"} }

    fetch('https://codebase-fawn.vercel.app/api/v1/blogs/',options)

    .then(res => {
      console.log(res)
      if (res.ok){
        return res.json();
      }else{
      	setBlogs(null)
        console.log("error")
      }
    })
    .then(data =>{
    	console.log(data)
    	setBlogs(data)})

    .catch(error =>{
      console.log(error)
    })
    },[])
    if (!blogs){
			return (<Loading />)
		}
	return (
		<div>
		<MyNavbar />

		<Blogs blogs={blogs}/>
		</div>
		
		)
	
}