import React, { useEffect, useState } from 'react'
import Topbar from '../TopBar/Topbar'
import Footer from '../Footer/Footer'
import Post from '../Posts/Posts'
import axios from 'axios';
import "./CategoryPosts.css"
import { useLocation} from 'react-router-dom';



function CategoryPosts() {
    const [isLoading, setIsLoading] = useState(true);
    const [catposts, setCatPosts] = useState([]);
    const location = useLocation();
    const pathArray = location.pathname.split('/');
    const dynamicParamCat = pathArray[pathArray.length - 1];
    
    useEffect(() =>{
            const fetchMyPosts = async ()=> {
                const res = await axios.get("/posts?cat=" + dynamicParamCat)
                setCatPosts(res.data);
                console.log(res.data);
            }
            fetchMyPosts();
            setTimeout(() => {
              setIsLoading(false); // Set loading state to false to render the content
            }, 1000);
    }, [dynamicParamCat])

    return (
        <div>
            <Topbar />
            <h2 className='myPosts'>{dynamicParamCat}</h2>
           {isLoading ? <div className='loader'><div className="loading-spinner"></div></div> : <div>{ catposts.length > 0 &&<div className='Home'>
             <Post posts = {catposts}/>
            </div> }
            {catposts.length === 0 && <h1 className='no_post'>This category don't have any posts</h1>}</div>} 
            
            <Footer />
        </div>
    )
}

export default CategoryPosts