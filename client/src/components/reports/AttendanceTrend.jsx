const AttendanceTrend = ({ trend }) => {
  if (!trend) return null;

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Day</th>
            <th>Present</th>
            <th>Absent</th>
          </tr>
        </thead>

        <tbody>
          {trend.map((day) => (
            <tr key={day.day}>
              <td>{day.day}</td>

              <td>
                <span className="status-badge approved">
                  {day.present}
                </span>
              </td>

              <td>
                <span className="status-badge rejected">
                  {day.absent}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTrend;