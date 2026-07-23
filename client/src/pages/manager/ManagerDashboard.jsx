import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { submitAttendance, getMyAttendance } from "../../api/attendanceApi";

import { getProfile } from "../../api/userApi";
import Button from "../../components/ui/Button";
import PageHeader from "../../components/ui/PageHeader";
import FormCard from "../../components/ui/FormCard";
import Card from "../../components/ui/Card";

import { toast } from "react-toastify";

const ManagerDashboard = () => {
  const [attendance, setAttendance] = useState([]);
  const [profile, setProfile] = useState(null);

  const [form, setForm] = useState({
    date: "",
    checkInTime: "",
    checkOutTime: "",
    attendanceStatus: "present",
    remarks: "",
  });

  const loadData = useCallback(async () => {
    try {
      const profileRes = await getProfile();

      const attendanceRes = await getMyAttendance();

      setProfile(profileRes.data?.data ?? profileRes.data ?? null);

      setAttendance(attendanceRes.data?.data ?? attendanceRes.data ?? []);
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
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const today = new Date().toISOString().split("T")[0];
    try {
      if (!form.checkInTime) {
        toast.warning("Please select checkin time");
        return;
      }

      const payload = {
        ...form,
        date: today,
        checkInTime: form.checkInTime ? `${today}T${form.checkInTime}` : null,
        checkOutTime: form.checkOutTime
          ? `${today}T${form.checkOutTime}`
          : null,
      };

      await submitAttendance(payload);

      toast.success("Attendance submitted");

      await loadData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed");
    }
  };

  return (
    <>
      <div className="page">
        <PageHeader
          title="Manager Dashboard"
          subtitle={`Welcome back, ${profile?.name || "Manager"}. Manage your department and team from here.`}
        />

        <div className="dashboard-grid-2">
          <FormCard
            title="Submit Attendance"
            subtitle="Record today's attendance."
          >
            <form onSubmit={handleSubmit} className="form-grid">
              <div className="form-group">
                <label>Check In Time</label>

                <input
                  type="time"
                  name="checkInTime"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Check Out Time</label>

                <input
                  type="time"
                  name="checkOutTime"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Status</label>

                <select name="attendanceStatus" onChange={handleChange}>
                  <option value="present">Present</option>
                  <option value="absent">Absent</option>
                  <option value="half_day">Half Day</option>
                  <option value="late">Late</option>
                  <option value="leave">Leave</option>
                </select>
              </div>

              <div className="form-group">
                <label>Remarks</label>

                <textarea
                  name="remarks"
                  placeholder="Remarks"
                  rows={4}
                  onChange={handleChange}
                />
              </div>

              <div className="form-actions">
                <Button type="submit">Submit Attendance</Button>
              </div>
            </form>
          </FormCard>

          <Card>
            <h2 className="section-title">Quick Actions</h2>

            <p className="section-description">
              Navigate to common manager tasks.
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <Link to="/manager/attendance">
                <Button variant="secondary">Attendance Approval</Button>
              </Link>

              <Link to="/manager/my-employees">
                <Button variant="secondary">My Employees</Button>
              </Link>

              <Link to="/manager/my-department">
                <Button variant="secondary">My Department</Button>
              </Link>

              <Link to="/manager/history">
                <Button variant="secondary">
                  Attendance History ({attendance.length})
                </Button>
              </Link>

              <Link to="/manager/designations">
                <Button variant="secondary">Department Designations</Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ManagerDashboard;
