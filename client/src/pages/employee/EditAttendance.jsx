import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Button from "../../components/ui/Button";
import Navbar from "../../components/Navbar";
import PageHeader from "../../components/ui/PageHeader";
import Section from "../../components/ui/Section";
import FormCard from "../../components/ui/FormCard";
import Card from "../../components/ui/Card";

const EditAttendance = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [attendance, setAttendance] = useState(null);

  const [formData, setFormData] = useState({
    checkInTime: "",
    checkOutTime: "",
    remarks: "",
  });

  const fetchAttendance = useCallback(async () => {
    try {
      const res = await axios.get(`/api/attendance/${id}`, {
        withCredentials: true,
      });

      const data = res.data.attendance || res.data.data;

      setAttendance(data);

      setFormData({
        checkInTime: data.checkInTime
          ? new Date(data.checkInTime).toISOString().slice(11, 16)
          : "",
        checkOutTime: data.checkOutTime
          ? new Date(data.checkOutTime).toISOString().slice(11, 16)
          : "",
        remarks: data.remarks || "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to load attendance");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    let isMounted = true;

    const loadAttendance = async () => {
      await fetchAttendance();
    };

    if (isMounted) {
      loadAttendance();
    }

    return () => {
      isMounted = false;
    };
  }, [fetchAttendance]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`/api/attendance/${id}/resubmit`, formData, {
        withCredentials: true,
      });

      toast.success("Attendance resubmitted successfully");

      navigate("/employee-dashboard");
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message || "Failed to resubmit attendance",
      );
    }
  };

  if (loading) {
    return <h3>Loading...</h3>;
  }

  return (
    <>
      <Navbar />

      <div className="page">
        <PageHeader
          title="Edit Attendance"
          subtitle="Update your attendance details and resubmit for approval."
        />

        {attendance?.rejectionReason && (
          <Card>
            <h3
              style={{
                color: "var(--danger)",
                marginBottom: "10px",
              }}
            >
              Rejection Reason
            </h3>

            <p>{attendance.rejectionReason}</p>
          </Card>
        )}

        <Section
          title="Attendance Details"
          description="Modify the required fields before resubmitting."
        >
          <FormCard
            title="Attendance Form"
            subtitle="Update your attendance information."
          >
            <form onSubmit={handleSubmit} className="form-grid">
              <div>
                <label>Check In Time</label>

                <input
                  type="time"
                  name="checkInTime"
                  value={formData.checkInTime}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label>Check Out Time</label>

                <input
                  type="time"
                  name="checkOutTime"
                  value={formData.checkOutTime}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label>Remarks</label>

                <textarea
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  rows="4"
                />
              </div>

              <div className="form-actions">
                <Button
                  variant="secondary"
                  onClick={() => navigate(-1)}
                  type="button"
                >
                  Cancel
                </Button>

                <Button type="submit">Resubmit Attendance</Button>
              </div>
            </form>
          </FormCard>
        </Section>
      </div>
    </>
  );
};

export default EditAttendance;
