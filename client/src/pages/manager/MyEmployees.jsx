import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar";

import { getMyDepartmentEmployees } from "../../api/userApi";

import { assignDesignationByManager } from "../../api/userApi";

import { getMyDepartmentDesignations } from "../../api/designationApi";

const MyEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [designations, setDesignations] = useState([]);

  const loadDesignations = async () => {
    const res = await getMyDepartmentDesignations();

    setDesignations(res.data.designations);
  };

  const loadEmployees = async () => {
    try {
      const res = await getMyDepartmentEmployees();

      setEmployees(res.data.employees);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadEmployees();
    loadDesignations();
  }, []);

  return (
    <>
      <Navbar />

      <div>
        <h1>My Employees</h1>

        <table border="1">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Designation</th>
              <th>actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.name}</td>

                <td>{employee.email}</td>

                <td>{employee.designation?.name}</td>
                <td>
                  <select
                    value={
                      employee.designation?._id || employee.designation || ""
                    }
                    onChange={async (e) => {
                      try {
                        await assignDesignationByManager(
                          employee._id,
                          e.target.value,
                        );

                        toast.success("Designation updated");

                        loadEmployees();
                      } catch (err) {
                        toast.error(err.response?.data?.message);
                      }
                    }}
                  >
                    <option value="">Select Designation</option>

                    {designations.map((d) => (
                      <option key={d._id} value={d._id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MyEmployees;
