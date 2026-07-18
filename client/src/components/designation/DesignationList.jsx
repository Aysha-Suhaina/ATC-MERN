import { Link } from "react-router-dom";
import {toast} from 'react-toastify';
import { deleteDesignation } from "../../api/designationApi";
import Button from "../ui/Button";
import Card from "../ui/Card";
function DesignationList({
  designations,
  refreshDesignations,
}) {
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this designation?"
    );
    if (!confirmDelete) return;
    try {
      await deleteDesignation(id);
      toast.success("Designation deleted");
      refreshDesignations();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete designation");
    }
  };
 return (

  <Card>

    <h2>Designation List</h2>

    {designations.length === 0 ? (

      <p className="empty-state">
        No designations found.
      </p>

    ) : (

      <table className="table">

        <thead>

          <tr>

            <th>Designation</th>

            <th>Department</th>

            <th>Employees</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {designations.map((designation) => (

            <tr key={designation._id}>

              <td>
                {designation.name}
              </td>

              <td>
                {designation.department?.name}
              </td>

              <td>

                <span className="badge badge-info">

                  {designation.employeeCount}

                </span>

              </td>

              <td>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                  }}
                >

                  <Link
                    to={`/admin/designations/edit/${designation._id}`}
                  >
                    <Button variant="secondary">
                      Edit
                    </Button>
                  </Link>

                  <Button
                    variant="danger"
                    onClick={() =>
                      handleDelete(designation._id)
                    }
                  >
                    Delete
                  </Button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    )}

  </Card>

);

}

export default DesignationList;