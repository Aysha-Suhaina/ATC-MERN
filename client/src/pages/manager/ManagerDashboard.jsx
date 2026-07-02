import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";

const ManagerDashboard = () => {
  return (
    <>
      <Navbar />

      <div>
        <h1>Manager Dashboard</h1>

        <p>Welcome! Manage your department from here.</p>

        <div>
          <Link to="/manager/attendance">
            <button>Attendance Approval</button>
          </Link>

          <Link to="/manager/my-employees">
            <button>My Employees</button>
          </Link>

          <Link to="/manager/history">
            <button>Attendance History </button>
          </Link>

          {/* Reports will be added later */}
        </div>
      </div>
    </>
  );
};

export default ManagerDashboard;