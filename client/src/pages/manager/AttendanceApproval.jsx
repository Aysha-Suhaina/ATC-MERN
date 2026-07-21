import { useEffect, useState } from "react";

import {
  getManagerPendingAttendance,
  approveAttendance,
  rejectAttendance,
} from "../../api/attendanceApi";
import Button from "../../components/ui/Button";

const AttendanceApproval = () => {
  const [records, setRecords] = useState([]);

  const loadData = async () => {
    try {
      const res = await getManagerPendingAttendance();

      setRecords(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    queueMicrotask(() => {
      loadData();
    });
  }, []);

  return (
  <div className="page">
    <div className="page-header">
      <div>
        <h1>Attendance Approval</h1>
        <p className="section-description">
          Review and approve attendance requests submitted by your team.
        </p>
      </div>
    </div>

    <div className="card">
      {records.length === 0 ? (
        <div className="empty">
          <h3>No Pending Requests</h3>
          <p>All attendance requests have been reviewed.</p>
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Department</th>
              <th>Status</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {records.map((item) => (
              <tr key={item._id}>
                <td>
                  <strong>{item.user?.name}</strong>
                </td>

                <td>{item.user?.department?.name || "-"}</td>

                <td>
                  <span
                    className={`status-badge ${
                      item.attendanceStatus === "present"
                        ? "active"
                        : "inactive"
                    }`}
                  >
                    {item.attendanceStatus.replace("_", " ")}
                  </span>
                </td>

                <td>
                  {item.checkInTime
                    ? new Date(item.checkInTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "-"}
                </td>

                <td>
                  {item.checkOutTime
                    ? new Date(item.checkOutTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "-"}
                </td>

                <td>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                    }}
                  >
                    <Button
                      variant="success"
                      onClick={async () => {
                        await approveAttendance(item._id);
                        loadData();
                      }}
                    >
                      Approve
                    </Button>

                    <Button
                      variant="danger"
                      onClick={async () => {
                        await rejectAttendance(item._id);
                        loadData();
                      }}
                    >
                      Reject
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  </div>
);
};

export default AttendanceApproval;
