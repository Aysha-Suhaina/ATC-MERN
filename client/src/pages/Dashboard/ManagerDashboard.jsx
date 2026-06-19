import {
  useEffect,useState,
} from "react";
import Navbar from "../../components/Navbar";

import {
  getPendingAttendance,
  approveAttendance,
  rejectAttendance,
} from "../../api/attendanceApi";

const ManagerDashboard = () => {

  const [records,
    setRecords] = useState([]);

  const loadData =
    async () => {

      const res =
        await getPendingAttendance();

      setRecords(
        res.data.data
      );
    };

  useEffect(() => {
    loadData();
  }, []);
  

  return (

    <>
      <Navbar />
   
    <div>

      <h1>
        Manager Dashboard
      </h1>

      {records.map(
        (item) => (
          <div
            key={item._id}
          >

            <h3>
              {
                item.user?.name
              }
            </h3>

            <p>
              {
                item.attendanceStatus
              }
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
        )
      )}

    </div>
     </>
  );
};

export default ManagerDashboard;
