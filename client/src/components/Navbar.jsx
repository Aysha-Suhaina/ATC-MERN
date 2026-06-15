import { useState } from "react";
import Logout from "./Logout";
import "./Navbar.css";
function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <div className="navbar">
      <h2>Student Portal</h2>
      <button onClick={() => setOpen(true)}>Logout</button>

      {open && <Logout close={() => setOpen(false)} />}
    </div>
  );
}

export default Navbar;