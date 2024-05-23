import '../styles/bootstrap.css'
import '../styles/course.css'

export default function Course({course}){
	console.log(course)
	return (

			<div class="col-md-3 course-card">
					<img src={course.image} class="img-fluid" />
					<h1>{course.name}</h1>
					<p>{course.description}</p>
					<a class="btn" href={`course/${course.id}`}>Learn More </a>

			</div>
		)
}