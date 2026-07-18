import { useEffect, useState } from "react";

import { getDepartments } from "../../api/departmentApi";

import { getEmployees } from "../../api/userApi";

import ReportOverview from "../../components/reports/ReportOverview";
import AttendanceTrend from "../../components/reports/AttendanceTrend";
import MonthlySummary from "../../components/reports/MonthlySummary";
import DownloadReports from "../../components/reports/DownloadReports";
import DepartmentReport from "../../components/reports/DepartmentReport";
import EmployeeReport from "../../components/reports/EmployeeReport";
import { getAdminDashboardStats } from "../../api/dashboardApi";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
const Reports = () => {
  const [stats, setStats] = useState(null);

  const [departments, setDepartments] = useState([]);

  const [employees, setEmployees] = useState([]);

  const [department, setDepartment] = useState("");

  const [employee, setEmployee] = useState("");

  useEffect(() => {
    const loadData = async () => {
      const dashboardRes = await getAdminDashboardStats();

      setStats(dashboardRes.data.stats);

      const deptRes = await getDepartments();

      setDepartments(deptRes.data.departments);

      const empRes = await getEmployees();

      setEmployees(empRes.data.employees);
    };

    loadData();
  }, []);
  return (
    <div className="page-container">
      <PageHeader
        title="Reports & Analytics"
        subtitle="Monitor attendance trends and generate organization reports."
      />

      {/* ================= OVERVIEW ================= */}

      <Card>
        <h2>Overview</h2>

        <ReportOverview stats={stats} />
      </Card>

      {/* ================= ANALYTICS ================= */}

      <div className="dashboard-grid-2">
        <Card>
          <h2>Attendance Trend</h2>

          <AttendanceTrend trend={stats?.attendanceTrend} />
        </Card>

        <Card>
          <h2>Monthly Summary</h2>

          <MonthlySummary summary={stats?.monthlySummary} />
        </Card>
      </div>

      {/* ================= EXPORTS ================= */}

      <Card>
        <h2>Download Reports</h2>

        <DownloadReports />
      </Card>

      {/* ================= REPORT GENERATORS ================= */}

      <div className="dashboard-grid-2">
        <Card>
          <h2>Department Report</h2>

          <DepartmentReport
            departments={departments}
            department={department}
            setDepartment={setDepartment}
          />
        </Card>

        <Card>
          <h2>Employee Report</h2>

          <EmployeeReport
            employees={employees}
            employee={employee}
            setEmployee={setEmployee}
          />
        </Card>
      </div>
    </div>
  );
};

export default Reports;
