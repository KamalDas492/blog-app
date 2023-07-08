import React, { useState, useEffect } from 'react'
import "./Write.css"
import ImageInput from '../../components/ImageInput/ImageInput'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import Topbar from '../../components/TopBar/Topbar'


export default function Write() {
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [file, setFile] = useState(null)
  const [user, setUser] = useState(null)
  const navigate = useNavigate();

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
      try{
        console.log(newPost);
        const res = await axios.post("/posts", newPost);
        navigate("/posts/" + res.data._id);
      } catch(err) {
        console.log("error in posting");
      }
      
    }
  }
  return (
    <div>
    <Topbar />
    <div className='write'>
        <form className='writeForm' onSubmit={handleSubmit}>
        <ImageInput onImageChange={handleImageChange} />
            <div className='writeFormGroup'>
                <input type="text" placeholder='Title' className='writeInput' autoFocus={true} onChange={e=>setTitle(e.target.value)}></input>
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
        </form>
    </div>
    </div>
  )
}
