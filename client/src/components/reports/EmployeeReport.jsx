import Button from "../ui/Button";

const EmployeeReport = ({
  employees,
  employee,
  setEmployee,
  downloadReport,
}) => {
  return (
    <>
      <h2>Employee Report</h2>

      <select value={employee} onChange={(e) => setEmployee(e.target.value)}>
        <option value="">Select Employee</option>

        {employees.map((emp) => (
          <option key={emp._id} value={emp._id}>
            {emp.name}
          </option>
        ))}
      </select>

      <br />
      <br />

      <Button
        disabled={!employee}
        onClick={() =>
          downloadReport(`/user/${employee}/csv`, "employee-report.csv")
        }
      >
        CSV
      </Button>

      <Button
        disabled={!employee}
        onClick={() =>
          downloadReport(`/user/${employee}/excel`, "employee-report.xlsx")
        }
      >
        Excel
      </Button>
    </>
  );
};

export default EmployeeReport;
