import { useState } from "react";
import axios from "axios";
import { useSocket } from "../../context/SocketContext";
import { Link, useNavigate, Navigate } from "react-router-dom";
import "./Login.css";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import Button from "../../components/ui/Button";
import FormCard from "../../components/ui/FormCard";

const Login = () => {
  const { connectSocket } = useSocket();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const role = localStorage.getItem("userRole")?.toLowerCase();

  if (role === "admin") {
    return <Navigate to="/admin-dashboard" replace />;
  }

  if (role === "manager") {
    return <Navigate to="/manager-dashboard" replace />;
  }

  if (role === "employee") {
    return <Navigate to="/employee-dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        toast.warning("Please fill all fields");
        return;
      }
      const res = await axios.post(
        "http://localhost:4000/api/auth/login",
        { email, password },
        { withCredentials: true },
      );

      if (res.data.success === false) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);

        toast.info(
          "Security Reminder: You are signed in. Always use Logout before leaving this device. Closing the browser or pressing Back does not log you out.",
          {
            autoClose: 7000,
          },
        );
      }
      if (res.data.success == true) {
        //localStorage.setItem("user", JSON.stringify(res.data));
        const role = res.data.userRole?.toLowerCase();

        localStorage.setItem("userId", res.data.userId);
        localStorage.setItem("userRole", role);
        // The cookie set by /login authenticates the handshake. The provider
        // already listens for presence updates, then starts the connection.
        connectSocket();

        // console.log("RAW:", userId);
        // console.log("TYPE:", typeof userId);

        if (role === "admin") {
          navigate("/admin-dashboard", { replace: true });
        }

        if (role === "manager") {
          navigate("/manager-dashboard", { replace: true });
        }

        if (role === "employee") {
          navigate("/employee-dashboard", { replace: true });
        }
      }
      //localStorage.setItem("userId", userId._id);
    } catch (err) {
      console.log(err.message);
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className="login">
      <FormCard
        title="Welcome Back"
        subtitle="Sign in to access your HRMS portal."
      >
        <form onSubmit={handleSubmit} className="loginForm">
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="password-container">
            <input
              className="password-input"
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <img
              className="eye-icon"
              src={showPassword ? assets.eye_open : assets.eye_close}
              alt={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          <Link to="/reset-password" className="forgot-link">
            Forgot Password?
          </Link>
          <div className="form-actions">
            <Button type="submit">Login</Button>
          </div>

          <p className="login-footer">
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
        </form>
      </FormCard>
    </div>
  );
};

export default Login;
