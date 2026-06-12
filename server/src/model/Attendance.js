import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    checkInTime: {
      type: Date,
      required: true,
    },

    checkOutTime: {
      type: Date,
    },

    totalHours: {
      type: Number,
      default: 0,
    },

    attendanceStatus: {
      type: String,
      enum: [
        "present",
        "absent",
        "half_day",
        "late",
        "leave",
      ],
      default: "present",
    },

    approvalStatus: {
      type: String,
      enum: [
        "pending",
        "approved",
        "rejected",
      ],
      default: "pending",
    },

    remarks: {
      type: String,
      trim: true,
    },

    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    approvedAt: Date,
  },
  {
    timestamps: true,
  }
);

attendanceSchema.index(
  {
    user: 1,
    date: 1,
  },
  {
    unique: true,
  }
);

export default mongoose.model(
  "Attendance",
  attendanceSchema
);