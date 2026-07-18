import { useEffect, useState } from "react";
import { getAllDesignations } from "../../../api/designationApi";

import DesignationForm from "../../../components/designation/DesignationForm";
import DesignationList from "../../../components/designation/DesignationList";

import PageHeader from "../../../components/ui/PageHeader";

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
    <div className="designation-management page-container">
      <PageHeader
        title="Designation Management"
        subtitle="Create and manage designations across departments."
      />

      <DesignationForm onSuccess={loadDesignations} />

      <DesignationList
        designations={designations}
        refreshDesignations={loadDesignations}
      />
    </div>
  );
}

export default DesignationManagement;
