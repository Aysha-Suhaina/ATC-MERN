import { useState } from "react";
import { toast } from "react-toastify";

import { createDepartment } from "../../api/departmentApi";

import Button from "../ui/Button";

const initialForm = {
  name: "",
  description: "",
};

function DepartmentForm({ onSuccess }) {
  const [form, setForm] = useState(initialForm);

  const handleChange = ({ target: { name, value } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setForm(initialForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createDepartment(form);

      toast.success("Department created successfully");

      resetForm();
      onSuccess();
    } catch (error) {
      console.error(error);
      toast.error("Failed to create department");
    }
  };

  return (
    <div>
      <div className="form-header">
        <h2>Create Department</h2>
        <p>Add a new department to your organization.</p>
      </div>

      <form className="form-grid" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="department-name">Department Name</label>

          <input
            id="department-name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Human Resources"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="department-description">Description</label>

          <textarea
            id="department-description"
            name="description"
            rows={4}
            value={form.description}
            onChange={handleChange}
            placeholder="Short description..."
          />
        </div>

        <div className="form-actions">
          <Button type="submit">Create Department</Button>
        </div>
      </form>
    </div>
  );
}

export default DepartmentForm;
