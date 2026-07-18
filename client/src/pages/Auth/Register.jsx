import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import Button from "../../components/ui/Button";
import FormCard from "../../components/ui/FormCard";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !confirmPassword
    ) {
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
      const res = await axios.post(
        "http://localhost:4000/api/auth/register",
        formData,
      );
      toast.success(res.data.msg);
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error("Registration failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="register">
      <div className="registerContainer">
        <div className="registerLeft">
          <FormCard
            title="Create Account"
            subtitle="Register to access the HRMS portal."
          >
            <form onSubmit={handleSubmit} className="registerForm">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />

              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              {confirmPassword && (
                <p
                  className={
                    formData.password === confirmPassword
                      ? "password-match"
                      : "password-mismatch"
                  }
                >
                  {formData.password === confirmPassword
                    ? "✓ Passwords match"
                    : "✕ Passwords do not match"}
                </p>
              )}

              <Button type="submit" disabled={loading}>
                {loading ? "Creating Account..." : "Register"}
              </Button>

              <p className="register-footer">
                Already have an account? <Link to="/">Login</Link>
              </p>
            </form>
          </FormCard>
        </div>

        <div className="registerRight">
          <img src={assets.school_bg} alt="School" />
        </div>
      </div>
    </div>
  );
};

export default Register;
