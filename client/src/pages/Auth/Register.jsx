import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import {assets} from '../../assets/assets'
import {toast} from 'react-toastify';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }
  const handleSubmit = async (e) =>{
    e.preventDefault();
    if(!formData.name || !formData.email || !formData.password || !confirmPassword){
      toast.warning("Please fill all fields");
      return;
    }
    e.preventDefault();
    if (formData.password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      setLoading(true);
      // console.log(formData);
      const res = await axios.post("http://localhost:4000/api/auth/register",formData);
      toast.success(res.data.msg);
      navigate("/");
    }catch (err) {
      console.log(err);
      toast.error("Registration failed");
    }
    finally {
    setLoading(false); 
  }
  };
  return (
    <div className="register">
      <div className="registerContainer">
        <div className="registerLeft">
          <h2>Create Account</h2>
          <form onSubmit={handleSubmit} className="registerForm">

            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange}/>
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange}/>
            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            {confirmPassword && (
              formData.password === confirmPassword
                ? <p style={{ color: "green" }}>Passwords match</p>
                : <p style={{ color: "red" }}>Passwords do not match</p>
            )}

            <button type="submit" disabled={loading} >{loading ? "Loading..." : "Register"}</button>
            {/* disabled={formData.password !== confirmPassword} */}

            <p>Already have an account? <Link to="/">Login</Link> </p>
          </form>
        </div>
        <div className="registerRight">
          <img src={assets.school_bg} alt="illustration" />
        </div>
      </div>
    </div>
  );
};

export default Register;