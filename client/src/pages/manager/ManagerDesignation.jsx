import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  getMyDepartmentDesignations,
  createMyDepartmentDesignation,
  updateMyDepartmentDesignation,
  deleteMyDepartmentDesignation,
} from "../../api/designationApi";
import Button from "../../components/ui/Button";

const ManagerDesignation = () => {
  // console.log(updateMyDepartmentDesignation);
  const [designations, setDesignations] = useState([]);
  const [name, setName] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [editingName, setEditingName] = useState("");
  const loadDesignations = async () => {
    try {
      const res = await getMyDepartmentDesignations();

      setDesignations(res.data.designations);
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to load designations");
    }
  };

  useEffect(() => {
    loadDesignations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createMyDepartmentDesignation({
        name,
      });

      toast.success("Designation created.");

      setName("");

      loadDesignations();
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed");
    }
  };

  return (
  <div className="page">
    <div className="page-header">
      <div>
        <h1>Department Designations</h1>
        <p className="section-description">
          Create and manage designations within your department.
        </p>
      </div>
    </div>

    <div className="card form-card">
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <input
            type="text"
            placeholder="Designation Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-actions">
          <Button type="submit">
            Add Designation
          </Button>
        </div>
      </form>
    </div>

    <div className="card">
      {designations.length === 0 ? (
        <div className="empty">
          No designations found.
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Employees</th>
              <th width="240">Actions</th>
            </tr>
          </thead>

          <tbody>
            {designations.map((designation) => (
              <tr key={designation._id}>
                <td>
                  {editingId === designation._id ? (
                    <input
                      className="input"
                      value={editingName}
                      onChange={(e) =>
                        setEditingName(e.target.value)
                      }
                    />
                  ) : (
                    designation.name
                  )}
                </td>

                <td>
                  {designation.department?.name}
                </td>

                <td>
                  <span className="badge badge-success">
                    {designation.employeeCount}
                  </span>
                </td>

                <td>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      flexWrap: "wrap",
                    }}
                  >
                    {editingId === designation._id ? (
                      <>
                        <Button
                          onClick={async () => {
                            try {
                              await updateMyDepartmentDesignation(
                                designation._id,
                                {
                                  name: editingName,
                                }
                              );

                              toast.success("Updated");

                              setEditingId(null);

                              loadDesignations();
                            } catch (err) {
                              toast.error(
                                err.response?.data?.msg
                              );
                            }
                          }}
                        >
                          Save
                        </Button>

                        <Button
                          variant="secondary"
                          onClick={() =>
                            setEditingId(null)
                          }
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="secondary"
                          onClick={() => {
                            setEditingId(
                              designation._id
                            );

                            setEditingName(
                              designation.name
                            );
                          }}
                        >
                          Edit
                        </Button>

                        <Button
                          variant="danger"
                          onClick={async () => {
                            if (
                              !window.confirm(
                                "Delete this designation?"
                              )
                            )
                              return;

                            try {
                              await deleteMyDepartmentDesignation(
                                designation._id
                              );

                              toast.success(
                                "Designation deleted."
                              );

                              loadDesignations();
                            } catch (err) {
                              toast.error(
                                err.response?.data?.msg
                              );
                            }
                          }}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  </div>
);
};

export default ManagerDesignation;
