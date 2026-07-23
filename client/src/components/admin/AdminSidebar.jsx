import { NavLink } from "react-router-dom";
import "./AdminSidebar.css";
import {
  FiHome,
  FiUsers,
  FiCheckSquare,
  FiBriefcase,
  FiLayers,
  FiBarChart2,
  FiMessageSquare,
} from "react-icons/fi";

const AdminSidebar = () => {
  return (
    <aside className="sidebar">
      <h3 className="sidebar-title">Admin Panel</h3>

      <nav className="sidebar-nav">
        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <FiHome />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/admin/employees"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <FiUsers />
          <span>Employees</span>
        </NavLink>

        <NavLink
          to="/admin/attendance"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <FiCheckSquare />
          <span>Attendance</span>
        </NavLink>

        <NavLink
          to="/admin/departments"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <FiBriefcase />
          <span>Departments</span>
        </NavLink>

        <NavLink
          to="/admin/designations"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <FiLayers />
          <span>Designations</span>
        </NavLink>

        <NavLink
          to="/admin/reports"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <FiBarChart2 />
          <span>Reports</span>
        </NavLink>

        <NavLink
          to="/chat"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <FiMessageSquare />
          <span>Chat</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
