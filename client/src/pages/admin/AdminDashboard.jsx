import { useEffect, useState } from "react";
import { getProfile } from "../../api/userApi";
import { getAdminDashboardStats } from "../../api/dashboardApi";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [profile, setProfile] =
    useState(null);
    const [stats, setStats] = useState(null);

  useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await getProfile();

      setProfile(
        res.data?.data ??
        res.data
      );

      const statsRes =
  await getAdminDashboardStats();

setStats(
  statsRes.data.stats
);
    } catch (error) {
      console.log(error);
    }
  };

    fetchProfile();
  }, []);

  return (
    <>
      {/* welcome admin */}

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

        {/* --------------------- */}

        <Link to="/chat">
          <button>Chat</button>
        </Link>

        <hr />

           <p
  style={{
    color: "#666",
    marginBottom: "30px",
  }}
>
  Monitor your organization, manage employees,
  review attendance requests and oversee company
  operations from one dashboard.
</p>

        {/* overall organisation statistics  */}

        {stats && (
  <div
    style={{
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit,minmax(220px,1fr))",
      gap: "20px",
      marginBottom: "30px",
    }}
  >
    <div
      style={{
        border: "1px solid #ddd",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <h3>Total Employees</h3>
      <h1>{stats.totalEmployees}</h1>
    </div>

    <div
      style={{
        border: "1px solid #ddd",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <h3>Total Managers</h3>
      <h1>{stats.totalManagers}</h1>
    </div>

    <div
      style={{
        border: "1px solid #ddd",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <h3>Departments</h3>
      <h1>{stats.totalDepartments}</h1>
    </div>

    <div
      style={{
        border: "1px solid #ddd",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <h3>Designations</h3>
      <h1>{stats.totalDesignations}</h1>
    </div>

    <div
      style={{
        border: "1px solid #ddd",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <h3>Present Today</h3>
      <h1>{stats.presentToday}</h1>
    </div>

    <div
      style={{
        border: "1px solid #ddd",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <h3>Absent Today</h3>
      <h1>{stats.absentToday}</h1>
    </div>

    <div
      style={{
        border: "1px solid #ddd",
        padding: "20px",
        borderRadius: "10px",
        background: "#fff3cd",
      }}
    >
      <h3>Pending Attendance</h3>
      <h1>{stats.pendingAttendance}</h1>
    </div>
  </div>
)}

   {/* ------------------ */}

  {/* attendance summary for today */}

{stats && (
  <div
    style={{
      marginTop: "30px",
      border: "1px solid #ddd",
      borderRadius: "10px",
      padding: "20px",
    }}
  >
    <h2>Today's Attendance</h2>

    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit,minmax(150px,1fr))",
        gap: "15px",
      }}
    >
      <div>
        <strong>Present</strong>
        <h3>
          {stats.dailySummary.present}
        </h3>
      </div>

      <div>
        <strong>Late</strong>
        <h3>
          {stats.dailySummary.late}
        </h3>
      </div>

      <div>
        <strong>Half Day</strong>
        <h3>
          {stats.dailySummary.halfDay}
        </h3>
      </div>

      <div>
        <strong>Leave</strong>
        <h3>
          {stats.dailySummary.leave}
        </h3>
      </div>

      <div>
        <strong>Absent</strong>
        <h3>
          {stats.dailySummary.absent}
        </h3>
      </div>

      <div>
        <strong>Attendance %</strong>
        <h3>
          {stats.dailySummary.attendanceRate}%
        </h3>
      </div>
    </div>
  </div>
)}

{/* --------------- */}
        <hr />
        {/* attendance mgmt */}

        <h2>Attendance Management</h2>

        <p>
          Review attendance records and approve or
          reject attendance submissions.
        </p>
        <button
          onClick={() =>
            navigate("/admin/attendance")
          }
        > View Attendance
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

{/* Employee Management */}
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
        {/* Organization Management */}
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
    
      </div>
    </>
  );
};

export default AdminDashboard;