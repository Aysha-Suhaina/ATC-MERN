import { useState } from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import "./Navbar.css";
import Button from "../components/ui/Button";
function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="navbar">
        <h2>{localStorage.getItem("userRole")?.toUpperCase()} Portal</h2>

        <div className="navbar-actions">
          <Link to="/profile">
            <Button variant="secondary">Profile</Button>
          </Link>

          <Link to="/chat">
            <Button variant="secondary">Chat</Button>
          </Link>

          <Button variant="danger" onClick={() => setOpen(true)}>
            Logout
          </Button>
        </div>
      </div>

      {open && <Logout close={() => setOpen(false)} />}
    </>
  );
}

export default Navbar;
