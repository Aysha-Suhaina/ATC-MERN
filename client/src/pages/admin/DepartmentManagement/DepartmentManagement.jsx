import { useEffect, useState } from "react";
import { getDepartments } from "../../../api/departmentApi";

import DepartmentForm from "../../../components/department/DepartmentForm";
import DepartmentList from "../../../components/department/DepartmentList";
import Card from "../../../components/ui/Card";
import PageHeader from "../../../components/ui/PageHeader";

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
    <div className="page">
      <PageHeader
        title="Department Management"
        subtitle="Create, update and organize company departments."
      />

      <Card>
        <DepartmentForm onSuccess={loadDepartments} />
      </Card>

      <Card>
        <DepartmentList
          departments={departments}
          refreshDepartments={loadDepartments}
        />
      </Card>
    </div>
  );
}

export default DepartmentManagement;
