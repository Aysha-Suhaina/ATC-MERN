import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./Logout.css";
function Logout({ close }) {
  const navigate = useNavigate();

  const logout = async () => {
    await axios.post("http://localhost:4000/api/auth/logout", {}, { withCredentials: true });
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="overlay">
      <div className="box">
        <p>Are you sure?</p>

        <button onClick={logout}>Yes</button>
        <button onClick={close}>No</button>
      </div>
    </div>
  );
}

export default Logout;