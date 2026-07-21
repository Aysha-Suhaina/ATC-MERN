export const getReportFileName = (
  type,
  extension,
  id = null
) => {
  const today = new Date();

  const pad = (num) =>
    String(num).padStart(2, "0");

  const yyyy = today.getFullYear();
  const mm = pad(today.getMonth() + 1);
  const dd = pad(today.getDate());

  switch (type) {
    case "daily":
      return `attendance-report-${yyyy}-${mm}-${dd}.${extension}`;

    case "weekly": {
      const start = new Date(today);
      start.setDate(today.getDate() - 6);

      const sy = start.getFullYear();
      const sm = pad(start.getMonth() + 1);
      const sd = pad(start.getDate());

      return `attendance-report-week-${sy}-${sm}-${sd}_to_${yyyy}-${mm}-${dd}.${extension}`;
    }

    case "monthly":
      return `attendance-report-${yyyy}-${mm}.${extension}`;

    case "department":
      return `department-report-${id || "all"}-${yyyy}-${mm}.${extension}`;

    case "user":
      return `employee-report-${id || "employee"}-${yyyy}-${mm}.${extension}`;

    default:
      return `attendance-report.${extension}`;
  }
};