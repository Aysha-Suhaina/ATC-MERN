import { Link } from "react-router-dom";
import { deleteDepartment } from "../../api/departmentApi";
import { toast } from "react-toastify";
import Button from "../ui/Button";

function DepartmentList({ departments, refreshDepartments }) {
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this department?",
    );

    if (!confirmDelete) return;

    try {
      await deleteDepartment(id);

      toast.success("Department deleted");

      refreshDepartments();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete department");
    }
  };

 return (
  <div>

    <h2>Departments</h2>

    <p
      style={{
        color: "var(--text-secondary)",
        marginBottom: "20px",
      }}
    >
      View and manage all departments.
    </p>

    {departments.length === 0 ? (

      <div className="empty-state">

        No departments available.

      </div>

    ) : (

      <table className="table">

        <thead>

          <tr>

            <th>Name</th>

            <th>Description</th>

            <th>Manager</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {departments.map((department) => (

            <tr key={department._id}>

              <td>

                <strong>

                  {department.name}

                </strong>

              </td>

              <td>

                {department.description || "-"}

              </td>

              <td>

                {department.manager
                  ? department.manager.name
                  : "Not Assigned"}

              </td>

              <td
                style={{
                  display: "flex",
                  gap: "10px",
                }}
              >

                <Link
                  to={`/admin/departments/edit/${department._id}`}
                >

                  <Button>

                    Edit

                  </Button>

                </Link>

                <Button
                  variant="danger"
                  onClick={() =>
                    handleDelete(
                      department._id
                    )
                  }
                >

                  Delete

                </Button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    )}

  </div>
);
}

export default DepartmentList;
