import { useEffect, useState } from "react";
import { getAllDesignations } from "../../../api/designationApi";

import DesignationForm from "../../../components/designation/DesignationForm";
import DesignationList from "../../../components/designation/DesignationList";

function DesignationManagement() {
  const [designations, setDesignations] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDesignations = async () => {
    try {
      const response = await getAllDesignations();
      setDesignations(response.data.designations);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    queueMicrotask(() => {
      loadDesignations();
    });
  }, []);
  if (loading) {
    return <h2>Loading Designations...</h2>;
  }

  return (
    <div className="designation-management">
      <h1>Designation Management</h1>

      <DesignationForm onSuccess={loadDesignations} />

      <DesignationList
        designations={designations}
        refreshDesignations={loadDesignations}
      />
    </div>
  );
}

export default DesignationManagement;
