import {useParams} from 'react-router-dom'
import {useState,useEffect} from  'react'
import MyNavbar from './MyNavbar.jsx'
import '../styles/course.css'
import RegisterationForm from "./registerationForm"

export default function Topics(){
	const {id} = useParams()
	const [error404,set404] = useState(false)
	const [error401,set401] = useState(false)

	const [topic,setTopic] = useState()
	const markUp = (text) => {
		return {__html:text}
	}
	const getTopic= ()=>{
		const token = localStorage.getItem("token")	

		const options = {method :'GET',headers:{"Content-Type":"application/json","Authorization":`Token ${token}`}}

		fetch(`https://codebase-fawn.vercel.app/api/v1/topic/${id}`,options)
		.then(res => {
			if (res.status === 401){
				throw new Error("401")
				}
			if (res.status === 404){
				throw new Error("404")
				}
			
			return res.json()
			 })
		.then(data => {
			setTopic(data)
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
		getTopic()
		console.log(topic)

	},[id])
	if (error401){
		return (
			<RegisterationForm />)
	}
	if (error404){
		return (
			<>
			<MyNavbar />
			<p style={{fontSize:"2rem",color:"grey"}}>Error : Page Not Found </p>
			</>
			)
	}
	if (!topic){
		return( <>
				<MyNavbar />
				<p>Loading ... </p>
				</>)
	}
	return (
		<>
		<MyNavbar />
		<a href={`/course/${topic.course}`} class="topic-return"> Go Back </a>
		<h1 className="topic-heading">{topic.title}</h1>
		<div class="topic-body" dangerouslySetInnerHTML={markUp(topic.body)} syle={{margin:"20px"}}/>
		
		{/*</div>*/}
		</>
	)
}