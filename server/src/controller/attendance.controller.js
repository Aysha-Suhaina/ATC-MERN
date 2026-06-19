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

    const parsedDate = new Date(date);

    const normalizeDateTime = (
      value,
      fallbackDate
    ) => {
      if (!value) return null;

      const direct = new Date(value);
      if (!Number.isNaN(direct.getTime())) {
        return direct;
      }

      if (
        typeof value === "string" &&
        value.includes(":") &&
        !value.includes("T") &&
        fallbackDate
      ) {
        const combined = new Date(
          `${fallbackDate}T${value}`
        );
        if (!Number.isNaN(combined.getTime())) {
          return combined;
        }
      }

      return null;
    };

    const normalizedCheckIn = normalizeDateTime(
      checkInTime,
      date
    );
    const normalizedCheckOut = normalizeDateTime(
      checkOutTime,
      date
    );

    if (
      Number.isNaN(parsedDate.getTime()) ||
      !normalizedCheckIn ||
      !normalizedCheckOut
    ) {
      return res.status(400).json({
        message:
          "Please provide valid date and time values",
      });
    }

    const existing = await Attendance.findOne({
      user: req.user.id,
      date: parsedDate,
    });

    if (existing) {
      return res.status(400).json({
        message:
          "Attendance already submitted",
      });
    }

    const totalHours =
      Math.max(
        0,
        (normalizedCheckOut - normalizedCheckIn) /
          (1000 * 60 * 60)
      ) || 0;

    const attendance =
      await Attendance.create({
        user: req.user.id,
        date: parsedDate,
        checkInTime: normalizedCheckIn,
        checkOutTime: normalizedCheckOut,
        totalHours: Number(totalHours.toFixed(2)),
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