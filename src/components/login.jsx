import '../styles/form.css'
import {useState,useEffect} from 'react'
import '../styles/bootstrap.css'
import MyNavbar from './MyNavbar.jsx'
import {Redirect} from 'react-router-dom'

export default function LoginForm(){
	const [email,setEmail] = useState()
	const [password,setPassword] = useState()
	const [isValid,setIsValid] = useState(false)
	const [submitButton,setSubmitButton] = useState(false)
	const [isLoading,setIsLoading] = useState(false)
	const [formErrors,setFormErrors] = useState({})
	


	function useFormsubmit(e){
		e.preventDefault()
		setIsLoading(true)
		// console.log('submited')
		const formData = {
					  "password":password,
					  "email" : email }
		const options = {method :'POST',headers:{"Content-Type":"application/json"},body:JSON.stringify(formData)}
		
		fetch("https://codebase-fawn.vercel.app/api/v1/auth/login",options)
		.then((response) => {
			response.json().then((data) =>{
				if (response.ok){
					localStorage.setItem("token",data.token)
					window.location.href = '/'
				}
				if (response.status === 404){
					setFormErrors({...formErrors,"email":"Invalid user credentials"})
					setIsLoading(false)
					console.log(data)
					// setFormErrors(errors)
				};
				if (response.status === 400){
					setFormErrors({...formErrors,"password":"Incorrect Password"})
					setIsLoading(false)
					console.log(data)
					// setFormErrors(errors)
				}
			})
		})
		
	}

		
	return(
		<>
		<MyNavbar />
		<div class="div-center">
			<div class="form-container mt-5">
				<form onSubmit={useFormsubmit} method="post" style={{"margin-top":"30px"}}>
					<div class="form-group">
					<input type='email'
					placeholder= "Enter your email"
					onChange = {(e) =>{setEmail(e.target.value)}}
					class = "form-control"
					required/>
					{formErrors.email && <p style={{color:"red"}}>{formErrors.email}</p>}

					</div>

					

					<input type='password'
					placeholder= "confirm your Password"
					onChange = {(e) => {setPassword(e.target.value)}}
					class="form-control"
					// minLength="8"
					value={password}
					required/>
					{/*<p style={{color:"red"}}>{passwordMatchError && 'password do not match'}</p>*/}
					{/*<p style={{color:"red"}}>{passwordLengthError && 'Password is to short'}</p>*/}


					

					
					<button type='submit' class="btn submit-btn mb-5" style={{color:"green",border : "1px solid green"}}>
					Login
					</button>
					<p><a href="/auth/reset"> Forgot Password </a></p>
					{isLoading ? <div className="loading"></div>:<div></div>}

					<p>Dont  have an account <a href="/auth/register"> Sign Up</a> </p>
				</form>
				<div style={{color : "gray",marginTop:"20px"}}>
				sign up to enjoy our weekly email and also contribute to our open sourceCodeBase
				</div>

			</div>

		</div>
		</>
		
		)
}