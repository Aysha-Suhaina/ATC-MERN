import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketContext";

import Button from "../components/ui/Button";
import "./Logout.css";

function Logout({ close }) {
  const navigate = useNavigate();
  const { disconnectSocket } = useSocket();

  const logout = async () => {
    await axios.post(
      "http://localhost:4000/api/auth/logout",
      {},
      { withCredentials: true },
    );

    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");

    disconnectSocket();

    navigate("/", { replace: true });
  };

  return (
    <div className="overlay">
      <div className="box">
        <h3>Logout</h3>

        <p>Are you sure you want to logout?</p>

        <div className="logout-actions">
          <Button variant="secondary" onClick={close}>
            Cancel
          </Button>

          <Button variant="danger" onClick={logout}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Logout;
