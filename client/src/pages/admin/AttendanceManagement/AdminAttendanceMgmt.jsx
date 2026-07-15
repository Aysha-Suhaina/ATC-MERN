import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllAttendance, deleteAttendance } from "../../../api/attendanceApi";
import { getDepartments } from "../../../api/departmentApi";

const AdminAttendanceMgmt = () => {
  const [records, setRecords] = useState([]);

  const [departments, setDepartments] = useState([]);

  const [search, setSearch] = useState("");

  const [departmentFilter, setDepartmentFilter] = useState("");

  const [attendanceFilter, setAttendanceFilter] = useState("");

  const [approvalFilter, setApprovalFilter] = useState("");

  const [date, setDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [attendanceRes, departmentRes] = await Promise.all([
          getAllAttendance({
            search,

            department: departmentFilter,

            status: attendanceFilter,

            approval: approvalFilter,

            date,
          }),

          getDepartments(),
        ]);

        setRecords(attendanceRes.data.data);

        setDepartments(departmentRes.data.departments);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [search, departmentFilter, attendanceFilter, approvalFilter, date]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this attendance record?",
    );

    if (!confirmDelete) return;

    try {
      await deleteAttendance(id);

      setRecords((prev) => prev.filter((record) => record._id !== id));

      toast.success("Attendance deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete attendance");
    }
  };

  return (
    <div>
      <h1>Attendance Management</h1>

      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Search Employee"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
        >
          <option value="">All Departments</option>

          {departments.map((dept) => (
            <option key={dept._id} value={dept._id}>
              {dept.name}
            </option>
          ))}
        </select>

        <select
          value={attendanceFilter}
          onChange={(e) => setAttendanceFilter(e.target.value)}
        >
          <option value="">Attendance Status</option>

          <option value="present">Present</option>

          <option value="late">Late</option>

          <option value="half_day">Half Day</option>

          <option value="leave">Leave</option>
        </select>

        <select
          value={approvalFilter}
          onChange={(e) => setApprovalFilter(e.target.value)}
        >
          <option value="">Approval Status</option>

          <option value="pending">Pending</option>

          <option value="approved">Approved</option>

          <option value="rejected">Rejected</option>
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button
          onClick={() => {
            setSearch("");

            setDepartmentFilter("");

            setAttendanceFilter("");

            setApprovalFilter("");

            setDate("");
          }}
        >
          Reset
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Date</th>
            <th>Attendance Status</th>
            <th>Approval Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {records.map((record) => (
            <tr key={record._id}>
              <td>{record.user?.name || "Unknown User"}</td>

              <td>{new Date(record.date).toLocaleDateString()}</td>

              <td>{record.attendanceStatus.replace("_", " ")}</td>

              <td>
                {record.approvalStatus.charAt(0).toUpperCase() +
                  record.approvalStatus.slice(1)}
              </td>
              <td>
                <button onClick={() => handleDelete(record._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminAttendanceMgmt;
