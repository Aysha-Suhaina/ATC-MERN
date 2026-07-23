import { useEffect, useCallback, useState } from "react";
import { toast } from "react-toastify";
import AssignManager from "../../../components/department/AssignManager";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/ui/Button";
import { getDepartment, updateDepartment } from "../../../api/departmentApi";
import Card from "../../../components/ui/Card";
import PageHeader from "../../../components/ui/PageHeader";

function EditDepartment() {
  const { id } = useParams();

  const navigate = useNavigate();
  const [department, setDepartment] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const loadDepartment = useCallback(async () => {
    try {
      const response = await getDepartment(id);

      setDepartment(response.data.department);

      setForm({
        name: response.data.department.name,
        description: response.data.department.description || "",
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
    <div className="page">
      <PageHeader
        title="Edit Department"
        subtitle="Update department details and manage its assigned manager."
      />

      <Card>
        <form className="form-grid" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Department Name</label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>

            <textarea
              name="description"
              rows="4"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <hr />

          <h3>Department Manager</h3>

          <p>
            <strong>Current Manager:</strong>{" "}
            {department?.manager ? department.manager.name : "Not Assigned"}
          </p>

          <AssignManager
            departmentId={id}
            currentManager={department?.manager}
            onAssigned={loadDepartment}
          />

          <div
            style={{
              marginTop: "25px",
            }}
          >
            <div className="form-actions">
              <Button type="submit">Save Changes</Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default EditDepartment;
