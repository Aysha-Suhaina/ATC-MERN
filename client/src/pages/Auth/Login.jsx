
import { useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import "./Login.css"
import { useNavigate } from 'react-router-dom';
import {assets} from "../../assets/assets"
import {toast} from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [showPassword, setShowPassword]= useState(false);

  const handleSubmit= async (e)=>{
    e.preventDefault();
    try{ 
      if(!email || !password){
        toast.warning("Please fill all fields");
        return;
      }
      const res=await axios.post("http://localhost:4000/api/auth/login",{email,password},{withCredentials: true}); 
      if(res.data.success === false){
        toast.error(res.data.msg);
      }
      else{
        toast.success(res.data.msg);
      }
      if(res.data.success==true){
        //localStorage.setItem("user", JSON.stringify(res.data));
        localStorage.setItem("userId",JSON.stringify(res.data.userId))  ;
        //console.log("userId:",localStorage.getItem("userId"));
        // const userId = localStorage.getItem("userId");
      // console.log("RAW:", userId);
      // console.log("TYPE:", typeof userId);
      navigate("/dashboard");
      }
      //localStorage.setItem("userId", student._id);
        
    }catch(err){
      console.log(err.message);
      toast.error("login failed ");
    }
  }
  return (
    // this login component 
    // //should have username,pass - ip fields
    //login button with forget password link 
    //register text
    <div className="login">
      <form onSubmit={handleSubmit} className="loginForm"> 
        <input type="email" name="email" value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} />

        <div className="password-container">
          <input className="password-input" type={showPassword ? "text" : "password"} name="password" value={password} 
          placeholder='Password' onChange={ (e)=>setPassword(e.target.value)}  />
          <img className="eye-icon" src={showPassword ? assets.eye_open : assets.eye_close } onClick={() => setShowPassword(!showPassword) } />
        </div>
        

        <Link to="/reset-password">Forgot password?</Link>

        <button type="submit">Login</button>
        <p>Don't have and account? <Link to="/register">Sign Up </Link></p>
      </form>
        
      </div>
  )
}

export default Login


