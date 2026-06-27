import { Link } from "react-router-dom";
import { deleteDesignation } from "../../api/designationApi";

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

      alert("Designation deleted");

      refreshDesignations();

    } catch (error) {

      console.error(error);

      alert("Failed to delete designation");

    }

  };

  return (

    <div>

      <h2>Designations</h2>

      {designations.length === 0 ? (

        <p>No designations found.</p>

      ) : (

        <table border="1" cellPadding="10">

          <thead>

            <tr>

              <th>Designation</th>

              <th>Department</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {designations.map((designation) => (

              <tr key={designation._id}>

                <td>{designation.name}</td>

                <td>{designation.department?.name}</td>

                <td>

                  <Link
                    to={`/admin/designations/edit/${designation._id}`}
                  >
                    <button>Edit</button>
                  </Link>

                  <button
                    onClick={() =>
                      handleDelete(designation._id)
                    }
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>

  );

}

export default DesignationList;