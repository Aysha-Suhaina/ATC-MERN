import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import { useState,useEffect,useCallback  } from "react";
import {
  submitAttendance,getMyAttendance
} from "../../api/attendanceApi";

import { getProfile } from "../../api/userApi";

import { toast } from "react-toastify";

const ManagerDashboard = () => {
    const [attendance,
    setAttendance] = useState([]);
    const [profile, setProfile] = useState(null);

  const [form,
    setForm] = useState({
      date: "",
      checkInTime: "",
      checkOutTime: "",
      attendanceStatus: "present",
      remarks: "",
    });

      const loadData = useCallback(async () => {
        try {
          const profileRes =
            await getProfile();
    
          const attendanceRes =
            await getMyAttendance();
    
          setProfile(
            profileRes.data?.data ??
              profileRes.data ??
              null
          );
    
          setAttendance(
            attendanceRes.data?.data ??
              attendanceRes.data ??
              []
          );
        } catch (err) {
          console.log(err);
        }
      }, []);
    
      useEffect(() => {
        const fetchData = async () => {
          await loadData();
        };
    
        fetchData();
      }, [loadData]);

  const handleChange = (e) => {
      setForm({
        ...form,
        [e.target.name]:
          e.target.value,
      });
    };
  
    const handleSubmit =
      async (e) => {
        e.preventDefault();
        const today = new Date().toISOString().split("T")[0];
        try {
          if (
  
            !form.checkInTime 
          ) {
            toast.warning(
              "Please select checkin time"
            );
            return;
          }
  
          const payload = {
            ...form,
            date: today,
            checkInTime: form.checkInTime
              ? `${today}T${form.checkInTime}`
              : null,
            checkOutTime: form.checkOutTime
              ? `${today}T${form.checkOutTime}`
              : null,
          };
  
          await submitAttendance(payload);
  
          toast.success(
            "Attendance submitted"
          );
  
          await loadData();
        } catch (err) {
          toast.error(
            err.response?.data?.message ||
            "Failed"
          );
        }
      };
  
  return (
    <>
      <Navbar />

      <div>
        <h1>Manager Dashboard</h1>

        <h2>Welcome, {profile?.name}</h2>

        <Link to="/chat">
          <button>Chat</button>
        </Link>
        

        <h2>
        Submit Attendance
      </h2>

      <form
        onSubmit={handleSubmit}
      >

        <label>Check In Time:</label>
        <input
          type="time"
          name="checkInTime"
          onChange={handleChange}
          required
        />

        <br />
        <label>Check Out Time:</label>
        <input
          type="time"
          name="checkOutTime"
          onChange={handleChange}
          required
        />

        <br />

        <select
          name="attendanceStatus"
          onChange={handleChange}
        >
          <option value="present">
            Present
          </option>

          <option value="absent">
            Absent
          </option>

          <option value="half_day">
            Half Day
          </option>

          <option value="late">
            Late
          </option>

          <option value="leave">
            Leave
          </option>
        </select>

        <br />

        <textarea
          name="remarks"
          placeholder="Remarks"
          onChange={handleChange}
        />

        <br />

        <button type="submit">
          Submit
        </button>

      </form>

      <hr />
        <p>Welcome! Manage your department from here.</p>

        <div>
          <Link to="/manager/attendance">
            <button>Attendance Approval</button>
          </Link>

          <Link to="/manager/my-employees">
            <button>My Employees</button>
          </Link>

          <Link to="/manager/my-department">
            <button>My Department</button>
          </Link>

          <Link to="/manager/history">
            <button>Attendance History</button>
            <p>{attendance.length} records available</p>
          </Link>

          <Link to="/manager/designations">
  <button>
    Department Designations
  </button>
</Link>

          {/* Reports will be added later */}
        </div>
      </div>
    </>
  );
};

export default ManagerDashboard;