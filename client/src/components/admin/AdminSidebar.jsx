import { NavLink } from "react-router-dom";
import "./AdminSidebar.css";
<<<<<<< HEAD
import {
  FiHome,
  FiUsers,
  FiCheckSquare,
  FiBriefcase,
  FiLayers,
  FiBarChart2,
  FiMessageSquare,
} from "react-icons/fi";
=======
>>>>>>> origin/feat/model

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
<<<<<<< HEAD
          <FiHome />
          <span>Dashboard</span>
=======
          Dashboard
>>>>>>> origin/feat/model
        </NavLink>

        <NavLink
          to="/admin/employees"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
<<<<<<< HEAD
          <FiUsers />
          <span>Employees</span>
=======
          Employees
>>>>>>> origin/feat/model
        </NavLink>

        <NavLink
          to="/admin/attendance"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
<<<<<<< HEAD
          <FiCheckSquare />
          <span>Attendance</span>
=======
          Attendance
>>>>>>> origin/feat/model
        </NavLink>

        <NavLink
          to="/admin/departments"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
<<<<<<< HEAD
          <FiBriefcase />
          <span>Departments</span>
=======
          Departments
>>>>>>> origin/feat/model
        </NavLink>

        <NavLink
          to="/admin/designations"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
<<<<<<< HEAD
          <FiLayers />
          <span>Designations</span>
=======
          Designations
>>>>>>> origin/feat/model
        </NavLink>

        <NavLink
          to="/admin/reports"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
<<<<<<< HEAD
          <FiBarChart2 />
          <span>Reports</span>
=======
          Reports
>>>>>>> origin/feat/model
        </NavLink>

        <NavLink
          to="/chat"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
<<<<<<< HEAD
          <FiMessageSquare />
          <span>Chat</span>
=======
          Chat
>>>>>>> origin/feat/model
        </NavLink>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
