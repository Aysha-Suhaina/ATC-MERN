import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllAttendance,
  deleteAttendance,
} from "../../api/attendanceApi";

const AdminAttendanceMgmt = () => {
    const navigate = useNavigate();
  const [records, setRecords] =
    useState([]);

 useEffect(() => {
  const fetchAttendance = async () => {
    try {
      const res = await getAllAttendance();

      setRecords(res.data.records);
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
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {records.map((record) => (
            <tr key={record._id}>
              <td>
                {
                  record.employeeId
                    ?.name
                }
              </td>

              <td>
                {record.date}
              </td>

              <td>
                {
                  record.attendanceStatus
                }
              </td>
            </tr>
          ))}
        </tbody>
        <tbody>
  {records.map((record) => (
    <tr key={record._id}>
      <td>{record.employeeId?.name}</td>
      <td>{record.date}</td>
      <td>{record.attendanceStatus}</td>

      <td>
        <button
          onClick={() =>
            navigate(
              `/attendance/edit/${record._id}`
            )
          }
        >
          Edit
        </button>

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