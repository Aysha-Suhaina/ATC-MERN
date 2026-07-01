import { useEffect, useState } from "react";
import {
  getAllAttendance,
  deleteAttendance,
} from "../../../api/attendanceApi";

const AdminAttendanceMgmt = () => {
  const [records, setRecords] =
    useState([]);

 useEffect(() => {
  const fetchAttendance = async () => {
    try {
      const res = await getAllAttendance();
      console.log(res.data);
      setRecords(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  fetchAttendance();
}, []);

const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this attendance record?"
  );

  if (!confirmDelete) return;

  try {
    await deleteAttendance(id);

    setRecords((prev) =>
      prev.filter(
        (record) => record._id !== id
      )
    );

    alert(
      "Attendance deleted successfully"
    );
  } catch (error) {
    console.error(error);
    alert(
      "Failed to delete attendance"
    );
  }
};

  return (
    <div>
      <h1>
        Attendance Management
      </h1>

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

        <td>
          {new Date(record.date).toLocaleDateString()}
        </td>

        <td>
          {record.attendanceStatus.replace("_", " ")}
        </td>

        <td>
          {record.approvalStatus.charAt(0).toUpperCase() +
            record.approvalStatus.slice(1)}
        </td>
        <td>
          <button
            onClick={() =>
              handleDelete(record._id)
            }
          >
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
    </div>
  );
};

export default AdminAttendanceMgmt;