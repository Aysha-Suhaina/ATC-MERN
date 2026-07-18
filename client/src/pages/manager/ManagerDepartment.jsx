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
    <>

      <div>
        <h1>My Department</h1>

        <form onSubmit={handleSubmit}>
          <label>Department Name</label>

          <br />

          <input type="text" value={department.name} readOnly />

          <br />
          <br />

          <label>Manager</label>

          <br />

          <input
            type="text"
            value={department.manager?.name || "Not Assigned"}
            readOnly
          />

          <br />
          <br />

          <label>Description</label>

          <br />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
          />

          <br />
          <br />

          <Button type="submit">Save Changes</Button>
        </form>
      </div>
    </>
  );
};

export default ManagerDepartment;
