import '../styles/form.css'
import {useState,useEffect} from 'react'
import '../styles/bootstrap.css'
import MyNavbar from './MyNavbar.jsx'
import {Redirect} from 'react-router-dom'

export default function RegisterationForm(){
	const [email,setEmail] = useState()
	const [firstName,setFirstName] = useState('')
	const [lastName,setLastName] = useState('')
	const [password1,setPassword1] = useState('')
	const [password2,setPassword2] = useState()
	const [github,setGitHub] = useState('')
	const [submitText,setSubmitText] = useState("Sign In")
	const [passwordMatchError,setPasswordMatchError] = useState('')
	const [passwordLengthError,setPasswordLengthError] = useState('')
	const [isValid,setIsValid] = useState(false)
	const [submitButton,setSubmitButton] = useState(false)
	const [isLoading,setIsLoading] = useState(false)
	const [formErrors,setFormErrors] = useState({})
	const [showActivation,setShowActivation] = useState(false)
	


	function useFormsubmit(e){
		e.preventDefault()
		setIsLoading(true)
		// console.log('submited')
		setSubmitText("Signing in")
		const formData = {"first_name":firstName,
					  "last_name"  : lastName,
					  "password":password1,
					  "github_url":github,
					  "email" : email }
		const options = {method :'POST',headers:{"Content-Type":"application/json"},body:JSON.stringify(formData)}
		if (password1 !== password2){
		setSubmitText("Sign In")
			setPasswordMatchError("password do not match");
			return ;
		}
		if (password1.length <= 7){
			setPasswordLengthError("password is to short")
			return;
		}
		fetch("https://codebase-fawn.vercel.app/api/v1/auth/register",options)
		.then((response) => {
			response.json().then((data) =>{
				if (response.ok){
					
					localStorage.setItem("activate",data.token)
					setShowActivation(true)
					setIsLoading(false)
				}
				if (response.status === 400){
					setIsLoading(false)
					let errors = {}
					if (data.email){
						errors.email = data.email[0]
					}
					if (data.github_url){
						errors.github_url = data.github_url[0]
					}
					setFormErrors(errors)
				}
			})
		})
		
	}

		
	return(
		<>
		<MyNavbar />
		<div class="div-center">
			<div class="form-container">
				<form onSubmit={useFormsubmit} method="post">
					<div class="form-group">
					<input type='email'
					placeholder= "Enter your email"
					onChange = {(e) =>{setEmail(e.target.value)}}
					class = "form-control"
					required/>
					{formErrors.email && <p style={{color:"red"}}>{formErrors.email}</p>}

					</div>

					<input type='name'
					placeholder= "Enter your fist name"
					onChange = {(e) =>{setFirstName(e.target.value)}}
					class="form-control"
					required />

					<input type='name'
					placeholder= "Enter your last name"
					onChange = {(e) =>{setLastName(e.target.value)}}
					class="form-control"
					required />

					<input type='password'
					placeholder= "Enter your Password"
					onChange = {(e) => {setPasswordMatchError("");setPassword1(e.target.value)}}
					class="form-control"
					style={{borderColor : passwordMatchError && 'red'}}
					value={password1}
					minLength="8"
					required/>

					<input type='password'
					placeholder= "confirm your Password"
					onChange = {(e) => {setPasswordMatchError("");setPassword2(e.target.value)}}
					class="form-control"
					minLength="8"
					style={{borderColor : passwordMatchError && 'red'}}
					value={password2}
					required/>
					<p style={{color:"red"}}>{passwordMatchError && 'password do not match'}</p>
					<p style={{color:"red"}}>{passwordLengthError && 'Password is to short'}</p>


					<input type='url'
					placeholder= "Enter your github account url"
					onChange = {(e) =>{setGitHub(e.target.value)}} 
					class="form-control"
					value="http://github.com/"
					/>

					{formErrors.email && <p style={{color:"red"}}>{formErrors.github_url}</p>}

					
					<button type='submit' class="btn submit-btn" style={{border:"1px solid green"}}>
					Sign Up
					</button>
					{isLoading ? <div className="loading"></div>:<div></div>}
					{showActivation && <p style={{color:"red"}}>Check Your Email for verification</p>}
					{showActivation && <p style={{color:"green",padding:"3px",border : "1px solid green",width:"60px"}} class="btn home-btn"><a href="/">Home</a></p>}


					<p>Already have an account <a href="/auth/login"> Login</a> </p>

				</form>
				<div style={{color : "gray",marginTop:"20px"}}>
				sign up to enjoy our weekly email and also contribute to our open sourceCodeBase
				</div>

			</div>

		</div>
		</>
		
		)
}