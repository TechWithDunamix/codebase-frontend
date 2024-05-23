import '../styles/form.css'
import {useState,useEffect} from 'react'
import '../styles/bootstrap.css'
import MyNavbar from './MyNavbar.jsx'
import {Redirect} from 'react-router-dom'

export default function ChangePasswordForm(){
	// const [email,setEmail] = useState()
	const [password1,setPassword1] = useState()
	const [password2,setPassword2] = useState()

	const [isValid,setIsValid] = useState(false)
	const [submitButton,setSubmitButton] = useState(false)
	const [isLoading,setIsLoading] = useState(false)
	const [formErrors,setFormErrors] = useState({})
	


	function useFormsubmit(e){
		e.preventDefault()
		setIsLoading(true)
		// console.log('submited')
		const formData = {"password":password2 }
		const token = localStorage.getItem("token")
		const options = {method :'POST',headers:{"Content-Type":"application/json","Authorization":`Token ${token}`},
		body:JSON.stringify(formData)}
		if (password1 != password2){
			setFormErrors({...formErrors,"password":"Password do not match"})
			setIsLoading(false)
			return ;
		}
		fetch("http://127.0.0.1:8000/api/v1/auth/user/change_password",options)
		.then((response) => {
			response.json().then((data) =>{
				if (response.ok){
					
					window.location.href = '/'
				}
				
				if (response.status === 400){
					setFormErrors({...formErrors,"password":"Incorrect Password"})
					setIsLoading(false)
					console.log(data)
					// setFormErrors(errors)
				}
				if (response.status === 401){
					alert("An error occured")
					// throw new Error("401") 
					return;
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
					<input type='password'
					placeholder= "Enter your Password"
					onChange = {(e) =>{setFormErrors({});setPassword1(e.target.value)}}
					class = "form-control"
					required/>
					{formErrors.password && <p style={{color:"red"}}>{formErrors.password}</p>}

					</div>

					

					<input type='password'
					placeholder= "confirm your Password"
					onChange = {(e) => {setFormErrors({});setPassword2(e.target.value)}}
					class="form-control"
					// minLength="8"
					required/>
					{/*<p style={{color:"red"}}>{passwordMatchError && 'password do not match'}</p>*/}
					{/*<p style={{color:"red"}}>{passwordLengthError && 'Password is to short'}</p>*/}


					

					
					<button type='submit' class="btn submit-btn mb-5" style={{color:"green",border : "1px solid green"}}>
					Change Password
					</button>
					
					{isLoading ? <div className="loading"></div>:<div></div>}

					
				</form>
			

			</div>

		</div>
		</>
		
		)
}