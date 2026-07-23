import { useEffect, useCallback, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/ui/Button";
import {
  getDesignationById,
  updateDesignation,
} from "../../../api/designationApi";

import { getDepartments } from "../../../api/departmentApi";
import Card from "../../../components/ui/Card";
import PageHeader from "../../../components/ui/PageHeader";

function EditDesignation() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [departments, setDepartments] = useState([]);

  const [form, setForm] = useState({
    name: "",
    department: "",
  });

  const loadDesignation = useCallback(async () => {
    try {
      // Load all departments
      const departmentResponse = await getDepartments();

      setDepartments(departmentResponse.data.departments);

      // Load designation
      const designationResponse = await getDesignationById(id);

      setForm({
        name: designationResponse.data.designation.name,
        department: designationResponse.data.designation.department?._id || "",
      });
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  useEffect(() => {
    queueMicrotask(() => {
      loadDesignation();
    });
  }, [loadDesignation]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateDesignation(id, form);

      toast.success("Designation updated successfully");

      navigate("/admin/designations");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update designation");
    }
  };

  return (
    <div className="page-container">
      <PageHeader
        title="Edit Designation"
        subtitle="Update designation details and assign a department."
      />

      <Card>
        <form className="form-grid" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Designation Name</label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Department</label>

            <select
              name="department"
              value={form.department}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>

              {departments.map((department) => (
                <option key={department._id} value={department._id}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-actions">
            <Button type="submit">Update Designation</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default EditDesignation;
