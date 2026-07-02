import { Link } from "react-router-dom";
import { deleteDepartment } from "../../api/departmentApi";
import AssignManager from "./AssignManager";
import {toast} from 'react-toastify';

function DepartmentList({
  departments,
  refreshDepartments,
}) {
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this department?"
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

      {departments.length === 0 ? (
        <p>No departments available.</p>
      ) : (
        <table border="1" cellPadding="10">

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

                <td>{department.name}</td>

                <td>
                  {department.description || "-"}
                </td>

                <td>
                  {department.manager
                    ? department.manager.name
                    : "Not Assigned"}
                </td>

                <td>
                  <Link
                    to={`/admin/departments/edit/${department._id}`}
                  >
                    <button>Edit</button>
                  </Link>

                  <button
                    onClick={() =>
                      handleDelete(
                        department._id
                      )
                    }
                  >
                    Delete
                  </button>

                  <AssignManager
                    departmentId={
                      department._id
                    }
                    currentManager={
                      department.manager
                    }
                    onAssigned={
                      refreshDepartments
                    }
                  />
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