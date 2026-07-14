import Attendance from "../model/Attendance.js";

export const getAttendanceReport = async (
  filter = {}
) => {

  return await Attendance.find(filter)
    .populate({
      path: "user",
      select:
        "name email department designation",
      populate: [
        {
          path: "department",
          select: "name",
        },
        {
          path: "designation",
          select: "name",
        },
      ],
    })
    .sort({ date: -1 });

};