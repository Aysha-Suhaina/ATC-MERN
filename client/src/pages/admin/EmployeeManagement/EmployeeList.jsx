import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import {
  getEmployees,
  deactivateEmployee,
  reactivateEmployee,
} from "../../../api/userApi";
import { getDepartments } from "../../../api/departmentApi";
import { getAllDesignations } from "../../../api/designationApi";

const EmployeeList = () => {
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [designationFilter, setDesignationFilter] = useState("");
  const [activeFilter, setActiveFilter] = useState("");
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);

  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      const res = await getEmployees({
        search,
        department: departmentFilter,
        designation: designationFilter,
        active: activeFilter,
      });
      setEmployees(res.data.employees);

      const deptRes = await getDepartments();
      setDepartments(deptRes.data.departments);

      const desRes = await getAllDesignations();
      setDesignations(desRes.data.designations);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load employees");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [search, departmentFilter, designationFilter, activeFilter]);

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
      fetchEmployees();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to deactivate employee",
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
      fetchEmployees();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to reactivate employee",
      );
    }
  };

  return (
    <div>
      <h1>Employee Management</h1>

      <button onClick={() => navigate("/admin/employees/create")}>
        Create Employee
      </button>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="Search Employee"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={activeFilter}
          onChange={(e) => setActiveFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </div>

      <select
        value={departmentFilter}
        onChange={(e) => setDepartmentFilter(e.target.value)}
      >
        <option value="">All Departments</option>
        {departments.map((dept) => (
          <option key={dept._id} value={dept._id}>
            {dept.name}
          </option>
        ))}
      </select>

      <select
        value={designationFilter}
        onChange={(e) => setDesignationFilter(e.target.value)}
      >
        <option value="">All Designations</option>
        {designations.map((des) => (
          <option key={des._id} value={des._id}>
            {des.name}
          </option>
        ))}
      </select>

      <button
        onClick={() => {
          setSearch("");

          setDepartmentFilter("");

          setDesignationFilter("");

          setActiveFilter("");
        }}
      >
        Reset
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
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.department?.name || "-"}</td>
              <td>{employee.designation?.name || "-"}</td>
              <td>{employee.role}</td>
              <td>{employee.department?.manager?.name || "Not Assigned"}</td>
              <td>{employee.isActive ? "Active" : "Inactive"}</td>
              <td>
                <button
                  onClick={() =>
                    navigate(`/admin/employees/edit/${employee._id}`)
                  }
                >
                  Edit
                </button>

                {employee.isActive ? (
                  <button onClick={() => handleDeactivate(employee)}>
                    Deactivate
                  </button>
                ) : (
                  <button onClick={() => handleReactivate(employee)}>
                    Reactivate
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
