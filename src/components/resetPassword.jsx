import '../styles/form.css'
import {useState,useEffect} from 'react'
import '../styles/bootstrap.css'
import MyNavbar from './MyNavbar.jsx'
import {Redirect} from 'react-router-dom'

export default function ResetPasswordForm(){
	const [email,setEmail] = useState()
	const [token,setToken] = useState()
	const [isValid,setIsValid] = useState(false)
	const [submitButton,setSubmitButton] = useState(false)
	const [isLoading,setIsLoading] = useState(false)
	const [formErrors,setFormErrors] = useState({})
	const [isSent,setIsSent] = useState(false)
	const [showResetForm,setShowResetForm] = useState(false)
	const [password1,setPassword1] = useState()
	const [password2,setPassword2] = useState()
	const [isConfirmed,setIsConfirmed] = useState(false)


	function useFormsubmit(e){
		e.preventDefault()
		setIsLoading(true)
		// console.log('submited')
		const formData = {
					  "email" : email }
		const options = {method :'POST',headers:{"Content-Type":"application/json"},body:JSON.stringify(formData)}
		
		fetch("https://codebase-fawn.vercel.app/api/v1/auth/user/get_reset_mail",options)
		.then((response) => {
			response.json().then((data) =>{
				if (response.ok){
					// localStorage.setItem("token",data.token)
					setIsSent(true)
					setIsLoading(false)

				}
				if (response.status === 404){
					setFormErrors({...formErrors,"email":"Invalid user credentials"})
					setIsLoading(false)
					console.log(data)
					// setFormErrors(errors)
				};
				
			})
		})
		
	}
const submitToken  = (e) => {
	e.preventDefault()
	setIsLoading(true)
	const formData = {
					  "email" : email,"token":token }
	const options = {method :'POST',headers:{"Content-Type":"application/json"},body:JSON.stringify(formData)}
	fetch("http://127.0.0.1:8000/api/v1/auth/user/change_password",options)

	.then(response => {
		if (response.ok){
			return response.json()
		}
		if (response.status === 404){
			throw new Error("404")
		}
	})
	.then(data=>{
		localStorage.setItem("token",data.token)
		window.location.href = '/auth/change/password'
		console.log(data)

	})
	.catch(error =>{
		if (error.message === "404"){
			setFormErrors({...formErrors,"token":"Invalid Code"})
		}
	})
}

		
	return(
		<>
		<MyNavbar />
		<div class="div-center">
			<div class="form-container mt-5">
				<form onSubmit={useFormsubmit} method="post" style={{"margin-top":"30px"}}>
					{!isSent &&<div class="form-group">
					<input type='email'
					placeholder= "Enter your email"
					onChange = {(e) =>{setEmail(e.target.value)}}
					class = "form-control"
					required/>
					{formErrors.email && <p style={{color:"red"}}>{formErrors.email}</p>}

					</div>}

					

					{isSent && <>
					<input type='text'
					placeholder= "enter confirmation code"
					onChange = {(e) => {setToken(e.target.value)}}
					class="form-control"
					// minLength="8"
					value={token}
					required/>
					{formErrors.token && <p style={{color:"red"}}>{formErrors.token}</p>}

					<p>Check your email and spam</p>
					</>
					}

					


					

					
					{isSent ? <button type='submit' class="btn submit-btn mb-5" style={{color:"green",border : "1px solid green"}} onClick={submitToken}>
					Finish 
					</button>:
					<button type='submit' class="btn submit-btn mb-5" style={{color:"green",border : "1px solid green"}}>
					Confirm 
					</button>}
					<p><a href=""> Forgot Password </a></p>
					{isLoading ? <div className="loading"></div>:<div></div>}

					
				</form>
				

			</div>

		</div>
		</>
		
		)
}