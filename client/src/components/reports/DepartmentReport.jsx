const DepartmentReport = ({
  departments,
  department,
  setDepartment,
  downloadReport,
}) => {
  return (
    <>
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
    </>
  );
};

export default DepartmentReport;