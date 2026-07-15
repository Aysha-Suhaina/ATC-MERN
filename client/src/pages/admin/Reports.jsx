import {
  useEffect,
  useState,
} from "react";


import {
  getDepartments,
} from "../../api/departmentApi";

import {
  getEmployees,
} from "../../api/userApi";

import ReportOverview from "../../components/reports/ReportOverview";
import AttendanceTrend from "../../components/reports/AttendanceTrend";
import MonthlySummary from "../../components/reports/MonthlySummary";
import DownloadReports from "../../components/reports/DownloadReports";
import DepartmentReport from "../../components/reports/DepartmentReport";
import EmployeeReport from "../../components/reports/EmployeeReport";
import { getAdminDashboardStats } from "../../api/dashboardApi";
const Reports = () => {

  const [stats, setStats] =
  useState(null);

const [departments, setDepartments] =
  useState([]);

const [employees, setEmployees] =
  useState([]);

const [department, setDepartment] =
  useState("");

const [employee, setEmployee] =
  useState("");

  useEffect(() => {
  const loadData = async () => {
    const dashboardRes =
      await getAdminDashboardStats();

    setStats(dashboardRes.data.stats);

    const deptRes =
      await getDepartments();

    setDepartments(
      deptRes.data.departments
    );

    const empRes =
      await getEmployees();

    setEmployees(
      empRes.data.employees
    );
  };

  loadData();
}, []);
 return (

  <>
<h1>Reports & Analytics</h1>

<ReportOverview
  stats={stats}
/>

<AttendanceTrend
  trend={
    stats?.attendanceTrend
  }
/>

<MonthlySummary
  summary={
    stats?.monthlySummary
  }
/>

<DownloadReports />

<DepartmentReport
  departments={departments}
  department={department}
  setDepartment={
    setDepartment
  }
/>

<EmployeeReport
  employees={employees}
  employee={employee}
  setEmployee={
    setEmployee
  }
/>
</>
 
)
};

export default Reports;