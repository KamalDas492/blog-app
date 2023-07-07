import React, { useState } from 'react';
import "./Settings.css"
import Sidebar from "../../components/Sidebar/Sidebar"
export default function Settings() {

      const [imageSrc, setImageSrc] = useState('');
      const [isImgVisible, setImgVisibility] = useState(false);
      const [iconVisible, setIconVis] = useState(true);

      const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
    
        reader.onload = () => {
          setImgVisibility(true);
          setIconVis(false);
          setImageSrc(reader.result);
        };
    
        if (file) {
          reader.readAsDataURL(file);
        }
      };

  return (
    <div className='settings'>
        <div className='settingsWrapper'>
            <div className='settingsTitle'>
                <div className='settingsTitleDelete'>Delete account</div>
            </div>
            <form className='settingsForm'>
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
                <input type = "text" placeholder='Username' autoFocus = {true}></input>
                <input type = "email" placeholder='Email'></input>
                <input type = "password" placeholder='Password'></input>
                <button className='settingsSubmit' type = "submit">Update</button>
            </form>
        </div>
        
    </div>
  )
}
