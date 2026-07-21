const MonthlySummary = ({ summary }) => {
  if (!summary) return null;

  return (
    <div className="table-container">
      <table className="table">
        <tbody>
          <tr>
            <td>Present</td>
            <td>{summary.present}</td>
          </tr>

          <tr>
            <td>Late</td>
            <td>{summary.late}</td>
          </tr>

          <tr>
            <td>Half Day</td>
            <td>{summary.halfDay}</td>
          </tr>

          <tr>
            <td>Leave</td>
            <td>{summary.leave}</td>
          </tr>

          <tr>
            <td>
              <strong>Attendance %</strong>
            </td>

            <td>
              <strong>{summary.attendanceRate}%</strong>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MonthlySummary;