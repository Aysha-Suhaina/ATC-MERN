import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div
      style={{
        width: "250px",
        borderRight: "1px solid #ddd",
        padding: "20px",
      }}
    >
      <h3>Admin Panel</h3>

      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginTop: "20px",
        }}
      >
        <NavLink to="/admin-dashboard">
          Dashboard
        </NavLink>

        <NavLink to="/admin/employees">
          Employees
        </NavLink>

        <NavLink to="/admin/attendance">
          Attendance
        </NavLink>

        <NavLink to="/admin/departments">
          Departments
        </NavLink>

        <NavLink to="/admin/designations">
          Designations
        </NavLink>

        <NavLink to="/admin/reports">
          Reports
        </NavLink>

        <NavLink to="/chat">
          Chat
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminSidebar;