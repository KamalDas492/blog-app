
import React, { useState} from 'react'
import "./Login.css"
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", {
        identifier,
        password
      })
      if(res.data === "Wrong credentials") {
        
        setError(res.data);
          
      } else if(res.data === "Success"){
          
          //login({username: username});
          console.log("login success");
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
      <h4>USER LOGIN</h4>
      
      <input type="text" className="LoginInput" placeholder="Username or Email" name="Identifier" autoFocus = {true} onChange={e=>setIdentifier(e.target.value)}/>
      
      <input type="password" className="LoginInput" placeholder="Password" onChange={e=>setPassword(e.target.value)}/>
      <input type="submit" value="Log in" className="LoginSubmit"/>
      <h5 className = "LoginForgot">Forgot password?</h5>
      <h5 className = "LoginForgot"><Link to={`/register`} className='link-style'>Register</Link></h5>
    </form>
    </div>
  )
}
