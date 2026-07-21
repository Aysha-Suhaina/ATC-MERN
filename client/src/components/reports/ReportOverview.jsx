import {
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiTrendingUp,
} from "react-icons/fi";

import StatCard from "../ui/StatCard";

const ReportOverview = ({ stats }) => {
  if (!stats) return null;

  return (
    <div className="grid-4">
      <StatCard
        title="Present Today"
        value={stats.presentToday}
        icon={<FiCheckCircle />}
        color="#16A34A"
      />

      <StatCard
        title="Absent Today"
        value={stats.absentToday}
        icon={<FiXCircle />}
        color="#DC2626"
      />

      <StatCard
        title="Pending Approval"
        value={stats.pendingAttendance}
        icon={<FiClock />}
        color="#F59E0B"
      />

      <StatCard
        title="Attendance Rate"
        value={`${stats.dailySummary.attendanceRate}%`}
        icon={<FiTrendingUp />}
        color="#2563EB"
      />
    </div>
  );
};

export default ReportOverview;