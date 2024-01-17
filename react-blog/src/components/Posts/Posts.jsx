import React from 'react'
import Post from '../Post/Post'
import "./Posts.css"

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
