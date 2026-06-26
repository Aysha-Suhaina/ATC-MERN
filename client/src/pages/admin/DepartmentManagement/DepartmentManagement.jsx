import { useEffect, useState } from "react";
import { getDepartments } from "../../../api/departmentApi";

import DepartmentForm from "../../../components/department/DepartmentForm";
import DepartmentList from "../../../components/department/DepartmentList";

function DepartmentManagement() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDepartments = async () => {
  try {
    const response = await getDepartments();
    setDepartments(response.data.departments);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  queueMicrotask(() => {
    loadDepartments();
  });
}, []);
  if (loading) {
    return <h2>Loading Departments...</h2>;
  }

  return (
    <div className="department-management">

      <h1>Department Management</h1>

      <DepartmentForm onSuccess={loadDepartments} />

      <DepartmentList
        departments={departments}
        refreshDepartments={loadDepartments}
      />

    </div>
  );
}

export default DepartmentManagement;