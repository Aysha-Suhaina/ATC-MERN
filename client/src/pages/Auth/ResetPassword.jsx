import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ResetPassword.css";
import { toast } from "react-toastify";
import Button from "../../components/ui/Button";
import FormCard from "../../components/ui/FormCard";

function ForgetPassword() {
  const navigate = useNavigate();
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
        { email },
      );

      toast.success(res.data.msg || "OTP sent");
      setStep(2);
    } catch (err) {
      toast.error(err.response?.data?.msg || "Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async () => {
    try {
      await axios.post("http://localhost:4000/api/auth/reset-password", {
        email,
        otp,
        newPassword,
      });
      toast.success("Password reset successful");
      navigate("/");
    } catch (err) {
      toast.error("Error resetting password", err.message);
    }
  };

  return (
    <div className="reset-password-page">
      <FormCard
        title="Reset Password"
        subtitle={
          step === 1
            ? "Enter your registered email to receive an OTP."
            : "Verify your OTP and choose a new password."
        }
      >
        <div className="resetForm">
          {step === 1 && (
            <>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Button onClick={sendOtp} disabled={loading}>
                {loading ? "Sending..." : "Send OTP"}
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />

              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

              <Button onClick={resetPassword}>Reset Password</Button>
            </>
          )}
        </div>
      </FormCard>
    </div>
  );
}

export default ForgetPassword;
