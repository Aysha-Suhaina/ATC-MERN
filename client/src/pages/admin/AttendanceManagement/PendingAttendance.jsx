import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  approveAttendance,
  rejectAttendance,
  getPendingAttendance,
} from "../../../api/attendanceApi";
import Button from "../../../components/ui/Button";
import PageHeader from "../../../components/ui/PageHeader";
import Card from "../../../components/ui/Card";
import ApprovalBadge from "../../../components/ui/ApprovalBadge";

function PendingAttendance() {
  const [attendanceList, setAttendanceList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPendingAttendance = async () => {
      try {
        const response = await getPendingAttendance();

        setAttendanceList(response.data.data);
      } catch (error) {
        console.error("Failed to fetch pending attendance", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingAttendance();
  }, []);

  const handleApprove = async (attendanceId) => {
    try {
      await approveAttendance(attendanceId, "Approved by admin");

      setAttendanceList((prev) =>
        prev.filter((item) => item._id !== attendanceId),
      );

      toast.success("Attendance approved");
    } catch (error) {
      console.error(error);
      toast.error("Failed to approve attendance");
    }
  };

  const handleReject = async (attendanceId) => {
    try {
      await rejectAttendance(attendanceId, "Rejected by admin");

      setAttendanceList((prev) =>
        prev.filter((item) => item._id !== attendanceId),
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
    <div className="page">
      <PageHeader
        title="Pending Attendance"
        subtitle="Review and approve employee attendance submissions."
      />

      <Card>
        {attendanceList.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "40px",
            }}
          >
            <h3>No Pending Requests</h3>

            <p>All attendance requests have been processed.</p>
          </div>
        ) : (
          <table className="table">
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

                  <td>{new Date(record.date).toLocaleDateString()}</td>

                  <td>
                    <ApprovalBadge status={record.attendanceStatus} />
                  </td>

                  <td>
                    {record.checkInTime
                      ? new Date(record.checkInTime).toLocaleTimeString()
                      : "-"}
                  </td>

                  <td>
                    {record.checkOutTime
                      ? new Date(record.checkOutTime).toLocaleTimeString()
                      : "-"}
                  </td>

                  <td
                    style={{
                      display: "flex",
                      gap: "10px",
                    }}
                  >
                    <Button
                      variant="success"
                      onClick={() => handleApprove(record._id)}
                    >
                      Approve
                    </Button>

                    <Button
                      variant="danger"
                      onClick={() => handleReject(record._id)}
                    >
                      Reject
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}

export default PendingAttendance;
