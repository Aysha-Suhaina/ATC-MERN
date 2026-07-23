import { useEffect, useState } from "react";

import { getManagerAttendanceHistory } from "../../api/attendanceApi";

const AttendanceHistory = () => {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const res = await getManagerAttendanceHistory();

        setRecords(res.data.attendance);
      } catch (error) {
        console.error(error);
      }
    };

    loadHistory();
  }, []);

  return (
    <div className="page">
      <div className="split-layout-header">
        <div>
          <h1 className="page-title">Attendance History</h1>
          <p className="section-description">
            View attendance records of employees in your department.
          </p>
        </div>
      </div>

      <div className="card">
        <div className="filter-bar">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search employee..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Date</th>
                <th>Status</th>
                <th>Approval</th>
                <th>Designation</th>
              </tr>
            </thead>

            <tbody>
              {records
                .filter((record) => {
                  const keyword = search.toLowerCase();

                  return (
                    record.user?.name?.toLowerCase().includes(keyword) ||
                    record.user?.designation?.name
                      ?.toLowerCase()
                      .includes(keyword)
                  );
                })
                .map((record) => (
                  <tr key={record._id}>
                    <td>{record.user?.name}</td>

                    <td>{new Date(record.date).toLocaleDateString()}</td>

                    <td>
                      <span
                        className={`status-badge ${
                          record.attendanceStatus === "present"
                            ? "active"
                            : "inactive"
                        }`}
                      >
                        {record.attendanceStatus.replace("_", " ")}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`approval-badge ${record.approvalStatus}`}
                      >
                        {record.approvalStatus}
                      </span>
                    </td>

                    <td>{record.user?.designation?.name || "-"}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {records.length === 0 && (
          <div className="empty">No attendance records found.</div>
        )}
      </div>
    </div>
  );
};

export default AttendanceHistory;
