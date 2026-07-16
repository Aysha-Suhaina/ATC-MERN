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

        <Button type="submit">Create Department</Button>
      </form>
    </div>
  );
}

export default DepartmentForm;
