import React, { useEffect, useState } from 'react'
import "./singlePost.css"
import { useLocation, Link } from 'react-router-dom'
import axios from "axios"
export default function SinglePost() {
  const postPath = useLocation();
  const id = postPath.pathname.split("/")[2];

  const [post, setPost] = useState({});

  useEffect(() =>{
    const getPost = async ()=> {
      const res = await axios.get("/posts/" + id);
      setPost(res.data);
    }
    getPost();
  }, [id])

  const linkStyle = {
    textDecoration: 'none',
    color: 'inherit',
  };
  return (
    <div className='singlePost'>
      <div className='singlePostWrapper'>
        {post.photo && 
          <img
            className='singlePostImg'
            src = {post.photo}
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
      </div>
    </div>
  )
}
