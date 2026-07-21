import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getMyDepartmentEmployees } from "../../api/userApi";

import { assignDesignationByManager } from "../../api/userApi";

import { getMyDepartmentDesignations } from "../../api/designationApi";
import Button from "../../components/ui/Button";

const MyEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [search,setSearch]=useState("");
  const [pendingChanges, setPendingChanges] = useState({});
  const loadDesignations = async () => {
    const res = await getMyDepartmentDesignations();

    setDesignations(res.data.designations);
  };

  const loadEmployees = async () => {
    try {
      const res = await getMyDepartmentEmployees();

      setEmployees(res.data.employees);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadEmployees();
    loadDesignations();
  }, []);

  return (
  <div className="page">
    <div className="page-header">
      <div>
        <h1>My Employees</h1>
        <p className="section-description">
          View employees in your department and manage their designations.
        </p>
      </div>
    </div>

    <div className="card">
      <div className="filter-bar">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search employee..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {employees.length === 0 ? (
        <div className="empty">
          <h3>No Employees Found</h3>
          <p>Your department currently has no employees.</p>
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Current Designation</th>
              <th>Change Designation</th>
            </tr>
          </thead>

          <tbody>
            {employees
              .filter(
                (employee) =>
                  employee.name
                    ?.toLowerCase()
                    .includes(search.toLowerCase()) ||
                  employee.email
                    ?.toLowerCase()
                    .includes(search.toLowerCase())
              )
              .map((employee) => (
                <tr key={employee._id}>
                  <td>
                    <strong>{employee.name}</strong>
                  </td>

                  <td>{employee.email}</td>

                  <td>
                    {employee.designation?.name || (
                      <span className="status-badge inactive">
                        Not Assigned
                      </span>
                    )}
                  </td>

                 <td>
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
    }}
  >
    <select
      className="input"
      value={
        pendingChanges[employee._id] ??
        employee.designation?._id ??
        employee.designation ??
        ""
      }
      onChange={(e) =>
        setPendingChanges({
          ...pendingChanges,
          [employee._id]: e.target.value,
        })
      }
    >
      <option value="">Change Designation</option>

      {designations.map((d) => (
        <option key={d._id} value={d._id}>
          {d.name}
        </option>
      ))}
    </select>

    {pendingChanges[employee._id] &&
      pendingChanges[employee._id] !==
        (employee.designation?._id || employee.designation) && (
        <>
          <Button
            variant="success"
            onClick={async () => {
              try {
                await assignDesignationByManager(
                  employee._id,
                  pendingChanges[employee._id]
                );

                toast.success("Designation updated");

                setPendingChanges((prev) => {
                  const copy = { ...prev };
                  delete copy[employee._id];
                  return copy;
                });

                loadEmployees();
              } catch (err) {
                toast.error(
                  err.response?.data?.message
                );
              }
            }}
          >
            Save
          </Button>

          <Button
            variant="secondary"
            onClick={() =>
              setPendingChanges((prev) => {
                const copy = { ...prev };
                delete copy[employee._id];
                return copy;
              })
            }
          >
            Cancel
          </Button>
        </>
      )}
  </div>
</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  </div>
);
};

export default MyEmployees;
