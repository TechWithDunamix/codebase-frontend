import React from 'react'
import {useState,useEffect} from 'react'
import MyNavbar from './components/MyNavbar.jsx'
import Home from './components/home.jsx'
import Blogs from './components/blogs.jsx'
import ReadBlog from './components/readblog.jsx'
import RegisterationForm from './components/registerationForm'
import BlogPage from './components/blogpage.jsx'
import CoursePage from './components/courses.jsx'
import Topics from './components/topics.jsx'
import Topic from './components/topic.jsx'
import LoginForm from './components/login.jsx'
import ResetPasswordForm from './components/resetPassword.jsx'
import ChangePasswordForm from './components/changePassword.jsx'
import {BrowserRouter,Routes,Route,Link} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'

import './styles/bootstrap.css'
export  const context = React.createContext(null)
const App = ()=>{
  const [blogs,setBlogs] = useState(null)
  const contextData = {isAuthenticated : false,all_blogs : blogs}
  const token = localStorage.getItem("token")
  return (
    <div>
    
    <BrowserRouter>
      <context.Provider value={contextData}>
      <Routes>
        <Route  index element={<Home />} />
        <Route  path='/auth/login' element={<LoginForm />} />
        <Route  path='/auth/reset' element={<ResetPasswordForm />} />
        <Route path='/auth/register' element={<RegisterationForm />} />
        <Route  path='/auth/change/password' element={token ? <ChangePasswordForm /> : <RegisterationForm />}  />

        <Route path='/blogs' element={<BlogPage />} />
        <Route path='/blog/:id' element={<ReadBlog />} />
        <Route path='/courses' element={token ? <CoursePage /> : <RegisterationForm />} />
        <Route path='/course/:id' element={token ? <Topics /> : <RegisterationForm />} />
        <Route path='/topic/:id' element={token ? <Topic /> : <RegisterationForm />} />




        
      </Routes>
      </context.Provider>
    </BrowserRouter>
    </div>
    )
}
export default App;
