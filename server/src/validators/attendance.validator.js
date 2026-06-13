export const validateAttendanceSubmission = (req, res, next) => {
  const {
    date,
    checkInTime,
    checkOutTime,
    attendanceStatus,
  } = req.body;

  if (!date || !checkInTime || !checkOutTime) {
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