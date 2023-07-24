import React, { useEffect, useState } from 'react'
import "./singlePost.css"
import { useLocation, Link } from 'react-router-dom'
import axios from "axios"
import Topbar from '../TopBar/Topbar';

export default function SinglePost() {
  const postPath = useLocation();
  const id = postPath.pathname.split("/")[2];
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState({});

  useEffect(() =>{
    const getPost = async ()=> {
      const res = await axios.get("/posts/" + id);
      setPost(res.data);
    }
    getPost();
    setTimeout(() => {
      setIsLoading(false); // Set loading state to false to render the content
    }, 600);
  }, [id])

  const linkStyle = {
    textDecoration: 'none',
    color: 'inherit',
  };
  const PF = "http://localhost:8000/Images/"
  return (
    <div className='Single-Post'>
      <Topbar />
    
    <div className='singlePost'>
    {isLoading ? <div className='loader-singlepost'><div className="loading-spinner"></div></div> :
      <div className='singlePostWrapper'>
        {post.photo && 
          <img
            className='singlePostImg'
            src = {PF + post.photo}
            alt = "postImg"
          />
        }
          
          <h1 className='singlePostTitle'>
            {post.title}
            <div className='singlePostEdit'>
              <i className = "singlePostIcon fa-solid fa-pen-to-square"></i>
              <i className="singlePostIcon fa-solid fa-trash"></i>
            </div>
          </h1>
          <div className='singlePostInfo'>
            <span className = "singlePostAuthor">Author: <Link  to={`/?user=${post.username}`} style={linkStyle}><b>{post.username}</b> </Link></span>
            <span className = "singlePostDate">{new Date(post.createdAt).toDateString()}</span>
          </div>
          <p className='PostDesc'>
          {post.description}
          </p>
      </div>}
    </div>
    </div>
  )
}
