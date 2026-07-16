import { useState } from "react";
import Logout from "./Logout";
import "./Navbar.css";
import Button from "../components/ui/Button";
function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <div className="navbar">
      <h2>{localStorage.userRole} Portal</h2>
      <Button onClick={() => setOpen(true)}>Logout</Button>

      {open && <Logout close={() => setOpen(false)} />}
    </div>
  );
}

export default Navbar;
