import { useEffect, useState } from "react";
import { getMyDepartment, updateMyDepartment } from "../../api/departmentApi";
import { toast } from "react-toastify";
import Button from "../../components/ui/Button";

const ManagerDepartment = () => {
  const [department, setDepartment] = useState(null);

  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const res = await getMyDepartment();

        const dept = res.data.department;

        setDepartment(dept);

        setDescription(dept.description || "");
      } catch (err) {
        toast.error(
          err.response?.data?.message || "Failed to load department.",
        );
      }
    };

    fetchDepartment();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateMyDepartment({
        description,
      });

      setDepartment((prev) => ({
        ...prev,
        description,
      }));

      toast.success("Department updated successfully.");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed.");
    }
  };

  if (!department) {
    return (
      <>
        <h2>Loading...</h2>
      </>
    );
  }

  return (
    <div className="page">
      <div className="split-layout-header">
        <div>
          <h1 className="page-title">My Department</h1>
          <p className="section-description">
            View your department details and update its description.
          </p>
        </div>
      </div>

      <div className="card form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Department Name</label>

              <input type="text" value={department.name} readOnly />
            </div>

            <div className="form-group">
              <label>Department Manager</label>

              <input
                type="text"
                value={department.manager?.name || "Not Assigned"}
                readOnly
              />
            </div>

            <div className="form-group">
              <label>Description</label>

              <textarea
                rows={6}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter department description..."
              />
            </div>
          </div>

          <div className="form-actions">
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </div>

      <div className="card">
        <h3>Department Summary</h3>

        <div className="grid-3">
          <div className="info-card">
            <div className="info-title">Department</div>

            <div className="info-value">{department.name}</div>
          </div>

          <div className="info-card">
            <div className="info-title">Manager</div>

            <div className="info-value">
              {department.manager?.name || "Not Assigned"}
            </div>
          </div>

          <div className="info-card">
            <div className="info-title">Description</div>

            <div
              style={{
                color: "var(--text-light)",
                marginTop: "10px",
              }}
            >
              {description || "No description added."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDepartment;
