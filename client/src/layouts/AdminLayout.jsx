import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import AdminSidebar from "../components/admin/AdminSidebar";

const AdminLayout = () => {
  return (
    <>
      <Navbar />

      <div
        style={{
          display: "flex",
          minHeight: "calc(100vh - 60px)",
        }}
      >
        <AdminSidebar />

        <div
        >
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminLayout;