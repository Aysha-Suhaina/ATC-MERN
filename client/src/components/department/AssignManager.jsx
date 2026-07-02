import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getManagers } from "../../api/userApi";
import { assignManager } from "../../api/departmentApi";

function AssignManager({
  departmentId,
  currentManager,
  onAssigned,
}) {
  const [managers, setManagers] =
    useState([]);

  const [managerId, setManagerId] =
    useState(currentManager?._id || "");

  useEffect(() => {
    const loadManagers = async () => {
      try {
        const res =
          await getManagers();

        setManagers(
          res.data.managers || []
        );
      } catch (error) {
        console.error(error);
        toast.error(
          "Failed to load managers"
        );
      }
    };

    loadManagers();
  }, []);

  useEffect(() => {
    queueMicrotask(() => {
      setManagerId(
        currentManager?._id || ""
      );
    });
  }, [currentManager]);

  const handleAssign = async () => {
    if (!managerId) {
      toast.error(
        "Select a manager"
      );
      return;
    }

    try {
      await assignManager(
        departmentId,
        managerId
      );

      toast.success(
        "Manager assigned successfully"
      );

      onAssigned();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Assignment failed"
      );
    }
  };

  return (
    <>
      <select
        value={managerId}
        onChange={(e) =>
          setManagerId(
            e.target.value
          )
        }
      >
        <option value="">
          Select Manager
        </option>

        {managers.map((manager) => (
          <option
            key={manager._id}
            value={manager._id}
          >
            {manager.name}
          </option>
        ))}
      </select>

      <button
        onClick={handleAssign}
      >
        Assign
      </button>
    </>
  );
}

export default AssignManager;