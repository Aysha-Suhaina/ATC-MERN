import { useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import "./ResetPassword.css";
import {toast} from "react-toastify";

function ForgetPassword() {
  const navigate =useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

const sendOtp = async () => {
  if (!email) {
    toast.warning("Please enter your email");
    return;
  }

  try {
    setLoading(true);
    const res = await axios.post(
      "http://localhost:4000/api/auth/send-reset-otp",
      { email }
    );

    toast.success(res.data.msg || "OTP sent");
    setStep(2);
  } catch (err) {
    toast.error(err.response?.data?.msg || "Error sending OTP");
  }finally {
    setLoading(false);
  }
};

  const resetPassword = async () => {
    try {
      await axios.post("http://localhost:4000/api/auth/reset-password", {
        email,
        otp,
        newPassword
      });
      toast.success("Password reset successful");
      navigate("/")
    } catch (err) {
      toast.error("Error resetting password", err.message);
    }
  };

  return (
    <div className="container">

      <h2>Forget Password</h2>

      {step === 1 && (
        <div>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={sendOtp} disabled={loading}>{loading ? "Sending..." : "Send OTP"}</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
          <button onClick={resetPassword}>Reset Password</button> 
        </div>
      )}
    </div>
  );
}

export default ForgetPassword;
