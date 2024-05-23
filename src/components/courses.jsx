import {useState,useEffect} from 'react'
import MyNavbar from './MyNavbar.jsx'
import Course from './course.jsx'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import RegisterationForm from './registerationForm.jsx'
// import SearchField from './search.jsx'
export default function CoursePage(){
	const [course,setCourse] = useState()
	const [error401,set401] = useState()
	const token = localStorage.getItem("token")	
	const options = {method :'GET',headers:{"Content-Type":"application/json","Authorization":`Token ${token}`}}

	useEffect(() =>{fetch("https://codebase-fawn.vercel.app/api/v1/courses",options)
	.then((response) => {
		if (response.status == 401){
			throw new Error("401")
		}
		return response.json()
		})
	.then(data => {
		setCourse(data)
	})
	.catch(error => {
		if (error.message === "401"){
			set401(true)

		}
	})
	},[])
	if (error401){
		<RegisterationForm />
	}
	if (!course){
		return <>
			<MyNavbar />
			<p>Loading </p>
			</>
	}
	 const handleSearch = (query) => {
    console.log('Searching for:', query);
    // Add your search logic here
  };
	return(
		<div>
			<MyNavbar />
			<h1 id="course-heading"> Free Course</h1>
			<p id="course-detail"> Browse out our amazing text based course for free</p>
			<div class="row course-container">
				
					{course.map((data) => {
						return <Course course={data} />
					})}
			</div>
		</div>

		)
}