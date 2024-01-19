import React, { useEffect, useState } from 'react'
import Topbar from '../TopBar/Topbar'
import Footer from '../Footer/Footer'
import Post from '../Posts/Posts'
import axios from 'axios';
import "./MyPosts.css"
import { useNavigate } from 'react-router-dom';
import {backend_url, frontend_url} from "../../Url"


function MyPosts() {
    const [isLoading, setIsLoading] = useState(true);
    const [myposts, setMyPosts] = useState([]);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    useEffect(() =>{
      const fetchUser = async ()=> {
        try {
          const res = await axios.get(backend_url + "/blog/user/user_info");
          if (res.status === 200) {
            setUser(res.data.user);
          } else {
            navigate("/login");
          }
        } catch (err) {
          console.error("Error while fetching user:", err);
          navigate("/login");
        }
      }
      fetchUser();
    },[navigate])
    
    useEffect(() =>{
            const fetchMyPosts = async ()=> {
              try {
                const res = await axios.get(backend_url + "/blog/posts?user=" + user.username)
                setMyPosts(res.data);
                console.log(res.data);
              } catch(err) {
                console.log("Error in retrieving My posts...", err);
              }
            }
            fetchMyPosts();
            setTimeout(() => {
              setIsLoading(false); // Set loading state to false to render the content
            }, 1000);
    }, [user])

    return (
        <div>
            <Topbar />
            <h2 className='myPosts'>My Posts</h2>
           {isLoading ? <div className='loader'><div className="loading-spinner"></div></div> : <div>{ myposts.length > 0 &&<div className='Home'>
             <Post posts = {myposts}/>
            </div> }
            {myposts.length === 0 && <h1 className='no_post'>You don't have any posts</h1>}</div>} 
            
            <Footer />
        </div>
    )
}

export default MyPosts