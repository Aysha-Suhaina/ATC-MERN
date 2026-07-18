import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiCheckSquare,
  FiUsers,
  FiClipboard,
  FiLayers,
  FiBriefcase,
  FiMessageSquare,
} from "react-icons/fi";

const ManagerSidebar = () => {
  return (
    <aside className="sidebar">
      <h3 className="sidebar-title">Manager Panel</h3>

      <nav className="sidebar-nav">
        <NavLink
          to="/manager-dashboard"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <FiHome />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/manager/attendance"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <FiCheckSquare />
          <span>Attendance Approval</span>
        </NavLink>

        <NavLink
          to="/manager/my-employees"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <FiUsers />
          <span>My Employees</span>
        </NavLink>

        <NavLink
          to="/manager/history"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <FiClipboard />
          <span>Attendance History</span>
        </NavLink>

        <NavLink
          to="/manager/my-department"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <FiBriefcase />
          <span>My Department</span>
        </NavLink>

        <NavLink
          to="/manager/designations"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <FiLayers />
          <span>Designations</span>
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

export default ManagerSidebar;
