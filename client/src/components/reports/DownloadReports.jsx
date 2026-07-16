  import {
  downloadReport,
} from "../../api/reportApi";
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

export default function DownloadReports() {
    


  
  const [
     departments,
     setDepartments,
   ] = useState([]);
 
   const [
     employees,
     setEmployees,
   ] = useState([]);
 
   const [
     department,
     setDepartment,
   ] = useState("");
 
   const [
     employee,
     setEmployee,
   ] = useState("");

 useEffect(() => {

    const load = async () => {

      const deptRes =
        await getDepartments();

      const empRes =
        await getEmployees();

//       console.log(deptRes.data);
// console.log(deptRes.data.departments);

setDepartments(deptRes.data.departments);

      setEmployees(
        empRes.data.employees
      );

    };

    load();
      }, []);

return(
    <>
    
   
 <div className="report-buttons">

    <h2>Attendance Reports</h2>

    <h4>Daily</h4>

    <Button 
      onClick={() =>
        downloadReport(
          "/daily/csv",
          "daily-report.csv"
        )
      }
    >
      CSV
    </Button >

    <Button 
      onClick={() =>
        downloadReport(
          "/daily/excel",
          "daily-report.xlsx"
        )
      }
    >
      Excel
    </Button >

    <h4>Weekly</h4>

    <Button 
      onClick={() =>
        downloadReport(
          "/weekly/csv",
          "weekly-report.csv"
        )
      }
    >
      CSV
    </Button >

    <Button 
      onClick={() =>
        downloadReport(
          "/weekly/excel",
          "weekly-report.xlsx"
        )
      }
    >
      Excel
    </Button >

    <h4>Monthly</h4>

    <Button 
      onClick={() =>
        downloadReport(
          "/monthly/csv",
          "monthly-report.csv"
        )
      }
    >
      CSV
    </Button >

    <Button 
      onClick={() =>
        downloadReport(
          "/monthly/excel",
          "monthly-report.xlsx"
        )
      }
    >
      Excel
    </Button >

    <hr />

    <h2>Department Report</h2>

    <select
      value={department}
      onChange={(e) =>
        setDepartment(e.target.value)
      }
    >
      <option value="">
        Select Department
      </option>


      {departments.map((dept) => (
        <option
          key={dept._id}
          value={dept._id}
        >
          {dept.name}
        </option>
      ))}
    </select>

    <br />
    <br />

    <Button 
      disabled={!department}
      onClick={() =>
        downloadReport(
          `/department/${department}/csv`,
          "department-report.csv"
        )
      }
    >
      CSV
    </Button >

    <Button 
      disabled={!department}
      onClick={() =>
        downloadReport(
          `/department/${department}/excel`,
          "department-report.xlsx"
        )
      }
    >
      Excel
    </Button >

    <hr />

    <h2>Employee Report</h2>

    <select
      value={employee}
      onChange={(e) =>
        setEmployee(e.target.value)
      }
    >
      <option value="">
        Select Employee
      </option>

      {employees.map((emp) => (
        <option
          key={emp._id}
          value={emp._id}
        >
          {emp.name}
        </option>
      ))}
    </select>

    <br />
    <br />

    <Button 
      disabled={!employee}
      onClick={() =>
        downloadReport(
          `/user/${employee}/csv`,
          "employee-report.csv"
        )
      }
    >
      CSV
    </Button >

    <Button 
      disabled={!employee}
      onClick={() =>
        downloadReport(
          `/user/${employee}/excel`,
          "employee-report.xlsx"
        )
      }
    >
      Excel
    </Button >
    </div>
     </>

      )
 
 

};