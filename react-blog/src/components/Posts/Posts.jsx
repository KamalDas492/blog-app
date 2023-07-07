import React from 'react'
import Post from '../Post/Post'
import "./Posts.css"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

export default function Posts(props) {
  const { posts } = props;
  
  return (
    <div className='posts'>
      {posts.map((p) => (
        <Post post = {p} />
      ))}
      
    </div>
  )
}
