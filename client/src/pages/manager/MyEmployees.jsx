import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";

import {
  getMyDepartmentEmployees
} from "../../api/userApi";

const MyEmployees = () => {
  const [employees, setEmployees] =
    useState([]);

  useEffect(() => {
    const loadEmployees =
      async () => {
        try {
          const res =
            await getMyDepartmentEmployees();

          setEmployees(
            res.data.employees
          );
        } catch (error) {
          console.error(error);
        }
      };

    loadEmployees();
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
              <th>Department</th>
              <th>Designation</th>
            </tr>
          </thead>

          <tbody>
            {employees.map(
              (employee) => (
                <tr
                  key={
                    employee._id
                  }
                >
                  <td>
                    {employee.name}
                  </td>

                  <td>
                    {employee.email}
                  </td>

                  <td>
                    {
                      employee.department
                        ?.name
                    }
                  </td>

                  <td>
                    {
                      employee.designation
                        ?.name
                    }
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MyEmployees;