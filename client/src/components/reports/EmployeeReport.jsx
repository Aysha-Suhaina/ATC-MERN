import Button from "../ui/Button";

const EmployeeReport = ({
  employees,
  employee,
  setEmployee,
  downloadReport,
}) => {
  return (
  <div className="report-generator">
    <p className="section-subtitle">
      Generate an attendance report for an individual employee.
    </p>

    <div className="form-group">
      <label>Select Employee</label>

      <select
        className="form-select"
        value={employee}
        onChange={(e) =>
          setEmployee(e.target.value)
        }
      >
        <option value="">
          Choose an employee...
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
    </div>

    <div className="report-download-actions">
      <Button
        variant="secondary"
        disabled={!employee}
        onClick={() =>
          downloadReport(
            `/user/${employee}/csv`
          )
        }
      >
        Export CSV
      </Button>

      <Button
        disabled={!employee}
        onClick={() =>
          downloadReport(
            `/user/${employee}/excel`
          )
        }
      >
        Export Excel
      </Button>
    </div>
  </div>
);
};

export default EmployeeReport;