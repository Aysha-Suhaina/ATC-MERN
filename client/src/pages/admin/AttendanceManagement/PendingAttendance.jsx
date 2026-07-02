import { useEffect, useState } from "react";
import {toast} from 'react-toastify';
import {
  approveAttendance,
  rejectAttendance,
  getPendingAttendance
} from "../../../api/attendanceApi";

function PendingAttendance() {
  const [attendanceList, setAttendanceList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchPendingAttendance = async () => {
    try {
      const response =
        await getPendingAttendance();

      setAttendanceList(response.data.data);
    } catch (error) {
      console.error(
        "Failed to fetch pending attendance",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  fetchPendingAttendance();
}, []);

  const handleApprove = async (attendanceId) => {
  try {
    await approveAttendance(
      attendanceId,
      "Approved by admin"
    );

    setAttendanceList((prev) =>
      prev.filter(
        (item) => item._id !== attendanceId
      )
    );

    toast.success("Attendance approved");
  } catch (error) {
    console.error(error);
    toast.error("Failed to approve attendance");
  }
};

const handleReject = async (attendanceId) => {
  try {
    await rejectAttendance(
      attendanceId,
      "Rejected by admin"
    );

    setAttendanceList((prev) =>
      prev.filter(
        (item) => item._id !== attendanceId
      )
    );

    toast.success("Attendance rejected");
  } catch (error) {
    console.error(error);
    toast.error("Failed to reject attendance");
  }
};

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h2>Pending Attendance Requests</h2>

      {attendanceList.length === 0 ? (
        <p>No pending attendance requests.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Email</th>
              <th>Date</th>
              <th>Status</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {attendanceList.map((record) => (
              <tr key={record._id}>
                <td>{record.user?.name}</td>

                <td>{record.user?.email}</td>

                <td>
                  {new Date(
                    record.date
                  ).toLocaleDateString()}
                </td>

                <td>{record.attendanceStatus}</td>

                <td>
                  {record.checkInTime
                    ? new Date(
                        record.checkInTime
                      ).toLocaleTimeString()
                    : "-"}
                </td>

                <td>
                  {record.checkOutTime
                    ? new Date(
                        record.checkOutTime
                      ).toLocaleTimeString()
                    : "-"}
                </td>
                <td>
                  <button
                    onClick={() => handleApprove(record._id)}
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => handleReject(record._id)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PendingAttendance;