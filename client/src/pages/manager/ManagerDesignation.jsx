import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { toast } from "react-toastify";

import {
  getMyDepartmentDesignations,
} from "../../api/designationApi";

const ManagerDesignation = () => {
  const [designations, setDesignations] =
    useState([]);

  const loadDesignations =
    async () => {
      try {
        const res =
          await getMyDepartmentDesignations();

        setDesignations(
          res.data.designations
        );
      } catch (err) {
        toast.error(
          err.response?.data?.msg ||
            "Failed to load designations"
        );
      }
    };

  useEffect(() => {
    loadDesignations();
  }, []);

  return (
    <>
      <Navbar />

      <div>
        <h1>
          Department Designations
        </h1>

        {designations.length === 0 ? (
          <p>
            No designations found.
          </p>
        ) : (
          <table
            border="1"
            cellPadding="10"
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Department</th>
              </tr>
            </thead>

            <tbody>
              {designations.map(
                (designation) => (
                  <tr
                    key={
                      designation._id
                    }
                  >
                    <td>
                      {
                        designation.name
                      }
                    </td>

                    <td>
                      {
                        designation
                          .department
                          ?.name
                      }
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default ManagerDesignation;