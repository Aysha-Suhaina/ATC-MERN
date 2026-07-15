import ExcelJS from "exceljs";

export const exportAttendanceExcel = async (
  attendance,
  res,
  fileName
) => {
  const workbook = new ExcelJS.Workbook();

  const worksheet =
    workbook.addWorksheet(
      "Attendance Report"
    );

  worksheet.columns = [
    {
      header: "Employee",
      key: "employee",
      width: 25,
    },
    {
      header: "Email",
      key: "email",
      width: 30,
    },
    {
      header: "Department",
      key: "department",
      width: 20,
    },
    {
      header: "Designation",
      key: "designation",
      width: 20,
    },
    {
      header: "Date",
      key: "date",
      width: 18,
    },
    {
      header: "Check In",
      key: "checkIn",
      width: 15,
    },
    {
      header: "Check Out",
      key: "checkOut",
      width: 15,
    },
    {
      header: "Hours",
      key: "hours",
      width: 10,
    },
    {
      header: "Attendance",
      key: "attendance",
      width: 15,
    },
    {
      header: "Approval",
      key: "approval",
      width: 15,
    },
  ];

  worksheet.getRow(1).font = {
    bold: true,
  };

  worksheet.getRow(1).alignment = {
    vertical: "middle",
    horizontal: "center",
  };
  console.log(attendance.length);
  console.log(attendance[0]);

  attendance.forEach((item) => {

    worksheet.addRow({

      employee:
        item.user?.name,

      email:
        item.user?.email,

      department:
        item.user?.department?.name,

      designation:
        item.user?.designation?.name,

      date: new Date(
        item.date
      ).toLocaleDateString(),

      checkIn: item.checkInTime
        ? new Date(
            item.checkInTime
          ).toLocaleTimeString()
        : "",

      checkOut: item.checkOutTime
        ? new Date(
            item.checkOutTime
          ).toLocaleTimeString()
        : "",

      hours:
        item.totalHours,

      attendance:
        item.attendanceStatus,

      approval:
        item.approvalStatus,

    });

  });

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );

  res.setHeader(
    "Content-Disposition",
    `attachment; filename=${fileName}.xlsx`
  );

  await workbook.xlsx.write(res);

  res.end();
};