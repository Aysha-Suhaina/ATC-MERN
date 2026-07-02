import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { toast } from "react-toastify";

import {
  getEmployees,
  deactivateEmployee,
  promoteEmployee,
} from "../../../api/userApi";

import {
  useNavigate,
} from "react-router-dom";

const EmployeeList = () => {
  const [employees, setEmployees] =
    useState([]);

  const navigate =
    useNavigate();

  const loadEmployees =
    useCallback(async () => {
      try {
        const res =
          await getEmployees();

        const employeesList =
          res?.data?.employees ||
          res?.data?.data ||
          [];

        setEmployees(
          employeesList
        );
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Failed to load employees"
        );
      }
    }, []);

  useEffect(() => {
    queueMicrotask(() => {
      loadEmployees();
    });
  }, [loadEmployees]);

  const handleDeactivate =
    async (id) => {
      try {
        await deactivateEmployee(
          id
        );

        toast.success(
          "Employee deactivated"
        );

        loadEmployees();
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Failed to deactivate employee"
        );
      }
    };

  const handlePromote =
    async (id) => {
      try {
        await promoteEmployee(id);

        toast.success(
          "Employee promoted to Manager"
        );

        loadEmployees();
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Promotion failed"
        );
      }
    };

  return (
    <div>
      <h1>
        Employee Management
      </h1>

      <button
        onClick={() =>
          navigate(
            "/admin/employees/create"
          )
        }
      >
        Create Employee
      </button>

      <table border="1">
        <thead>
          <tr>
            <th>Name</th>

            <th>Email</th>

            <th>Department</th>

            <th>Designation</th>

            <th>Role</th>

            <th>Manager</th>

            <th>Status</th>

            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.map(
            (employee) => (
              <tr
                key={
                  employee._id
                }
              >
                <td>
                  {employee.name}
                </td>

                <td>
                  {employee.email}
                </td>

                <td>
                  {employee.department
                    ?.name || "-"}
                </td>

                <td>
                  {employee.designation
                    ?.name || "-"}
                </td>

                <td>
                  {employee.role}
                </td>

                <td>
              {employee.department?.manager?.name ||
                "Not Assigned"}
            </td>

                <td>
                  {employee.isActive
                    ? "Active"
                    : "Inactive"}
                </td>

                <td>
                  <button
                    onClick={() =>
                      navigate(
                        `/admin/employees/edit/${employee._id}`
                      )
                    }
                  >
                    Edit
                  </button>

                  {employee.role ===
                    "employee" && (
                    <button
                      onClick={() =>
                        handlePromote(
                          employee._id
                        )
                      }
                    >
                      Promote
                    </button>
                  )}

                  {employee.isActive && (
                    <button
                      onClick={() =>
                        handleDeactivate(
                          employee._id
                        )
                      }
                    >
                      Deactivate
                    </button>
                  )}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;