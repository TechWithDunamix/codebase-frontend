import './navbar.css'
import {useContext} from 'react'
import {context} from '../App.js'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
export default function MyNavbar(){
    const contextData = useContext(context)
    const user = localStorage.getItem("token")
    return (
    <>
    <Navbar bg="light" expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand href="#home" className="text-success">CodeBase<small style={{fontSize:"0.9rem",color:"black"}}>By Dunamix</small></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/" className="text-success">Home</Nav.Link>
            <Nav.Link href="/courses" className="text-success">Courses</Nav.Link>

            <Nav.Link href="/blogs" className="text-success">Articles</Nav.Link>
            {!user && <Nav.Link href="/auth/register" className="text-success">Join</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
    )
}