import { useState } from "react";
import { toast } from "react-toastify";

import { createEmployee } from "../../../api/userApi";

import { useEffect } from "react";
import { getDepartments } from "../../../api/departmentApi";
import { getDesignationsByDepartment } from "../../../api/designationApi";
import Button from "../../../components/ui/Button";
import { useNavigate } from "react-router-dom";

import PageHeader from "../../../components/ui/PageHeader";
import FormCard from "../../../components/ui/FormCard";

const CreateEmployee = () => {
  const navigate = useNavigate();

  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);

  useEffect(() => {
    const loadDepartments = async () => {
      try {
        const res = await getDepartments();

        setDepartments(res.data.departments);
      } catch (err) {
        console.error(err);
      }
    };

    loadDepartments();
  }, []);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    designation: "",
  });

  const handleChange = async (e) => {
    const { name, value } = e.target;

    if (name === "department") {
      setForm((prev) => ({
        ...prev,
        department: value,
        designation: "", // Reset designation
      }));

      if (!value) {
        setDesignations([]);
        return;
      }

      try {
        const res = await getDesignationsByDepartment(value);

        setDesignations(res.data.designations);
      } catch (err) {
        console.error(err);
        setDesignations([]);
      }

      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createEmployee(form);

      navigate("/admin/employees");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="page">
      <PageHeader
        title="Create Employee"
        subtitle="Register a new employee in the organization."
      />

      <FormCard>
        <form className="form-grid" onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Temporary Password"
            value={form.password}
            onChange={handleChange}
          />

          <select
            name="department"
            value={form.department}
            onChange={handleChange}
          >
            <option value="">Select Department</option>

            {departments.map((dept) => (
              <option key={dept._id} value={dept._id}>
                {dept.name}
              </option>
            ))}
          </select>

          <select
            name="designation"
            value={form.designation}
            onChange={handleChange}
            disabled={!form.department}
          >
            <option value="">
              {form.department
                ? "Select Designation"
                : "Select Department First"}
            </option>

            {designations.map((designation) => (
              <option key={designation._id} value={designation._id}>
                {designation.name}
              </option>
            ))}
          </select>

          <div className="form-actions">
            <Button type="submit">Create Employee</Button>
          </div>
        </form>
      </FormCard>
    </div>
  );
};

export default CreateEmployee;
