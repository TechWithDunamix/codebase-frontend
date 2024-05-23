import React from 'react'
//import {useState} from 'react'
import MyNavbar from './MyNavbar.jsx'
import Hero from './hero.jsx'
import Blogs from './blogs.jsx'
import '../styles/home.css'
import '../styles/bootstrap.css'
import {useContext} from 'react'
import {context} from '../App.js'
const Home = ()=>{
    const homeStyles = {
        blogHeader:{
            color : "#2b2323d5",
            textAlign : "center",
            fontFamily : "Arial, Helvetica, sans-serif",
            fontWeight : "bolder"
        }
    };
    const data = useContext(context)
  return (
    <div class="">
        <MyNavbar />
        <Hero />
        <div class="row body mt-5 justify-content-center align-content-center">
            <div class="col-md-5 mr-4 colab-div" >
                <p id="heading">Collaborate</p>
                <p>At CodeBase, we belive in the power
                of teamwork and collaboration. Here , it's
                not about code; it about people coming
                together, sharing their passions and creating ,
                submtin amazing. Join our community where where
                you are not just a developer but a valued member,
                of a supportive creeative family. Lets build, learn
                and grow together, because together we can achieve so much more.
                </p>

            </div>

             <div class="col-md-5 mr-4 creativity-div" >
                <p id="heading">Creativity</p>
                <p>
                At CodeBase, we're all 
                about fostering creativity 
                and innovation. Here, it's 
                not just about technology; 
                it's about individuals coming 
                together, sharing their unique 
                perspectives, and bringing ideas to life. Join our community where you're not just a participant, but a cherished member of a dynamic and supportive network. Let's explore, inspire, and elevate together, because together,
                 we can unlock endless possibilities.
                </p>
                

            </div>
        </div>
        {data.all_blogs ? <Blogs blogs = {data.all_blogs}/> : <p>Loading blogs</p>}
    </div>
    )
}
export default Home;
