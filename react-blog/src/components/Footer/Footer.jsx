import React, { useState } from 'react'
import "./Footer.css"
import axios from "axios" 

export default function Footer() {
    const [email, setEmail] = useState();
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      const res = await axios.post("/subscribe", {
        email: email
      })
      if(res.status === 200) {
        alert("You are subscribed");
      } else {
        alert("Something went wrong!")
      }
      
    }
    
    var date = new Date();
    var year = date.getFullYear();
  return (
    <div className='footer'>
        <h1 className='subscribeHeader'> Subscribe to Newsletter </h1>
        <h6 className='subscribeDetails'>Get most popular posts right into your mailbox</h6>
        <form className='subscribe'>
          <input className='subscribeInput' type = "email" onChange={e=>setEmail(e.target.value)} placeholder='Enter your email'/>
          <button type = "submit" onClick = {handleSubmit} className = "subscribeBtn">Subscribe</button>
        </form>
        <span className='footer-details'>copyright © {year}</span>
    </div>
  )
}
