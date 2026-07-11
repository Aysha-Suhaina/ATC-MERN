import { useCallback, useEffect, useState } from "react";
import { getProfile } from "../../api/userApi";
import {Link } from 'react-router-dom';
import {
  submitAttendance,
  getMyAttendance,
} from "../../api/attendanceApi";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";
import { toast } from "react-toastify";

const Dashboard = () => {
  
const navigate = useNavigate();
  //console.log("Dashboard rendered");
  const [profile, setProfile] =
    useState(null);

    //Backend attendance structure :
    //for my reference 
    // const attendance =
    // await Attendance.create({
    //   user: req.user.id, - missing
    //   date,
    //   checkInTime,
    //   checkOutTime,
    //   totalHours, - missing
    //   attendanceStatus,
    //   remarks,
    // });
  const [attendance,
    setAttendance] = useState([]);

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

  const isToday =
  new Date(attendance.date).toDateString() ===
  new Date().toDateString();

const canResubmit =
  attendance.approvalStatus === "rejected" &&
  isToday;

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
    
    <div style={{ padding: "20px" }}>

      <h1>
        Employee Dashboard
      </h1>

      {profile && (
        <div>
          <h3>
            {profile.name}
          </h3>

          <p>
            {profile.department?.name}
          </p>

          <p>
            {profile.designation?.name}
          </p>

          <p>
            Role: {profile.role}
          </p>
        </div>
      )}
      <Link to="/chat">
          <button>Chat</button>
        </Link>

      <hr />

      <h2>
        Submit Attendance
      </h2>

      <form
        onSubmit={handleSubmit}
      >
        {/* <label>Date:</label>
        <input
          type="date"
          name="date"
          onChange={handleChange}
          required
        />

        <br /> */}

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

      <h2>
        My Attendance
      </h2>

      <table border="1">

        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
            <th>Hours</th>
            <th>Approval</th>
          </tr>
        </thead>

        <tbody>

          {Array.isArray(attendance) &&
            attendance.map((item) => (
              <tr key={item._id}>
                <td>
                  {new Date(
                    item.date
                  ).toLocaleDateString()}
                </td>

                <td>
                  {item.attendanceStatus}
                </td>

                <td>
                  {item.totalHours ?? "-"}
                </td>

                <td>
                  {item.approvalStatus}
                </td>

                <td>
                   {
                    canResubmit && (
                      <button  onClick={() =>
                          navigate(`/attendance/edit/${item._id}`)
                        }>
                        Edit & Resubmit
                      </button>
                    )
                  }
                </td>
              </tr>
            ))}

        </tbody>

      </table>

     

    </div>
    </>
  );
};

export default Dashboard;