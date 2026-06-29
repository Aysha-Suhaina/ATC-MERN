import {
  useCallback,
  useEffect,
  useState,
} from "react";
import {toast} from 'react-toastify';

import {
  getEmployeeById,
  updateEmployee,
} from "../../../api/userApi";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getDepartments,
} from "../../../api/departmentApi";

import {
  getDesignationsByDepartment,
} from "../../../api/designationApi";

const UpdateEmployee =
  () => {
    const { id } =
      useParams();

    const navigate =
      useNavigate();

    const [form,
      setForm] =
      useState({
        name: "",
        email: "",
        department: "",
        designation: "",
      });
      const [departments, setDepartments] = useState([]);
      const [designations, setDesignations] = useState([]);

      useEffect(() => {
  const loadData = async () => {
    try {
      const deptRes = await getDepartments();

      setDepartments(
        deptRes.data.departments
      );

  
    } catch (err) {
      console.log(err);
    }
  };

  loadData();
}, []);

    const loadEmployee =
      useCallback(async () => {
        if (!id) return;

        try {
          const res =
            await getEmployeeById(
              id
            );

          const employee =
            res?.data?.employee ||
            res?.data?.data;

          if (!employee) return;

          setForm({
            name:
              employee.name || "",
            email:
              employee.email || "",
            department:
              employee.department?._id ||
              "",
            designation:
              employee.designation?._id ||
              "",
          });
          if (employee.department?._id) {
            const res = await getDesignationsByDepartment(
              employee.department._id
            );

            setDesignations(res.data.designations);
          }
        } catch (error) {
          console.error(
            error
          );
        }
      }, [id]);

    useEffect(() => {
      let isCancelled = false;

      const fetchEmployee = async () => {
        try {
          await loadEmployee();
        } finally {
          if (!isCancelled) {
            // state updates happen inside loadEmployee
          }
        }
      };

      void fetchEmployee();

      return () => {
        isCancelled = true;
      };
    }, [loadEmployee]);

    const handleChange = async (e) => {
  const { name, value } = e.target;

  if (name === "department") {
    setForm((prev) => ({
      ...prev,
      department: value,
      designation: "",
    }));

    if (!value) {
      setDesignations([]);
      return;
    }

    try {
      const res =
        await getDesignationsByDepartment(value);

      setDesignations(
        res.data.designations
      );
    } catch (err) {
      console.error(err);
      setDesignations([]);
    }

    return;
  }

  setForm((prev) => ({
    ...prev,
    [name]: value,
  }));
};
    const handleSubmit =
      async (e) => {
        e.preventDefault();

        try {
          await updateEmployee(
            id,
            form
          );
          toast.success("Employee updated successfully");

          navigate(
            "/admin/employees"
          );
        } catch (error) {
          toast.error(
            error.response?.data?.message ||
            "Failed to update employee"
);
          console.error(
            error
          );
        }
      };

    return (
      <div>
        <h1>
          Update Employee
        </h1>

        <form
          onSubmit={
            handleSubmit
          }
        >
          <input
            name="name"
            value={
              form.name
            }
            onChange={
              handleChange
            }
          />

          <input
            name="email"
            value={
              form.email
            }
            onChange={
              handleChange
            }
          />

          <select
            name="department"
            value={form.department}
            onChange={handleChange}
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

          <select
            name="designation"
            value={form.designation}
            onChange={handleChange}
            disabled={!form.department}
          >
            <option value="">
              {form.department
                ? "Select Designation"
                : "Select Department First"}
            </option>

            {designations.map((designation) => (
              <option
                key={designation._id}
                value={designation._id}
              >
                {designation.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
          >
            Update
          </button>
        </form>
      </div>
    );
  };

export default UpdateEmployee;