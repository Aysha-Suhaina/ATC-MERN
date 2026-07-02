import {
  useEffect,
  useState,
} from "react";

import {
  getManagerAttendanceHistory,
} from "../../api/attendanceApi";

const AttendanceHistory = () => {
  const [records,
    setRecords] =
    useState([]);

  useEffect(() => {
    const loadHistory =
      async () => {
        try {
          const res =
            await getManagerAttendanceHistory();

          setRecords(
            res.data.attendance
          );
        } catch (error) {
          console.error(error);
        }
      };

    loadHistory();
  }, []);

  return (
    <div>

      <h1>
        Attendance History
      </h1>

      <table border="1">

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

          {records.map(
            (record) => (
              <tr key={record._id}>

                <td>
                  {record.user?.name}
                </td>

                <td>
                  {new Date(
                    record.date
                  ).toLocaleDateString()}
                </td>

                <td>
                  {
                    record.attendanceStatus
                  }
                </td>

                <td>
                  {
                    record.approvalStatus
                  }
                </td>

                <td>
                  {
                    record.user
                      ?.designation
                      ?.name
                  }
                </td>

              </tr>
            )
          )}

        </tbody>

      </table>

    </div>
  );
};

export default AttendanceHistory;