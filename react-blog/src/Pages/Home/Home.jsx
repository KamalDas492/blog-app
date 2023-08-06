import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import Post from '../../components/Posts/Posts'
import "./Home.css"
import axios from "axios"
import Footer from "../../components/Footer/Footer";
import Topbar from '../../components/TopBar/Topbar'



export default function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() =>{
    const fetchPosts = async ()=> {
      const res = await axios.get("/posts")
      setPosts(res.data);
    }
    fetchPosts();
    setTimeout(() => {
      setIsLoading(false); // Set loading state to false to render the content
    }, 500);
  }, [])
  
  return (
    <div>
    <Topbar />
      <Header />
      <div className='Home'>
      {isLoading ? <div className='loader'><div className="loading-spinner"></div></div> :
        <Post posts = {posts}/>}
      </div>
      <Footer /> 
    </div>
       
  )
}
