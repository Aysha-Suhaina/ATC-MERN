import { useCallback, useEffect, useState } from "react";
import { getProfile } from "../../api/userApi";
import { submitAttendance, getMyAttendance } from "../../api/attendanceApi";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import PageHeader from "../../components/ui/PageHeader";
import Section from "../../components/ui/Section";
import Card from "../../components/ui/Card";
import FormCard from "../../components/ui/FormCard";
import InfoCard from "../../components/ui/InfoCard";
import ApprovalBadge from "../../components/ui/ApprovalBadge";

import Navbar from "../../components/Navbar";
import { toast } from "react-toastify";

const Dashboard = () => {
  const navigate = useNavigate();
  //console.log("Dashboard rendered");
  const [profile, setProfile] = useState(null);

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
  const [attendance, setAttendance] = useState([]);

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
      <Navbar />

      <div className="page">
        <PageHeader
          title="Employee Dashboard"
          subtitle="Manage your attendance and view your attendance history."
        />

        {profile && (
          <div className="grid-3">
            <InfoCard title="Employee" value={profile.name} />
            <InfoCard
              title="Department"
              value={profile.department?.name || "-"}
            />
            <InfoCard
              title="Designation"
              value={profile.designation?.name || "-"}
            />
          </div>
        )}
        <div className="dashboard-grid-2">
          <Section
            title="Submit Attendance"
            description="Record today's attendance."
          >
            <FormCard
              title="Attendance Details"
              subtitle="Fill in your attendance information."
            >
              <form onSubmit={handleSubmit} className="form-grid">
                <input
                  type="time"
                  name="checkInTime"
                  onChange={handleChange}
                  required
                />

                <input
                  type="time"
                  name="checkOutTime"
                  onChange={handleChange}
                  required
                />

                <select name="attendanceStatus" onChange={handleChange}>
                  <option value="present">Present</option>
                  <option value="absent">Absent</option>
                  <option value="half_day">Half Day</option>
                  <option value="late">Late</option>
                  <option value="leave">Leave</option>
                </select>

                <textarea
                  name="remarks"
                  placeholder="Remarks"
                  rows="4"
                  onChange={handleChange}
                />

                <div className="form-actions">
                  <Button type="submit">Submit Attendance</Button>
                </div>
              </form>
            </FormCard>
          </Section>

          <Section
            title="Attendance History"
            description="View all your submitted attendance records."
          >
            <Card>
              <div className="table-wrapper">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Hours</th>
                      <th>Approval</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {Array.isArray(attendance) && attendance.length > 0 ? (
                      attendance.map((item) => (
                        <tr key={item._id}>
                          <td>{new Date(item.date).toLocaleDateString()}</td>

                          <td style={{ textTransform: "capitalize" }}>
                            {item.attendanceStatus.replace("_", " ")}
                          </td>

                          <td>{item.totalHours ?? "-"}</td>

                          <td>
                            <ApprovalBadge status={item.approvalStatus} />
                          </td>

                          <td>
                            {item.approvalStatus === "rejected" ? (
                              <Button
                                variant="secondary"
                                onClick={() =>
                                  navigate(`/attendance/edit/${item._id}`)
                                }
                              >
                                Edit & Resubmit
                              </Button>
                            ) : (
                              "-"
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="5"
                          style={{
                            textAlign: "center",
                            padding: "30px",
                          }}
                        >
                          No attendance records found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </Section>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
