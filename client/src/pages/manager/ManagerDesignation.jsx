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
    <>
      <div>
        <h1>Department Designations</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Designation name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Button type="submit">Add Designation</Button>
        </form>

        <hr />

        {designations.length === 0 ? (
          <p>No designations found.</p>
        ) : (
          <table border="1" cellPadding="10">
            <thead>
              <tr>
                <th>Name</th>
                <th>Department</th>
                <th>Employees</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {designations.map((designation) => (
                <tr key={designation._id}>
                  <td>
                    {editingId === designation._id ? (
                      <input
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                      />
                    ) : (
                      designation.name
                    )}
                  </td>

                  <td>{designation.department?.name}</td>

                  <td>{designation.employeeCount}</td>

                  <td>
                    <>
                      {editingId === designation._id ? (
                        <>
                          <Button
                            onClick={async () => {
                              try {
                                await updateMyDepartmentDesignation(
                                  designation._id,
                                  {
                                    name: editingName,
                                  },
                                );

                                toast.success("Updated");

                                setEditingId(null);

                                loadDesignations();
                              } catch (err) {
                                toast.error(err.response?.data?.msg);
                              }
                            }}
                          >
                            Save
                          </Button>

                          <Button onClick={() => setEditingId(null)}>
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            onClick={() => {
                              setEditingId(designation._id);

                              setEditingName(designation.name);
                            }}
                          >
                            Edit
                          </Button>

                          <Button
                            onClick={async () => {
                              if (!window.confirm("Delete this designation?"))
                                return;

                              try {
                                await deleteMyDepartmentDesignation(
                                  designation._id,
                                );

                                toast.success("Designation deleted.");

                                loadDesignations();
                              } catch (err) {
                                toast.error(err.response?.data?.msg);
                              }
                            }}
                          >
                            Delete
                          </Button>
                        </>
                      )}
                    </>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default ManagerDesignation;
