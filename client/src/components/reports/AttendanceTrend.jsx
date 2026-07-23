const AttendanceTrend = ({ trend }) => {
  if (!trend) return null;

  return (
    <div className="table-wrapper">
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
                <span className="badge badge-success">{day.present}</span>
              </td>

              <td>
                <span className="badge badge-danger">{day.absent}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTrend;
