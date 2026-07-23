export const convertToCSV = (
  attendance
) => {

  const headers = [
    "Employee",
    "Email",
    "Department",
    "Designation",
    "Date",
    "Check In",
    "Check Out",
    "Hours",
    "Attendance",
    "Approval",
  ];

  const rows = attendance.map(
    (item) => [

      item.user?.name,

      item.user?.email,

      item.user?.department?.name,

      item.user?.designation?.name,

      new Date(
        item.date
      ).toLocaleDateString(),

      item.checkInTime
        ? new Date(
            item.checkInTime
          ).toLocaleTimeString()
        : "",

      item.checkOutTime
        ? new Date(
            item.checkOutTime
          ).toLocaleTimeString()
        : "",

      item.totalHours,

      item.attendanceStatus,

      item.approvalStatus,

    ]
  );

  return [headers, ...rows]
    .map((row) => row.join(","))
    .join("\n");

};