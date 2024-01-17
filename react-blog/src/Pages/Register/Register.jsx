import React, { useState} from 'react'
import "./Register.css"
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/register", {
        username,
        email,
        password
      })
      if(res.data === "Username not available" || res.data === "Email already registered") {
        
        setError(res.data);
          
      } else if(res.data === "Success"){
          
          //login({username: username});
          console.log("register success");
          navigate('/');
          setError("");
      };
    } catch(err) {
      setError("Something went wrong");
      console.log(err);
    }
    
  }

  return (
    <div className = "login">
    {error && <div className='errorStatement'>{error}</div>}
    <div><img src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png" alt="profile" className="LoginProfile" /></div>
    <form action="" className="LoginForm" onSubmit={handleSubmit}>
      <h4>USER REGISTRATION</h4>
      <input type="text" className="LoginInput" placeholder="Username"  autoFocus = {true}  onChange={e=>setUsername(e.target.value)}/>
      
      <input type="email" className="LoginInput" placeholder="Email"  onChange={e=>setEmail(e.target.value)}/>
      
      <input type="password" className="LoginInput" placeholder="Password" onChange={e=>setPassword(e.target.value)}/>
      <input type="submit" value="Register" className="LoginSubmit"/>
      <h5 className = "LoginForgot"><Link to={`/login`} className='link-style'>Login here</Link></h5>
    </form>
    </div>
  )
}
