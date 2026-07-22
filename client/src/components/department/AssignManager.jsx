import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import Button from "../ui/Button";

import {
  assignManager,
  changeManager,
  removeManager,
  getDepartmentEmployees,
} from "../../api/departmentApi";
function AssignManager({ departmentId, currentManager, onAssigned }) {
  const [employees, setEmployees] = useState([]);

  const [employeeId, setEmployeeId] = useState("");

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const res = await getDepartmentEmployees(departmentId);

        setEmployees(res.data.employees || []);
      } catch (error) {
        console.error(error);

        toast.error("Failed to load employees");
      }
    };

    if (departmentId) {
      loadEmployees();
    }
  }, [departmentId]);

  const handleAssign = async () => {
    if (!employeeId) {
      toast.error("Select an employee");
      return;
    }

    try {
      await assignManager(departmentId, employeeId);

      toast.success("Manager assigned successfully");

      setEmployeeId("");

      onAssigned();
    } catch (error) {
      toast.error(error.response?.data?.message || "Assignment failed");
    }
  };
  return (
    <>
      {!currentManager ? (
        <>
          <div className="flex-start gap-sm">
            <select
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
            >
              <option value="">Select Employee</option>

              {employees.map((employee) => (
                <option
                  key={employee._id}
                  value={employee._id}
                  disabled={!employee.isActive}
                >
                  {employee.name}
                </option>
              ))}
            </select>

            <Button onClick={handleAssign}>Assign Manager</Button>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-wrap gap-sm mt-md">
            <Button
              variant="secondary"
              onClick={async () => {
                const { value } = await Swal.fire({
                  title: "Change Manager",
                  input: "select",
                  inputOptions: employees
                    .filter((e) => e.isActive)
                    .reduce((acc, emp) => {
                      acc[emp._id] = emp.name;
                      return acc;
                    }, {}),
                  showCancelButton: true,
                });

                if (!value) return;

                try {
                  await changeManager(departmentId, value);

                  toast.success("Manager changed.");

                  onAssigned();
                } catch (error) {
                  toast.error(error.response?.data?.message);
                }
              }}
            >
              Change Manager
            </Button>

            <Button
              variant="danger"
              onClick={async () => {
                const result = await Swal.fire({
                  title: "Remove Manager?",
                  icon: "warning",
                  showCancelButton: true,
                });

                if (!result.isConfirmed) return;

                try {
                  await removeManager(departmentId);

                  toast.success("Manager removed.");

                  onAssigned();
                } catch (error) {
                  toast.error(error.response?.data?.message);
                }
              }}
            >
              Remove Manager
            </Button>
          </div>
        </>
      )}
    </>
  );
}

export default AssignManager;
