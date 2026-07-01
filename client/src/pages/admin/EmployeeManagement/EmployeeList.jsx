import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getEmployees,
  deactivateEmployee,
} from "../../../api/userApi";

import {
  useNavigate,
} from "react-router-dom";

const EmployeeList = () => {
  const [employees,
    setEmployees] =
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
        console.error(
          error
        );
      }
    }, []);

  useEffect(() => {
    let isCancelled = false;

    const fetchEmployees = async () => {
      try {
        const res =
          await getEmployees();

        if (!isCancelled) {
          const employeesList =
            res?.data?.employees ||
            res?.data?.data ||
            [];

          setEmployees(
            employeesList
          );
        }
      } catch (error) {
        console.error(
          error
        );
      }
    };

    void fetchEmployees();

    return () => {
      isCancelled = true;
    };
  }, []);

  const handleDeactivate =
    async (id) => {
      try {
        await deactivateEmployee(
          id
        );

        await loadEmployees();
      } catch (error) {
        console.error(
          error
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
                  {
                    employee.name
                  }
                </td>

                <td>
                  {
                    employee.email
                  }
                </td>

                <td>
                  {
                    employee.department?.name
                  }
                </td>

                <td>
                  {
                    employee.designation?.name
                  }
                </td>

                <td>
                  {employee.manager?.name || "Not Assigned"}
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