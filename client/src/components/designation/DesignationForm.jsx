import { useEffect, useState } from "react";
import {toast} from 'react-toastify';
import { createDesignation } from "../../api/designationApi";
import { getDepartments } from "../../api/departmentApi";

function DesignationForm({ onSuccess }) {
  const [departments, setDepartments] = useState([]);

  const [form, setForm] = useState({
    name: "",
    department: "",
  });

  const loadDepartments = async () => {
    try {
      const response = await getDepartments();
      setDepartments(response.data.departments);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    queueMicrotask(() => {
      loadDepartments();
    });
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createDesignation(form);

      toast.success("Designation created successfully");

      setForm({
        name: "",
        department: "",
      });

      onSuccess();
    } catch (error) {
      console.error(error);
      toast.error("Failed to create designation");
    }
  };

  return (
    <div>

      <h2>Create Designation</h2>

      <form onSubmit={handleSubmit}>

        <div>

          <label>Designation Name</label>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />

        </div>

        <div>

          <label>Department</label>

          <select
            name="department"
            value={form.department}
            onChange={handleChange}
            required
          >

            <option value="">
              Select Department
            </option>

            {departments.map((department) => (

              <option
                key={department._id}
                value={department._id}
              >
                {department.name}
              </option>

            ))}

          </select>

        </div>

        <button type="submit">
          Create Designation
        </button>

      </form>

    </div>
  );
}

export default DesignationForm;