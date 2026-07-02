import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";

import {
  getManagerPendingAttendance,
  approveAttendance,
  rejectAttendance,
} from "../../api/attendanceApi";

const AttendanceApproval = () => {
  const [records, setRecords] =
    useState([]);

  const loadData = async () => {
    try {
      const res =
        await getManagerPendingAttendance();

      setRecords(
        res.data.data
      );
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
    <>
      <Navbar />

      <div>
        <h1>Attendance Approval</h1>

        {records.length === 0 ? (
          <p>No pending attendance.</p>
        ) : (
          records.map((item) => (
            <div key={item._id}>
              <h3>{item.user?.name}</h3>

              <p>
                {item.attendanceStatus}
              </p>

              <button
                onClick={async () => {
                  await approveAttendance(
                    item._id
                  );

                  loadData();
                }}
              >
                Approve
              </button>

              <button
                onClick={async () => {
                  await rejectAttendance(
                    item._id
                  );

                  loadData();
                }}
              >
                Reject
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default AttendanceApproval;