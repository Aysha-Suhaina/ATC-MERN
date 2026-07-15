const AttendanceTrend = ({
  trend,
}) => {
  if (!trend) return null;

  return (
    <>
      <h2>
        Attendance Trend
      </h2>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          marginBottom: "30px",
        }}
      >
        <thead>
          <tr>
            <th>Day</th>

            <th>Present</th>

            <th>Absent</th>
          </tr>
        </thead>

        <tbody>
          {trend.map(
            (day) => (
              <tr
                key={day.day}
              >
                <td>
                  {day.day}
                </td>

                <td>
                  {day.present}
                </td>

                <td>
                  {day.absent}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </>
  );
};

export default AttendanceTrend;