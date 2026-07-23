import { useState } from "react";
import { toast } from "react-toastify";
import { createDepartment } from "../../api/departmentApi";
import Button from "../ui/Button";
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

      toast.success("Department created successfully");

      setForm({
        name: "",
        description: "",
      });

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
          <label>Department Name</label>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Human Resources"
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>

          <textarea
            rows="4"
            name="description"
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
