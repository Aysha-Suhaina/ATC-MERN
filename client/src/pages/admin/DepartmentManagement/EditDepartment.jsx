import { useEffect,useCallback, useState } from "react";
import {toast} from 'react-toastify';
import AssignManager from "../../../components/department/AssignManager";
import { useNavigate, useParams } from "react-router-dom";

import {
  getDepartment,
  updateDepartment,
} from "../../../api/departmentApi";

function EditDepartment() {
  const { id } = useParams();

  const navigate = useNavigate();
  const [department, setDepartment] =
  useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const loadDepartment = useCallback(async () => {
  try {
    const response = await getDepartment(id);

    setDepartment(
  response.data.department
);

setForm({
  name:
    response.data.department.name,
  description:
    response.data.department
      .description || "",
});
  } catch (error) {
    console.error(error);
  }
}, [id]);

useEffect(() => {
  queueMicrotask(() => {
    loadDepartment();
  });
}, [loadDepartment]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateDepartment(id, form);

      toast.success("Department updated successfully");

      navigate("/admin/departments");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update department");
    }
  };

  return (
    <div>

      <h2>Edit Department</h2>

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

        <hr />

          <h3>Department Manager</h3>

          <p>
            <strong>Current Manager:</strong>{" "}
            {department?.manager
              ? department.manager.name
              : "Not Assigned"}
          </p>

          <AssignManager
            departmentId={id}
            currentManager={
              department?.manager
            }
            onAssigned={
              loadDepartment
            }
          />

          <hr />

        <button type="submit">
          Update Department
        </button>

      </form>

    </div>
  );
}

export default EditDepartment;