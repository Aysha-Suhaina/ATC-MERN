import axios from "axios";
import { useNavigate } from "react-router-dom";
<<<<<<< Updated upstream
import socket from "../socket/socket";
=======

import { useSocket } from "../context/SocketContext";
>>>>>>> Stashed changes

import "./Logout.css";
function Logout({ close }) {
  const navigate = useNavigate();
  const { disconnectSocket } = useSocket();

  const logout = async () => {
    await axios.post("http://localhost:4000/api/auth/logout", {}, { withCredentials: true });
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
<<<<<<< Updated upstream
    socket.disconnect();
=======

    disconnectSocket();

>>>>>>> Stashed changes
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
