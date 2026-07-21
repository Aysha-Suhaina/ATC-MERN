import { useEffect, useState } from "react";
import { getAllDesignations } from "../../../api/designationApi";

import DesignationForm from "../../../components/designation/DesignationForm";
import DesignationList from "../../../components/designation/DesignationList";

import PageHeader from "../../../components/ui/PageHeader";
import Card from "../../../components/ui/Card";

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
  <div className="page">
    <PageHeader
      title="Designation Management"
      subtitle="Create and manage designations across departments."
    />

    <div className="layout-2">
      <Card>
        <DesignationForm onSuccess={loadDesignations} />
      </Card>

      <Card>
        <DesignationList
          designations={designations}
          refreshDesignations={loadDesignations}
        />
      </Card>
    </div>
  </div>
);
}

export default DesignationManagement;
