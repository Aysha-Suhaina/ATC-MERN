import { useState } from "react";
import { createDepartment } from "../../api/departmentApi";

function DepartmentForm({ onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createDepartment(form);

      alert("Department created successfully");

      setForm({
        name: "",
        description: "",
      });

      onSuccess();
    } catch (error) {
      console.error(error);
      alert("Failed to create department");
    }
  };

  return (
    <div>

      <h2>Create Department</h2>

      <form onSubmit={handleSubmit}>

        <div>
          <label>Department Name</label>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Description</label>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <button type="submit">
          Create Department
        </button>

      </form>

    </div>
  );
}

export default DepartmentForm;