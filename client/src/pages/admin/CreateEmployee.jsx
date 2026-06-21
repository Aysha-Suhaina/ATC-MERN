import {
  useState,
} from "react";

import {
  createEmployee,
} from "../../api/userApi";

import {
  useNavigate,
} from "react-router-dom";

const CreateEmployee = () => {
  const navigate =
    useNavigate();

  const [form,
    setForm] =
    useState({
      name: "",
      email: "",
      password: "",
      department: "",
      designation: "",
    });

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
        await createEmployee(
          form
        );

        navigate(
          "/admin/employees"
        );
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div>
      <h1>
        Create Employee
      </h1>

      <form
        onSubmit={
          handleSubmit
        }
      >
        <input
          name="name"
          placeholder="Name"
          onChange={
            handleChange
          }
        />

        <input
          name="email"
          placeholder="Email"
          onChange={
            handleChange
          }
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={
            handleChange
          }
        />

        <input
          name="department"
          placeholder="Department"
          onChange={
            handleChange
          }
        />

        <input
          name="designation"
          placeholder="Designation"
          onChange={
            handleChange
          }
        />

        <button
          type="submit"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateEmployee;