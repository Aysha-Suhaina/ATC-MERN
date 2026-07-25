import User from "../model/User.js";
import Department from "../model/Department.js";
import Designation from "../model/Designation.js";
import Attendance from "../model/Attendance.js";

export const getAdminDashboard = async (
  req,
  res
) => {
  try {

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(
      tomorrow.getDate(

      ) + 1
    );

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(
      0,
      0,
      0,
      0
    );

    const endOfMonth =
      new Date(startOfMonth);

    endOfMonth.setMonth(
      endOfMonth.getMonth() + 1
    );

    // Organization Statistics

    const [
      totalEmployees,
      totalManagers,
      totalDepartments,
      totalDesignations,
      todayAttendance,
      monthlyAttendance,
      pendingAttendance,
approvedAttendance,
rejectedAttendance,
recentActivities
    ] = await Promise.all([
      User.countDocuments({
        role: "employee",
        isActive: true,
      }),

      User.countDocuments({
        role: "manager",
        isActive: true,
      }),

      Department.countDocuments(),

      Designation.countDocuments({
        isActive: true,
      }),

      Attendance.find({
        date: {
          $gte: today,
          $lt: tomorrow,
        },
      }),

      Attendance.find({
        date: {
          $gte: startOfMonth,
          $lt: endOfMonth,
        },
      }),

      Attendance.countDocuments({
        approvalStatus: "pending",
      }),
      Attendance.countDocuments({
        approvalStatus: "approved",
      }),
      Attendance.countDocuments({
        approvalStatus: "rejected",
      }),

      Attendance.find()
  .sort({ createdAt: -1 })
  .limit(10)
  .populate({
    path: "user",
    select: "name department",
    populate: {
      path: "department",
      select: "name",
    },
  }),
    ]);

    // Today's Summary


    const presentToday =
      todayAttendance.length;

    const absentToday =
      totalEmployees -
      presentToday;

    const dailySummary = {
      present:
        todayAttendance.filter(
          (a) =>
            a.attendanceStatus ===
            "present"
        ).length,

      late:
        todayAttendance.filter(
          (a) =>
            a.attendanceStatus ===
            "late"
        ).length,

      halfDay:
        todayAttendance.filter(
          (a) =>
            a.attendanceStatus ===
            "half_day"
        ).length,

      leave:
        todayAttendance.filter(
          (a) =>
            a.attendanceStatus ===
            "leave"
        ).length,

      absent: absentToday,

      attendanceRate:
        totalEmployees === 0
          ? 0
          : Math.round(
              (presentToday /
                totalEmployees) *
                100
            ),
    };

    // Monthly Summary

    const monthlySummary = {
      present:
        monthlyAttendance.filter(
          (a) =>
            a.attendanceStatus ===
            "present"
        ).length,

      late:
        monthlyAttendance.filter(
          (a) =>
            a.attendanceStatus ===
            "late"
        ).length,

      halfDay:
        monthlyAttendance.filter(
          (a) =>
            a.attendanceStatus ===
            "half_day"
        ).length,

      leave:
        monthlyAttendance.filter(
          (a) =>
            a.attendanceStatus ===
            "leave"
        ).length,
    };

    const daysPassed =
      new Date().getDate();

    const expectedAttendance =
      totalEmployees *
      daysPassed;

    monthlySummary.attendanceRate =
      expectedAttendance === 0
        ? 0
        : Math.round(
            (monthlyAttendance.length /
              expectedAttendance) *
              100
          );

     // Attendance Trend (Last 7 Days)
    // ========

    const attendanceTrend = [];

    for (let i = 6; i >= 0; i--) {
      const dayStart = new Date();
      dayStart.setDate(
        dayStart.getDate() - i
      );
      dayStart.setHours(
        0,
        0,
        0,
        0
      );

      const dayEnd =
        new Date(dayStart);

      dayEnd.setDate(
        dayEnd.getDate() + 1
      );

      const count =
        await Attendance.countDocuments({
          date: {
            $gte: dayStart,
            $lt: dayEnd,
          },
        });

      attendanceTrend.push({
          day: dayStart.toLocaleDateString(
          "en-US",
          {
            weekday: "short",
          }
        ),
        present: count,
        absent:
          totalEmployees -
          count,
      });
    }

    //approval sumary

    const approvalSummary = {
  pending: pendingAttendance,

  approved: approvedAttendance,

  rejected: rejectedAttendance,

  total:
    pendingAttendance +
    approvedAttendance +
    rejectedAttendance,
};

//recent activity 

const activityFeed =
  recentActivities.map(
    (attendance) => ({
      id: attendance._id,

      employee:
        attendance.user?.name,

      department:
        attendance.user?.department
          ?.name || "N/A",

      attendanceStatus:
        attendance.attendanceStatus,

      approvalStatus:
        attendance.approvalStatus,

      checkIn:
        attendance.checkInTime,

      checkOut:
        attendance.checkOutTime,

      date:
        attendance.date,

      createdAt:
        attendance.createdAt,
    })
  );

    // Response

    res.json({
      success: true,

      stats: {
        totalEmployees,
        totalManagers,
        totalDepartments,
        totalDesignations,

        presentToday,
        absentToday,
        pendingAttendance,

        dailySummary,
        monthlySummary,
        attendanceTrend,
        approvalSummary,
        recentActivities: activityFeed,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getDailyReport = async (
  req,
  res
) => {
  try {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);

    tomorrow.setDate(
      tomorrow.getDate() + 1
    );

    const attendance =
      await Attendance.find({
        date: {
          $gte: today,
          $lt: tomorrow,
        },
      })
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
        .sort({
          checkInTime: -1,
        });
        const attendanceStatus = {
  pending: await Attendance.countDocuments({
    approvalStatus: "pending",
  }),

  approved: await Attendance.countDocuments({
    approvalStatus: "approved",
  }),

  rejected: await Attendance.countDocuments({
    approvalStatus: "rejected",
  }),
};

    res.json({
      success: true,
      total: attendance.length,
      report: attendance,
      attendanceStatus
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};