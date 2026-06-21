import { useEffect, useState } from "react";
import { getProfile } from "../../api/userApi";
import { useNavigate } from "react-router-dom";
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

      <div
        style={{
          padding: "20px",
        }}
      >
        <h1>
          Admin Dashboard
        </h1>

        {profile && (
          <div>
            <h3>
              Welcome,
              {profile.name}
            </h3>

            <p>
              Role:
              {profile.role}
            </p>

            <p>
              Department:
              {profile.department}
            </p>
          </div>
        )}

        <hr />

        <h2>
          Attendance
          Management
        </h2>

        <button
          onClick={() =>
            navigate(
              "/admin/attendance"
            )
          }
        >
          View Attendance
        </button>

        <button
          onClick={() =>
            navigate(
              "/admin/pending-attendance"
            )
          }
        >
          Pending Requests
        </button>

        <hr />

        <h2>
          Employee
          Management
        </h2>

        <button
          onClick={() =>
            navigate(
              "/admin/employees"
            )
          }
        >
          View Employees
        </button>

        <button
          onClick={() =>
            navigate(
              "/admin/employees/create"
            )
          }
        >
          Create Employee
        </button>

        <hr />

        <h2>
          Account
        </h2>

        {/* <button
          onClick={() =>
            navigate(
              "/profile"
            )
          }
        >
          My Profile
        </button> */}
      </div>
    </>
  );
};

export default AdminDashboard;