import React, { useEffect, useState } from 'react'
import Topbar from '../TopBar/Topbar'
import Footer from '../Footer/Footer'
import Post from '../Posts/Posts'
import axios from 'axios';
import "./SearchPosts.css"
import { useLocation} from 'react-router-dom';



function SearchPosts() {
    const [isLoading, setIsLoading] = useState(true);
    const [searchposts, setSearchPosts] = useState([]);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const queryValue = searchParams.get('query');

    
    useEffect(() =>{
            const fetchMyPosts = async ()=> {
                const res = await axios.get("/posts?search=" + queryValue)
                setSearchPosts(res.data);
                console.log(res.data);
            }
            fetchMyPosts();
            setTimeout(() => {
              setIsLoading(false); // Set loading state to false to render the content
            }, 1000);
    }, [queryValue])

    return (
        <div>
            <Topbar />
            <h2 className='myPosts'>Posts with "{queryValue}"</h2>
           {isLoading ? <div className='loader'><div className="loading-spinner"></div></div> : <div>{ searchposts.length > 0 &&<div className='Home'>
             <Post posts = {searchposts}/>
            </div> }
            {searchposts.length === 0 && <h1 className='no_post'>This query doesn't match with any posts</h1>}</div>} 
            
            <Footer />
        </div>
    )
}

export default SearchPosts