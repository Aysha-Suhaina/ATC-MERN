import { useEffect, useState } from "react";
import { getProfile } from "../../api/userApi";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [profile, setProfile] =
    useState(null);

  useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await getProfile();

      setProfile(
        res.data?.data ??
        res.data
      );
    } catch (error) {
      console.log(error);
    }
  };

    fetchProfile();
  }, []);

  return (
    <>
    
      <Navbar />

      <div style={{ padding: "25px" }}>
        <h1>Admin Dashboard</h1>

        {profile && (
          <>
            <h3>Welcome back, {profile.name} </h3>

            <p>
              <strong>Role:</strong> {profile.role}
            </p>

            <p>
              <strong>Department:</strong>{" "}
              {profile.department || "Not Assigned"}
            </p>
          </>
        )}

        <Link to="/chat">
          <button>Chat</button>
        </Link>

        <hr />



        <p>
          Manage employees, attendance, departments,
          designations, reports and organizational
          settings from a single place.
        </p>

        <hr />

        <h2>Attendance Management</h2>

        <p>
          Review attendance records and approve or
          reject attendance submissions.
        </p>

        <button
          onClick={() =>
            navigate("/admin/attendance")
          }
        >
          View Attendance
        </button>

        <button
          onClick={() =>
            navigate("/admin/pending-attendance")
          }
          style={{ marginLeft: "10px" }}
        >
          Pending Requests
        </button>

        <hr />

        <h2>Employee Management</h2>

        <p>
          Create employee accounts, update employee
          information and manage user roles.
        </p>

        <button
          onClick={() =>
            navigate("/admin/employees")
          }
        >
          Employee List
        </button>

        <button
          onClick={() =>
            navigate("/admin/employees/create")
          }
          style={{ marginLeft: "10px" }}
        >
          Create Employee
        </button>

        <hr />

        <h2>Organization Management</h2>

        <p>
          Configure the company's departments,
          designations and department managers.
        </p>

        <button
          onClick={() =>
            navigate("/admin/departments")
          }
        >
          Manage Departments
        </button>

        <button
          onClick={() =>
            navigate("/admin/designations")
          }
          style={{ marginLeft: "10px" }}
        >
          Manage Designations
        </button>

        <hr />

        <h2>Reports</h2>

        <p>
          Generate attendance and employee reports and
          export them in multiple formats.
        </p>

        <button disabled>
          Attendance Reports (Coming Soon)
        </button>

        <button
          disabled
          style={{ marginLeft: "10px" }}
        >
          Employee Reports (Coming Soon)
        </button>

        <hr />

        <h2>Communication</h2>

        <p>
          Access private messaging and department group
          chats.
        </p>

        <button disabled>
          Private Chat (Coming Soon)
        </button>

        <button
          disabled
          style={{ marginLeft: "10px" }}
        >
          Department Chat (Coming Soon)
        </button>

        <hr />

        <h2>Account</h2>

        <p>
          Manage your administrator account and
          personal settings.
        </p>

        <button disabled>
          My Profile (Coming Soon)
        </button>
      </div>
    </>
  );
};

export default AdminDashboard;