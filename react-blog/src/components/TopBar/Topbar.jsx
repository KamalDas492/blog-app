import React, { useState, useEffect } from 'react'
import axios from "axios"
import "./Topbar.css"
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate
  } from 'react-router-dom';

function Topbar() {
  const [user, setUser] = useState(null)
  const [profileImg, setProfImg] = useState("https://cdn-icons-png.flaticon.com/512/1144/1144760.png")
  const [isExpanded, setIsExpanded] = useState(false);
  const [catExpanded, setCatExpanded] = useState(false);
  const [categories, setCategories] = useState([]);
  const PF = "http://localhost:8000/Images/"
  const navigate = useNavigate();
  const toggleList = () => {
    setIsExpanded(!isExpanded);
  };
  const toggleCatList = async() => {
    
    if(!catExpanded) {
      try{
        const res = await axios.get("/category");
        
        const catData = res.data;
        let catArray = []
        for (let i = 0; i < catData.length; i++) {
          const name = catData[i].name;
          catArray.push(name);
        }
        setCategories(catArray);
      } catch(err) {
        console.log(err);
      }
    } else {
      setCategories([]);
    }
    setCatExpanded(!catExpanded);
    
  }
  const handleLogout = async(e) => {
    setUser(null);
    const res = await axios.post("/auth/logout");
    navigate("/login");
  };
  
  useEffect(() =>{
    const fetchUser = async ()=> {
      //console.log("request");
      const res = await axios.get("/user/user_info")
      
      if(res.status === 200) {
        setUser(res.data.user)
        //console.log(res.data.user);
        
      }
    }
    fetchUser();
  },[])
  useEffect(() => {
    if (user && user.profilePic !== "") {
      setProfImg(PF + user.profilePic);
    }
  }, [user]);
  

    return (
        <div className='navcontainer'>
      <div className='wrapper-css'>
      <div className='leftarea'>
        <i className="topIcon fa-brands fa-facebook"></i>
        <i className="topIcon fa-brands fa-twitter"></i>
        <i className="topIcon fa-brands fa-instagram"></i>
        <i className="topIcon fa-brands fa-whatsapp"></i>
      </div>
      
      <div className='centerarea'>
          <Link to = "/" className="link-style"><div>Home</div></Link>
          <div onClick = {toggleCatList}>Categories
          {catExpanded && (
          <div className="dropdown-menu">
          <ul>
            {categories.map((item, index) => (
              <li key={index}><Link to={`/category/${item}`} className='link-style'>{item}</Link></li>
          ))}
            
          </ul> 
          </div>
          )}</div>
          <Link to = "/write" className="link-style"><div>Write</div></Link>
          <div>Contact</div>
      </div>
      
      <div className='account-area'>
        {user && 
          (<div className='account'>
            <span><i className="acc-icons fa fa-user-o" aria-hidden="true"></i>
            </span>
            <img className="topImg" onClick={toggleList} src = {profileImg} alt="Profile"/>
            {isExpanded && (
          <div className="dropdown-menu">
          <ul>
            <li key = "0"><Link to={`/settings/${user._id}`} className='link-style'> Settings</Link></li>
            <li key = "1"><Link to={`/myposts`} className='link-style'>My Posts</Link></li>
            <li key = "2" onClick={handleLogout}>Logout</li>
          </ul> 
          </div>
          )}
          </div>  
          )
        }  
        {!user && <Link to = "/login" className="link-style"><span className = "loginbtn">Login</span></Link>}
      </div>
      
      <div className='rightarea'>
        <div className = 'searchbox'>
          <input className = "searchinput" type = "text" placeholder='Search articles' ></input>
          <span className='searchbtn'>
          <i className="fa fa-search" aria-hidden="true"></i>
          </span>
        </div>
        </div>
        
        

      </div>
      <div className='right-mobile'>
        <div className = 'searchbox'>
          <input className = "searchinput" type = "text" placeholder='Search articles' />
          <span className='searchbtn'>
          <i className="fa fa-search" aria-hidden="true"></i>
          </span>
        </div>
        </div>
    </div>
    )
}

export default Topbar;