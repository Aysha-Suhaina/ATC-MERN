const MonthlySummary = ({
  summary,
}) => {
  if (!summary) return null;

  return (
    <>
      <h2>
        Monthly Summary
      </h2>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          marginBottom: "30px",
        }}
      >
        <tbody>
          <tr>
            <td>
              Present
            </td>

            <td>
              {summary.present}
            </td>
          </tr>

          <tr>
            <td>Late</td>

            <td>
              {summary.late}
            </td>
          </tr>

          <tr>
            <td>
              Half Day
            </td>

            <td>
              {summary.halfDay}
            </td>
          </tr>

          <tr>
            <td>Leave</td>

            <td>
              {summary.leave}
            </td>
          </tr>

          <tr>
            <td>
              Attendance %
            </td>

            <td>
              {summary.attendanceRate}%
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default MonthlySummary;