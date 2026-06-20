export const validateAttendanceSubmission = (req, res, next) => {
  const {
    date,
    checkInTime,
    checkOutTime,
    attendanceStatus,
  } = req.body;

  const isResubmitRequest =
    req.method === "PUT" ||
    req.originalUrl.endsWith("/resubmit");

  if (!checkInTime || !checkOutTime) {
    return res.status(400).json({
      message: "Required fields missing",
    });
  }

  if (!isResubmitRequest && !date) {
    return res.status(400).json({
      message: "Required fields missing",
    });
  }

  const validStatuses = [
    "present",
    "absent",
    "half_day",
    "late",
    "leave",
  ];

  if (
    attendanceStatus &&
    !validStatuses.includes(attendanceStatus)
  ) {
    return res.status(400).json({
      message: "Invalid attendance status",
    });
  }

  next();
};