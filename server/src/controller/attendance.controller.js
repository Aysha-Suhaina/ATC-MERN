import Attendance from "../model/Attendance.js";
import ApiResponse from "../utils/ApiResponse.js";

export const submitAttendance = async (
  req,
  res,
  next
) => {
  try {
    const {
      checkInTime,
      checkOutTime,
      attendanceStatus,
      remarks,
    } = req.body;
    const attendanceDate = new Date();
    attendanceDate.setHours(0, 0, 0, 0);
    const parsedDate = attendanceDate;

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
          `${fallbackDate.toISOString().split("T")[0]}T${value}`
        );
        if (!Number.isNaN(combined.getTime())) {
          return combined;
        }
      }

      return null;
    };

    const normalizedCheckIn = normalizeDateTime(
      checkInTime,
      attendanceDate
    );
    const normalizedCheckOut = normalizeDateTime(
      checkOutTime,
      attendanceDate
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
      date: attendanceDate,
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
        date: attendanceDate,
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

export const getAllAttendance = async (
  req,
  res,
  next
) => {
  try {
    const attendance = await Attendance.find()
      .populate({
    path: "user",
    select: "name email role department designation",
    populate: [
        { path: "department" },
        { path: "designation" }
    ]
})
      .sort({ date: -1 });

    return res.status(200).json(
      new ApiResponse(
        200,
        "All attendance fetched",
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
      }).sort({ date : -1 });

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

export const getAttendanceById = async (
  req,
  res,
  next
) => {
  try {
    const attendance = await Attendance.findById(
      req.params.attendanceId
    );

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance not found",
      });
    }

    if (
      attendance.user.toString() !==
      req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

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
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const attendance =
        await Attendance.find({
          approvalStatus: "pending",
          date: { $gte: today },
        })
          .populate({
    path: "user",
    populate: [
        { path: "department" },
        { path: "designation" }
    ]
})
          .sort({ date: -1 });

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

      attendance.rejectedBy =
        req.user.id;

      attendance.rejectedAt =
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

export const deleteAttendance = async (
  req,
  res,
  next
) => {
  try {
    const attendance = await Attendance.findByIdAndDelete(
      req.params.attendanceId
    );

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance not found",
      });
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        "Attendance deleted",
        attendance
      )
    );
  } catch (error) {
    next(error);
  }
};

export const resubmitAttendance = async (
  req,
  res,
  next
) => {
  try {
    const attendance = await Attendance.findById(
      req.params.id
    );

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance not found",
      });
    }

    if (
      attendance.user.toString() !==
      req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (
      attendance.approvalStatus !== "rejected"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Only rejected attendance can be edited",
      });
    }

    const baseDate = attendance.date || new Date();

    const normalizeTimeToDate = (
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
        !value.includes("T")
      ) {
        const combined = new Date(
          `${fallbackDate.toISOString().slice(
            0,
            10
          )}T${value}`
        );

        if (!Number.isNaN(combined.getTime())) {
          return combined;
        }
      }

      return null;
    };

    const normalizedCheckIn = normalizeTimeToDate(
      req.body.checkInTime,
      baseDate
    );
    const normalizedCheckOut = normalizeTimeToDate(
      req.body.checkOutTime,
      baseDate
    );

    if (
      !normalizedCheckIn ||
      !normalizedCheckOut
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid check-in or check-out time",
      });
    }

    attendance.checkInTime = normalizedCheckIn;
    attendance.checkOutTime = normalizedCheckOut;
    attendance.remarks = req.body.remarks || "";
    attendance.totalHours = Number(
      Math.max(
        0,
        (normalizedCheckOut - normalizedCheckIn) /
          (1000 * 60 * 60)
      ).toFixed(2)
    );

    attendance.approvalStatus = "pending";
    attendance.rejectionReason = "";
    attendance.rejectedBy = null;
    attendance.rejectedAt = null;

    await attendance.save();

    return res.status(200).json({
      success: true,
      message: "Attendance resubmitted successfully",
      attendance,
    });
  } catch (error) {
    next(error);
  }
};