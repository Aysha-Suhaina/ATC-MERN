import Attendance from "../models/Attendance.js";

export const calculateTotalHours = (
  checkInTime,
  checkOutTime
) => {
  return (
    (new Date(checkOutTime) -
      new Date(checkInTime)) /
    (1000 * 60 * 60)
  );
};

export const createAttendanceRecord = async (
  attendanceData
) => {
  return await Attendance.create(attendanceData);
};

export const getAttendanceById = async (id) => {
  return await Attendance.findById(id);
};