import React, { useState , useEffect} from 'react';
import "./Settings.css"
import Topbar from "../../components/TopBar/Topbar"
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';


export default function Settings() {
 
      const [image, setImage] = useState(null);
      const [imageSrc, setImageSrc] = useState("");
      const [isImgVisible, setImgVisibility] = useState(false);
      const [iconVisible, setIconVis] = useState(true);
      const [bio, setBio] = useState('');
      const [about, setAbout] = useState('');
      const [user, setUser] = useState(null);

      const navigate = useNavigate();
      const location = useLocation();
      const pathArray = location.pathname.split('/');
      const dynamicParam = pathArray[pathArray.length - 1];

      useEffect(() =>{
        const fetchUser = async ()=> {
          try {
            const res = await axios.get("/user/user_info");
            if (res.status === 200) {
              if(res.data.user._id !== dynamicParam) {
                navigate(`/settings/${res.data.user._id}`);
              }
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
      },[dynamicParam, navigate])

      const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
    
        reader.onload = () => {
          setImgVisibility(true);
          setIconVis(false);
          setImage(file);
          setImageSrc(URL.createObjectURL(file))
        };
    
        if (file) {
          reader.readAsDataURL(file);
        }
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        if(!user) {
          navigate("/login")
        } else {
          var updateUser = {
            userId: user._id,
            bio: bio,
            about: about
          }
          if(image) {
            const data = new FormData();
            var file_name = image.name;
            if(file_name.length >= 50) {
              file_name = "_custom_prfile_img"
            }
            const filename = Date.now() + '-' + user.username + file_name;
            data.append("name", filename);
            data.append("img", image);
            
            updateUser.photo = filename;
            try {
              await axios.post("/upload", data)
            } catch (err) {
              console.log("error in uploading image");
            }
          }
          
          try{
            await axios.put("/user/" +  dynamicParam, updateUser);
            navigate("/");
          } catch(err) {
            console.log("error in updating");
          }
          
        }
      }
      
      const handleDelete = async (e) => {
        if(!user) {
          navigate("/login")
        } else {
          try{
            //console.log(user._id);
            const res = await axios.delete("/user/" +  dynamicParam);
            if(res.status === 200)
             navigate("/register");
          } catch(err) {
            console.log("error in deleting");
          }
          
        }
      }
  return (
    <div>
    <Topbar />
    <div className='settings'>
        <form className='settingsForm' onSubmit={handleSubmit}>
        <div className='settingsPP'>
                    
          <div className="image-container">
            {iconVisible && <i className="settingsPImg fa-regular fa-circle-user"></i>}
            {isImgVisible && <img src={imageSrc} alt="Uploaded"/>}  
          </div>
          <label htmlFor='FileInput'>
               Add image
          </label>
          <input type="file" id = "FileInput" onChange={handleImageUpload}></input>
        </div>
          <div className='settingsFormGroup'>
                <input type="text" placeholder='Add Bio' className='settingsInput' autoFocus={true} onChange={e=>setBio(e.target.value)}></input>
          </div>
          <div className='settingsFormGroup'>
              <textarea 
                placeholder='Tell about yourself'
                className='settingsInput settingsText'
                type="text"
                onChange={e=>setAbout(e.target.value)}
              ></textarea>
            </div>
            <button type = "submit" className = "settingsSubmit">Save</button>
        </form>
        <div className='delete-div' onClick={handleDelete}>Delete account</div>
    </div>
    
    </div>
  )
}
