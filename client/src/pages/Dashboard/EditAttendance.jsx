import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditAttendance = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [attendance, setAttendance] =
    useState(null);

  const [formData, setFormData] = useState({
    checkInTime: "",
    checkOutTime: "",
    remarks: "",
  });

  const fetchAttendance = useCallback(async () => {
    try {
      const res = await axios.get(
        `/api/attendance/${id}`,
        {
          withCredentials: true,
        }
      );

      const data =
        res.data.attendance || res.data.data;

      setAttendance(data);

      setFormData({
        checkInTime: data.checkInTime
          ? new Date(data.checkInTime)
              .toISOString()
              .slice(11, 16)
          : "",
        checkOutTime: data.checkOutTime
          ? new Date(data.checkOutTime)
              .toISOString()
              .slice(11, 16)
          : "",
        remarks: data.remarks || "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to load attendance");
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
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `/api/attendance/${id}/resubmit`,
        formData,
        {
          withCredentials: true,
        }
      );

      alert(
        "Attendance resubmitted successfully"
      );

      navigate("/employee-dashboard");
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
          "Failed to resubmit attendance"
      );
    }
  };

  if (loading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div className="container mt-4">
      <h2>Edit Attendance</h2>

      {attendance?.rejectionReason && (
        <div
          className="alert alert-danger"
          role="alert"
        >
          <strong>
            Rejection Reason:
          </strong>{" "}
          {attendance.rejectionReason}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>
            Check In Time
          </label>

          <input
            type="time"
            name="checkInTime"
            value={
              formData.checkInTime
            }
            onChange={
              handleChange
            }
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label>
            Check Out Time
          </label>

          <input
            type="time"
            name="checkOutTime"
            value={
              formData.checkOutTime
            }
            onChange={
              handleChange
            }
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label>Remarks</label>

          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={
              handleChange
            }
            className="form-control"
            rows="4"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
        >
          Resubmit Attendance
        </button>
      </form>
    </div>
  );
};

export default EditAttendance;