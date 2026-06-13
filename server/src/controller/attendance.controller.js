import Attendance from "../model/Attendance.js";
import ApiResponse from "../utils/ApiResponse.js";

export const submitAttendance = async (
  req,
  res,
  next
) => {
  try {
    const {
      date,
      checkInTime,
      checkOutTime,
      attendanceStatus,
      remarks,
    } = req.body;

    const existing = await Attendance.findOne({
      user: req.user.id,
      date,
    });

    if (existing) {
      return res.status(400).json({
        message:
          "Attendance already submitted",
      });
    }

    const totalHours =
      (new Date(checkOutTime) -
        new Date(checkInTime)) /
      (1000 * 60 * 60);

    const attendance =
      await Attendance.create({
        user: req.user.id,
        date,
        checkInTime,
        checkOutTime,
        totalHours,
        attendanceStatus,
        remarks,
      });

    return res.status(201).json(
      new ApiResponse(
        201,
        "Attendance submitted",
        attendance
      )
    );
  } catch (error) {
    next(error);
  }
};

export const getMyAttendance = async (
  req,
  res,
  next
) => {
  try {
    const attendance =
      await Attendance.find({
        user: req.user.id,
      }).sort({ createdAt: -1 });

    return res.status(200).json(
      new ApiResponse(
        200,
        "Attendance fetched",
        attendance
      )
    );
  } catch (error) {
    next(error);
  }
};

export const getPendingAttendance =
  async (req, res, next) => {
    try {
      const attendance =
        await Attendance.find({
          approvalStatus: "pending",
        })
          .populate("user")
          .sort({
            createdAt: -1,
          });

      return res.status(200).json(
        new ApiResponse(
          200,
          "Pending attendance fetched",
          attendance
        )
      );
    } catch (error) {
      next(error);
    }
  };

export const approveAttendance =
  async (req, res, next) => {
    try {
      const { attendanceId } = req.params;
      const { remarks } = req.body;

      const attendance =
        await Attendance.findById(
          attendanceId
        );

      if (!attendance) {
        return res.status(404).json({
          message:
            "Attendance not found",
        });
      }

      attendance.approvalStatus =
        "approved";

      attendance.approvedBy =
        req.user.id;

      attendance.approvedAt =
        new Date();

      attendance.remarks = remarks;

      await attendance.save();

      return res.status(200).json(
        new ApiResponse(
          200,
          "Attendance approved",
          attendance
        )
      );
    } catch (error) {
      next(error);
    }
  };

export const rejectAttendance =
  async (req, res, next) => {
    try {
      const { attendanceId } = req.params;
      const { remarks } = req.body;

      const attendance =
        await Attendance.findById(
          attendanceId
        );

      if (!attendance) {
        return res.status(404).json({
          message:
            "Attendance not found",
        });
      }

      attendance.approvalStatus =
        "rejected";

      attendance.approvedBy =
        req.user.id;

      attendance.approvedAt =
        new Date();

      attendance.remarks = remarks;

      await attendance.save();

      return res.status(200).json(
        new ApiResponse(
          200,
          "Attendance rejected",
          attendance
        )
      );
    } catch (error) {
      next(error);
    }
  };