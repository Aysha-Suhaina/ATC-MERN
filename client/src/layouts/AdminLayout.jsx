import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import AdminSidebar from "../components/admin/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-main">
        <Navbar />

        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;