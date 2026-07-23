import Button from "../ui/Button";

const DepartmentReport = ({
  departments,
  department,
  setDepartment,
  downloadReport,
}) => {
  return (
  <div className="report-generator">
    <p className="section-subtitle">
      Generate an attendance report for a specific department.
    </p>

    <div className="form-group">
      <label>Select Department</label>

      <select
        className="form-select"
        value={department}
        onChange={(e) =>
          setDepartment(e.target.value)
        }
      >
        <option value="">
          Choose a department...
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
    </div>

    <div className="report-download-actions">
      <Button
        variant="secondary"
        disabled={!department}
        onClick={() =>
          downloadReport(
            `/department/${department}/csv`
          )
        }
      >
        Export CSV
      </Button>

      <Button
        disabled={!department}
        onClick={() =>
          downloadReport(
            `/department/${department}/excel`
          )
        }
      >
        Export Excel
      </Button>
    </div>
  </div>
);
};

export default DepartmentReport;