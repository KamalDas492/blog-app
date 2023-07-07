import React from 'react'
import "./Sidebar.css"

export default function Sidebar() {
  return (
    <div className = "sidebar">
        <div className = "sidebarItem">
            <span className = "sidebarTitle">ABOUT ME</span>
            <img 
                className = "AboutImg"
                src = "https://m.cricbuzz.com/a/img/v1/192x192/i1/c244980/virat-kohli.jpg"
                alt = "Profile"
            />
            <p>
            Lorem ipsum dolor sit amet, consectetur
             adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
        </div>
        <div className = "sidebarItem">
            <span className = "sidebarTitle">CATEGORIES</span>
            <ul className='sidebarList'>
                <li className = "sidebarListItem"> Food </li>
                <li className = "sidebarListItem"> Travel</li>
                <li className = "sidebarListItem"> Sports</li>
                <li className = "sidebarListItem"> Movies</li>
                <li className = "sidebarListItem"> Lifestyle</li>
                <li className = "sidebarListItem"> Fashion</li>
                <li className = "sidebarListItem"> Tech</li>
                <li className = "sidebarListItem"> Health</li>
            </ul>
        </div>
        <div className = "sidebarItem">
            <span className = "sidebarTitle">FOLLOW US</span>
            <div className='sidebarSocial'>
                <i className="sidebarIcon fa-brands fa-facebook"></i>
                <i className="sidebarIcon fa-brands fa-twitter"></i>
                <i className="sidebarIcon fa-brands fa-instagram"></i>
                <i className="sidebarIcon fa-brands fa-whatsapp"></i>
            </div>
        </div>
    </div>
  )
}
