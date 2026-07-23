import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import ManagerSidebar from "../components/ManagerSidebar";

const ManagerLayout = () => {
  return (
    <div className="admin-layout">
      <ManagerSidebar />

      <div className="admin-main">
        <Navbar />

        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ManagerLayout;
