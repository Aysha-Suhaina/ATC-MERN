import { useEffect, useState } from "react";
import { getProfile } from "../../api/userApi";
import { getAdminDashboardStats } from "../../api/dashboardApi";
import { useNavigate } from "react-router-dom";

import StatCard from "../../components/ui/StatCard";
import Button from "../../components/ui/Button";
import Section from "../../components/ui/Section";
import InfoCard from "../../components/ui/InfoCard";

import PageHeader from "../../components/ui/PageHeader";

import {
  FiUsers,
  FiUserCheck,
  FiBriefcase,
  FiLayers,
  FiClock,
  FiXCircle,
  FiCheckCircle,
  FiTrendingUp,
} from "react-icons/fi";

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
  <div className="page">
    <PageHeader
      title={`Welcome back, ${profile?.name}`}
      subtitle="Monitor your organization, review attendance and manage employees."
    />

    {/* ================= TOP DASHBOARD ================= */}

    <div className="section-grid">
      <Section
        title="Organization Overview"
        description="Current organization statistics."
      >
        {stats && (
          <div className="grid-4">
            <StatCard
              title="Employees"
              value={stats.totalEmployees}
              icon={<FiUsers />}
            />

            <StatCard
              title="Managers"
              value={stats.totalManagers}
              icon={<FiUserCheck />}
              color="#16A34A"
            />

            <StatCard
              title="Departments"
              value={stats.totalDepartments}
              icon={<FiBriefcase />}
              color="#7C3AED"
            />

            <StatCard
              title="Designations"
              value={stats.totalDesignations}
              icon={<FiLayers />}
              color="#EA580C"
            />
          </div>
        )}
      </Section>

      <Section
        title="Attendance Overview"
        description="Live attendance statistics for today."
      >
        {stats && (
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
              title="Pending Requests"
              value={stats.pendingAttendance}
              icon={<FiClock />}
              color="#F59E0B"
            />

            <StatCard
              title="Attendance %"
              value={`${stats.dailySummary.attendanceRate}%`}
              icon={<FiTrendingUp />}
              color="#2563EB"
            />
          </div>
        )}
      </Section>
    </div>

    {/* ================= BOTTOM DASHBOARD ================= */}

    <div className="section-grid">
      <Section
        title="Today's Attendance Summary"
        description="Detailed attendance breakdown for today."
      >
        {stats && (
          <div className="grid-3">
            <InfoCard
              title="Present"
              value={stats.dailySummary.present}
            />

            <InfoCard
              title="Late"
              value={stats.dailySummary.late}
            />

            <InfoCard
              title="Half Day"
              value={stats.dailySummary.halfDay}
            />

            <InfoCard
              title="Leave"
              value={stats.dailySummary.leave}
            />

            <InfoCard
              title="Absent"
              value={stats.dailySummary.absent}
            />

            <InfoCard
              title="Attendance %"
              value={`${stats.dailySummary.attendanceRate}%`}
            />
          </div>
        )}
      </Section>

      <Section
        title="Quick Actions"
        description="Frequently used administrative tasks."
      >
        <div className="grid-2">
          <Button
            onClick={() =>
              navigate("/admin/employees/create")
            }
          >
            Create Employee
          </Button>

          <Button
            onClick={() =>
              navigate("/admin/pending-attendance")
            }
          >
            Pending Attendance
          </Button>

          <Button
            onClick={() =>
              navigate("/admin/reports")
            }
          >
            Reports
          </Button>

          <Button
            onClick={() =>
              navigate("/chat")
            }
          >
            Chat
          </Button>
        </div>
      </Section>
    </div>
  </div>
);
};

export default AdminDashboard;
