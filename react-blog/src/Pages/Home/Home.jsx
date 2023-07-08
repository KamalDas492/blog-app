import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import Post from '../../components/Posts/Posts'
import "./Home.css"
import axios from "axios"
import { useLocation } from 'react-router-dom'
import Footer from "../../components/Footer/Footer";
import Topbar from '../../components/TopBar/Topbar'



export default function Home() {
  const [posts, setPosts] = useState([]);
  const {search} = useLocation();
  
  useEffect(() =>{
    const fetchPosts = async ()=> {
      const res = await axios.get("/posts" + search)
      setPosts(res.data);
    }
    fetchPosts();
  }, [search])
  return (
    <div>
    <Topbar />
      <Header />
      <div className='Home'>
      
        <Post posts = {posts}/>
      </div>
      <Footer /> 
    </div>
       
  )
}
