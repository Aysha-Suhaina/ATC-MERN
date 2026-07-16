import { useEffect, useState } from "react";
import { getProfile } from "../../api/userApi";
import { getAdminDashboardStats } from "../../api/dashboardApi";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import StatCard from "../../components/ui/StatCard";
import Button from "../../components/ui/Button";
import Section from "../../components/ui/Section";

import PageHeader from "../../components/ui/PageHeader";

import {
  FiUsers,
  FiUserCheck,
  FiBriefcase,
  FiLayers,
  FiCalendar,
  FiClock,
  FiXCircle,
} from "react-icons/fi";

import DashboardCard from "../../components/admin/DashboardCard";
import DashboardMiniCard from "../../components/admin/DashboardMiniCard";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();

        setProfile(res.data?.data ?? res.data);

        const statsRes = await getAdminDashboardStats();

        setStats(statsRes.data.stats);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      {/* ================= HERO ================= */}

      <PageHeader
        title={`Welcome back, ${profile?.name}`}
        subtitle="Monitor your organization, review attendance and manage employees."
        action={
          <Link to="/chat">
            <Button className="btn btn-primary">Open Chat</Button>
          </Link>
        }
      />

      {/* ================= ORGANIZATION ================= */}

      <h2>Organization Overview</h2>

      {stats && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: "20px",
            marginTop: "20px",
            marginBottom: "40px",
          }}
        >
          <DashboardCard title="Employees" value={stats.totalEmployees} />

          <DashboardCard title="Managers" value={stats.totalManagers} />

          <DashboardCard title="Departments" value={stats.totalDepartments} />

          <DashboardCard title="Designations" value={stats.totalDesignations} />
        </div>
      )}

      {/* ================= ATTENDANCE ================= */}

      <h2>Attendance Overview</h2>

      {stats && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: "20px",
            marginTop: "20px",
            marginBottom: "40px",
          }}
        >
          <DashboardCard title="Present Today" value={stats.presentToday} />

          <DashboardCard title="Absent Today" value={stats.absentToday} />

          <DashboardCard
            title="Pending Requests"
            value={stats.pendingAttendance}
          />

          <DashboardCard
            title="Attendance %"
            value={`${stats.dailySummary.attendanceRate}%`}
          />
        </div>
      )}

      {/* ================= DAILY SUMMARY ================= */}

      {stats && (
        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "20px",
            marginBottom: "40px",
          }}
        >
          <h2>Today's Attendance Summary</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
              gap: "20px",
            }}
          >
            <DashboardMiniCard
              title="Present"
              value={stats.dailySummary.present}
            />

            <DashboardMiniCard title="Late" value={stats.dailySummary.late} />

            <DashboardMiniCard
              title="Half Day"
              value={stats.dailySummary.halfDay}
            />

            <DashboardMiniCard title="Leave" value={stats.dailySummary.leave} />

            <DashboardMiniCard
              title="Absent"
              value={stats.dailySummary.absent}
            />

            <DashboardMiniCard
              title="Attendance %"
              value={`${stats.dailySummary.attendanceRate}%`}
            />
          </div>
        </div>
      )}

      {/* ================= QUICK ACTIONS ================= */}

      <h2>Quick Actions</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
        }}
      >
        <Button onClick={() => navigate("/admin/employees/create")}>
          ➕ Create Employee
        </Button>

        <Button onClick={() => navigate("/admin/pending-attendance")}>
          📝 Pending Attendance
        </Button>

        <Button onClick={() => navigate("/admin/reports")}>📄 Reports</Button>

        <Button onClick={() => navigate("/chat")}>💬 Chat</Button>
      </div>
    </div>
  );
};

export default AdminDashboard;
