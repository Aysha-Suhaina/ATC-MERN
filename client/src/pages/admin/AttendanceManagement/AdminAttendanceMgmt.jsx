import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllAttendance, deleteAttendance,approveAttendance,
  rejectAttendance, } from "../../../api/attendanceApi";
import {
  getDepartments,
} from "../../../api/departmentApi";
import Button from "../../../components/ui/Button";
import PageHeader from "../../../components/ui/PageHeader";
import Card from "../../../components/ui/Card";
import FilterBar from "../../../components/ui/FilterBar";
import SearchBar from "../../../components/ui/searchBar";
import ApprovalBadge from "../../../components/ui/ApprovalBadge";

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

  const handleApprove = async (id) => {
    try {
      await approveAttendance(id);

      toast.success("Attendance approved");

      setRecords((prev) =>
        prev.map((record) =>
          record._id === id
            ? {
                ...record,
                approvalStatus: "approved",
              }
            : record,
        ),
      );
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Failed to approve attendance",
      );
    }
  };
  const handleReject = async (id) => {
    try {
      await rejectAttendance(id);

      toast.success("Attendance rejected");

      setRecords((prev) =>
        prev.map((record) =>
          record._id === id
            ? {
                ...record,
                approvalStatus: "rejected",
              }
            : record,
        ),
      );
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Failed to reject attendance",
      );
    }
  };

  return (
    <div className="page">
      <PageHeader
        title="Attendance Management"
        subtitle="View, search and manage employee attendance records."
      />

      <FilterBar>
        <SearchBar
          value={search}
          placeholder="Search employee..."
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
          className="input"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <Button
          variant="secondary"
          onClick={() => {
            setSearch("");

            setDepartmentFilter("");

            setAttendanceFilter("");

            setApprovalFilter("");

            setDate("");
          }}
        >
          Reset
        </Button>
      </FilterBar>

      <Card>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Employee</th>

                <th>Date</th>

                <th>Attendance</th>

                <th>Approval</th>

                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {records.map((record) => (
                <tr key={record._id}>
                  <td>{record.user?.name || "Unknown User"}</td>

                  <td>{new Date(record.date).toLocaleDateString()}</td>

                  <td>{record.attendanceStatus.replace("_", " ")}</td>

                  {/* <td>
                    {record.approvalStatus
                      ? record.approvalStatus.replace("_", " ")
                      : "-"}
                  </td> */}
                  <td>
                    <ApprovalBadge status={record.approvalStatus} />
                  </td>

                  <td>
                    {record.approvalStatus === "pending" && (
                      <>
                        <Button onClick={() => handleApprove(record._id)}>
                          Approve
                        </Button>

                        <Button
                          variant="danger"
                          onClick={() => handleReject(record._id)}
                        >
                          Reject
                        </Button>
                      </>
                    )}

                    <Button
                      variant="danger"
                      onClick={() => handleDelete(record._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default AdminAttendanceMgmt;
