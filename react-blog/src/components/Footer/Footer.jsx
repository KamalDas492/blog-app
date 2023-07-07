import React from 'react'
import "./Footer.css"
export default function Footer() {
    var date = new Date();
    var year = date.getFullYear();
  return (
    <div className='footer'>
        <h1 className='subscribeHeader'> Subscribe to Newsletter </h1>
        <h6 className='subscribeDetails'>Get most popular posts right into your mailbox</h6>
        <div className='subscribe'>
          <input className='subscribeInput' type = "email" placeholder='Enter your email'/>
          <button type = "submit" className = "subscribeBtn">Subscribe</button>
        </div>
        <span className='footer-details'>copyright © {year}</span>
    </div>
  )
}
