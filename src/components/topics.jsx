import {useParams} from 'react-router-dom'
import {useState,useEffect} from  'react'
import MyNavbar from './MyNavbar.jsx'
import '../styles/course.css'
import RegisterationForm from "./registerationForm"
export default function Topics(){
	const {id} = useParams()
	const [error404,set404] = useState(false)
	const [error401,set401] = useState(false)

	const [course,setCourse] = useState() 
	const getCourse = ()=>{
		const token = localStorage.getItem("token")	

		const options = {method :'GET',headers:{"Content-Type":"application/json","Authorization":`Token ${token}`}}

		fetch(`https://codebase-fawn.vercel.app/api/v1/course/${id}`,options)
		.then(res => {
			if (res.status === 404){
				throw new Error("404")
				}
			if (res.status === 401){
				throw new Error("401")
				}
			return res.json()
			 })
		.then(data => {
			setCourse(data)
		})

		.catch(error =>{
			if (error.message === "404"){
				set404(true)
			}
			if (error.message === "401"){
				set401(true)
			}
		})
		}
	useEffect(() =>{
		getCourse()
		console.log(course)

	},[id])
	if (error404){
		return (
			<>
			<MyNavbar />
			<p style={{fontSize:"2rem",color:"grey"}}>Error : Page Not Found </p>
			</>
			)
	}
	if (error401){
		return (
			<RegisterationForm />
			)
	}
	if (!course){
		return( <>
				<MyNavbar />
				<p>Loading ... </p>
				</>)
	}
	return (
		<>
		<MyNavbar />
		<h1 className="topic-heading">{course.name}</h1>
		<p className="topic-descriptions">{course.description}</p>
		<div class="topics-container">
		<ul class="topic-container">
			{course.topics.map(topic =>{
				return <li key={topic.id} class="topics"><a href={`/topic/${topic.id}`}> {topic.title}</a></li>
			})}
		</ul>
		</div>
		</>
	)
}