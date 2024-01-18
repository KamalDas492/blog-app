import React, { useEffect, useState } from 'react'
import "./singlePost.css"
import { useLocation, Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import Topbar from '../TopBar/Topbar';
import backend_url from '../../Url';

export default function SinglePost() {
  const postPath = useLocation();
  const id = postPath.pathname.split("/")[2];
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState({});
  const [user, setUser] = useState(null)
  const navigate = useNavigate();

  useEffect(() =>{
    const fetchUser = async ()=> {
      const res = await axios.get("/user/user_info")
      if(res.status === 200) {
        setUser(res.data.user)
      }
    }
    fetchUser();
  },[])

  useEffect(() =>{
    const getPost = async ()=> {
      try {
      const res = await axios.get("/posts/" + id);
      if(res.status === 200) {
        setPost(res.data);
      } 
    } catch(err) {
      console.log(err);
      navigate("/PageNotFound");
    }
      
    }
    getPost();
    setTimeout(() => {
      setIsLoading(false); 
    }, 1000);
  }, [id, navigate])

  const handleDelete = async (e) => {
    if(!user) {
      navigate("/login")
    } else {
      try{
        const res = await axios.delete("/posts/" +  post._id);
        if(res.status === 200)
         navigate("/myposts");
      } catch(err) {
        console.log("error in deleting");
      }
      
    }
  }

  const linkStyle = {
    textDecoration: 'none',
    color: 'inherit',
  };
  const PF = backend_url + "/Images/"
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
            {user && post.username === user.username && 
            <div className='singlePostEdit'>
            <Link  to={`/editpost/${post._id}`} style={linkStyle}><i className = "singlePostIcon fa-solid fa-pen-to-square"></i></Link>
              <i className="singlePostIcon fa-solid fa-trash" onClick={handleDelete}></i>
            </div>
            }
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
