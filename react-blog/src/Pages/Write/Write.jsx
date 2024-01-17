import React, { useState, useEffect } from 'react'
import "./Write.css"
import ImageInput from '../../components/ImageInput/ImageInput'
import axios from "axios"
import { useLocation, useNavigate } from 'react-router-dom'
import Topbar from '../../components/TopBar/Topbar'


export default function Write(props) {
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [file, setFile] = useState(null)
  const [cat, setCategory] = useState(null)
  const [user, setUser] = useState(null)
  const navigate = useNavigate();
  const postPath = useLocation();
  const postId = postPath.pathname.split("/")[2];
  const [postDetails, setPostDetails] = useState({});
  const {obj} = props;

  useEffect(() =>{
    const fetchUser = async ()=> {
      try {
            const res = await axios.get("/user/user_info");
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
    if(obj === "editPost") {
      const getPostDetail = async ()=> {
        const res = await axios.get("/posts/" + postId);
        if(res.status === 200){
          setPostDetails(res.data);
          setTitle(res.data.title);
          setCategory(res.data.category);
          setDesc(res.data.description);
        }
         
      }
      getPostDetail();
    }
    
  }, [postId, obj])
  
  const handleImageChange = (image) => {
    setFile(image);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!user) {
      navigate("/login")
    } else {
      const newPost = {
        username: user.username,
        title: title,
        description: desc
      }
      if(cat) {
        newPost.category = cat.toLowerCase();
        try {
          const resp = await axios.post("/category", {
            name: cat.toLowerCase()
          })
          console.log(resp);
        } catch (err) {
          console.log(err);
        }
      }
      if(file) {
        const data = new FormData();
        var file_name = file.name;
        if(file_name.length >= 50) {
          file_name = "_custom_image_name"
        }
        const filename = Date.now() + '-' + Math.round(Math.random() * 1E9) + file_name;
        data.append("name", filename);
        data.append("img", file);
        
        newPost.photo = filename;
        try {
          await axios.post("/upload", data)
        } catch (err) {
          console.log("error in uploading image");
        }
      }
      if(obj === "newPost") {
        try{
          const res = await axios.post("/posts", newPost);
          navigate("/posts/" + res.data._id);
        } catch(err) {
          console.log("error in posting");
        }
      } else {
        try{
          const resp = await axios.put("/posts/" + postId, newPost);
          if(resp.status === 200)
           navigate("/posts/" + postId);
        } catch(err) {
          console.log("error in updating");
        }
      }
        
      } 
    }
  return (
    <div>
    <Topbar />
    <div className='write'>
    
        <form className='writeForm' onSubmit={handleSubmit}>
        <ImageInput onImageChange={handleImageChange} />
        {obj === "newPost" &&
          <div>
            <div className='writeFormGroup'>
                <input type="text" placeholder='Title' className='writeInput' autoFocus={true} onChange={e=>setTitle(e.target.value)}></input>
                <input type="text" placeholder='Category' className='writeInput' onChange={e=>setCategory(e.target.value)}></input>
            </div>
            <div className='writeFormGroup'>
              <textarea 
                placeholder='Tell your story..'
                className='writeInput writeText'
                type="text"
                onChange={e=>setDesc(e.target.value)}
              ></textarea>
            </div>
            <button type = "submit" className = "writeSubmit">Publish</button>
            </div> 
        }
        {obj === "editPost" && 
        <div>
            <div className='writeFormGroup'>
                <input type="text" placeholder='Title' defaultValue = {postDetails.title} className='writeInput' autoFocus={true} onChange={e=>setTitle(e.target.value)}></input>
                <input type="text" placeholder='Category' defaultValue = {postDetails.category} className='writeInput' onChange={e=>setCategory(e.target.value)}></input>
            </div>
            <div className='writeFormGroup'>
              <textarea 
                placeholder='Tell your story..'
                className='writeInput writeText'
                type="text"
                defaultValue = {postDetails.description}
                onChange={e=>setDesc(e.target.value)}
              ></textarea>
            </div>
            <button type = "submit" className = "writeSubmit">Publish</button>
            </div> 
        }
        </form>
    </div>
    </div>
  )
}
