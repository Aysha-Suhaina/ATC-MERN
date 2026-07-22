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
import { downloadReport } from "../../api/reportApi";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Section from "../../components/ui/Section";
const Reports = () => {
  const [stats, setStats] = useState(null);

  const [departments, setDepartments] = useState([]);

  const [employees, setEmployees] = useState([]);

  const [department, setDepartment] = useState("");

  const [employee, setEmployee] = useState("");

  useEffect(() => {
    const loadData = async () => {
      const dashboardRes = await getAdminDashboardStats();
      console.log("Dashboard response:", dashboardRes.data);

      setStats(dashboardRes.data.stats);

      const deptRes = await getDepartments();

      setDepartments(deptRes.data.departments);

      const empRes = await getEmployees();

      setEmployees(empRes.data.employees);
    };

    loadData();
  }, []);
  console.log("stats =", stats);
  console.log("departments =", departments);
  console.log("employees =", employees);
  return (
    <div className="page">
      <PageHeader
        title="Reports & Analytics"
        subtitle="Monitor attendance trends and generate organization reports."
      />

      {/* ================= OVERVIEW ================= */}

      <Section
        title="Attendance Overview"
        description="Quick overview of today's attendance statistics."
      >
        <ReportOverview stats={stats} />
      </Section>

      {/* ================= ANALYTICS ================= */}

      <Section
        title="Attendance Analytics"
        description="Attendance trends and monthly summary."
      >
        <div className="content-grid">
          <Card>
            <AttendanceTrend trend={stats?.attendanceTrend} />
          </Card>

          <Card>
            <MonthlySummary summary={stats?.monthlySummary} />
          </Card>
        </div>
      </Section>

      {/* ================= EXPORTS ================= */}

      <Section
        title="Download Reports"
        description="Export attendance reports in CSV or Excel format."
      >
        <Card>
          <DownloadReports />
        </Card>
      </Section>

      {/* ================= REPORT GENERATORS ================= */}

      <Section
        title="Generate Custom Reports"
        description="Generate reports for a specific department or employee."
      >
        <div className="dashboard-grid-2">
          <Card>
            <DepartmentReport
              departments={departments}
              department={department}
              setDepartment={setDepartment}
              downloadReport={downloadReport}
            />
          </Card>

          <Card>
            <EmployeeReport
              employees={employees}
              employee={employee}
              setEmployee={setEmployee}
              downloadReport={downloadReport}
            />
          </Card>
        </div>
      </Section>
    </div>
  );
};

export default Reports;
