import React from 'react'
import styles from './index.css'
class Header extends React.Component{
	render(){
		return (

			<div>
			<h1> Header </h1>
			</div>
			)
	}
}

const Users = (props) =>{
	return (
		<div >

		
		<table className='table'>
			<tr className='table-row'>
				<td>Name</td>
				<td> Age </td>
			</tr>
			{props.users.map((user)=>{
				return (
					<tr>
						<td>{user.name}</td>
						<td>{user.age}</td>
					</tr>
					)
			})}
		</table>
		</div>
		)
}

export default Users