import {
  useCallback,
  useEffect,
  useState,
} from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

import {
  getEmployees,
  deactivateEmployee,
  reactivateEmployee
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

  const handleDeactivate = async (employee) => {
  const result = await Swal.fire({
    title: "Deactivate Employee?",
    text: `Are you sure you want to deactivate ${employee.name}?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Deactivate",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#d33",
  });

  if (!result.isConfirmed) return;

  try {
    await deactivateEmployee(employee._id);

    toast.success("Employee deactivated");

    loadEmployees();
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
        "Failed to deactivate employee"
    );
  }
};

const handleReactivate = async (employee) => {
  const result = await Swal.fire({
    title: "Reactivate Employee?",
    text: `Are you sure you want to reactivate ${employee.name}?`,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Reactivate",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#3085d6",
  });

  if (!result.isConfirmed) return;

  try {
    await reactivateEmployee(employee._id);

    toast.success("Employee reactivated");

    loadEmployees();
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
        "Failed to reactivate employee"
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


                  {employee.isActive ? (
                    <button
                      onClick={() => handleDeactivate(employee)}
                    >
                      Deactivate
                    </button>
                  ) : (
                    <button
                      onClick={() => handleReactivate(employee)}
                    >
                      Reactivate
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