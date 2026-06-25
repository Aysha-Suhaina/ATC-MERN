import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getEmployeeById,
  updateEmployee,
} from "../../../api/userApi";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

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
              employee.department ||
              "",
            designation:
              employee.designation ||
              "",
          });
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

    const handleChange = (
      e
    ) => {
      setForm({
        ...form,
        [e.target.name]:
          e.target.value,
      });
    };

    const handleSubmit =
      async (e) => {
        e.preventDefault();

        try {
          await updateEmployee(
            id,
            form
          );

          navigate(
            "/admin/employees"
          );
        } catch (error) {
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

          <input
          placeholder="Department"
            name="department"
            value={
              form.department
            }
            onChange={
              handleChange
            }
          />

          <input
          placeholder="Designation"
            name="designation"
            value={
              form.designation
            }
            onChange={
              handleChange
            }
          />

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