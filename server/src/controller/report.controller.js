import { getAttendanceReport } from "../services/report.service.js";

import { convertToCSV } from "../utils/csvExporter.js";

import { exportAttendanceExcel } from "../utils/excelExporter.js";
import { getReportFileName } from "../utils/reportFileName.js";
import { buildReportFilter } from "../utils/reportFilters.js";

// export const exportDailyCSV = async (
//   req,
//   res
// ) => {

//   try {

//     const today = new Date();

//     today.setHours(
//       0,
//       0,
//       0,
//       0
//     );

//     const tomorrow = new Date(today);

//     tomorrow.setDate(
//       tomorrow.getDate() + 1
//     );

//     const report =
//       await getAttendanceReport({

//         date: {

//           $gte: today,

//           $lt: tomorrow,

//         },

//       });

//     const csv =
//       convertToCSV(report);

//     res.header(
//       "Content-Type",
//       "text/csv"
//     );

//     res.attachment(
//       "daily-attendance.csv"
//     );

//     return res.send(csv);

//   }

//   catch (error) {

//     return res.status(500).json({

//       success: false,

//       msg: error.message,

//     });

//   }

// };

export const exportCSV = async (req, res) => {
  try {
    const filter = buildReportFilter(
      req.params.type,

      {
        userId: req.params.id,
      },
    );


    let report = await getAttendanceReport(filter);

    if (req.params.type === "department") {
      report = report.filter(
        (item) => item.user?.department?._id.toString() === req.params.id,
      );
    }

    const csv = convertToCSV(report);

    res.setHeader(
      "Content-Type",

      "text/csv",
    );

    const fileName = getReportFileName(req.params.type, "csv", req.params.id);

    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);

    const allowed = ["daily", "weekly", "monthly", "user", "department"];

    if (!allowed.includes(req.params.type)) {
      return res.status(400).json({
        success: false,
        msg: "Invalid report type",
      });
    }

    return res.send(csv);
  } catch (error) {
    return res.status(500).json({
      success: false,

      msg: error.message,
    });
  }
};
export const exportExcel = async (req, res) => {


  const filter = buildReportFilter(req.params.type, {
    userId: req.params.id,
  });

  let report = await getAttendanceReport(filter);

  if (req.params.type === "department") {
    report = report.filter(
      (item) => item.user?.department?._id.toString() === req.params.id,
    );
  }

  const fileName = getReportFileName(req.params.type, "xlsx", req.params.id);

  await exportAttendanceExcel(report, res, fileName);
};

// export const exportdailyExcel = async (
//     req,
//     res
//   ) => {

//     try {

//       const today =
//         new Date();

//       today.setHours(
//         0,
//         0,
//         0,
//         0
//       );

//       const tomorrow =
//         new Date(today);

//       tomorrow.setDate(
//         tomorrow.getDate() + 1
//       );

//       const report =
//         await getAttendanceReport({

//           date: {

//             $gte: today,

//             $lt: tomorrow,

//           },

//         });

//       await exportAttendanceExcel(

//   report,

//   res,

//   req.params.type

// );

//     }

//     catch (error) {

//       res.status(500).json({

//         success: false,

//         msg: error.message,

//       });

//     }

//   };
