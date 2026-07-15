const ReportOverview = ({
  stats,
}) => {
  if (!stats) return null;

  return (
    <>
      <h2>
        Attendance Overview
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <Card
          title="Present Today"
          value={stats.presentToday}
        />

        <Card
          title="Absent Today"
          value={stats.absentToday}
        />

        <Card
          title="Pending Approval"
          value={stats.pendingAttendance}
        />

        <Card
          title="Attendance Rate"
          value={`${stats.dailySummary.attendanceRate}%`}
        />
      </div>
    </>
  );
};

const Card = ({
  title,
  value,
}) => (
  <div
    style={{
      border: "1px solid #ddd",
      borderRadius: "10px",
      padding: "20px",
    }}
  >
    <h4>{title}</h4>

    <h2>{value}</h2>
  </div>
);

export default ReportOverview;