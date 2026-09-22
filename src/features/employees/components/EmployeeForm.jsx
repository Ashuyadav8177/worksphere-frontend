import { useEffect, useState } from "react";
import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";

function EmployeeForm({ onSubmit, employee }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    designation: "",
    salary: "",
    phone: "",
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name,
        email: employee.email,
        department: employee.department,
        designation: employee.designation || "",
        salary: employee.salary || "",
        phone: employee.phone,
      });
    } else {
      setFormData({
        name: "",
        email: "",
        department: "",
        designation: "",
        salary: "",
        phone: "",
      });
    }
  }, [employee]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);

    if (!employee) {
      setFormData({
        name: "",
        email: "",
        department: "",
        designation: "",
        salary: "",
        phone: "",
      });
    }
  };

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">
        {employee ? "Edit Employee" : "Add New Employee"}
      </h2>

      <form onSubmit={handleSubmit} className="mt-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Input
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter full name"
            required
          />

          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />

          <Input
            label="Department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="Enter department"
            required
          />

          <Input
            label="Designation"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            placeholder="Enter designation"
            required
          />

          <Input
            label="Salary"
            name="salary"
            type="number"
            value={formData.salary}
            onChange={handleChange}
            placeholder="Enter salary"
            required
          />

          <Input
            label="Phone Number"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            required
          />
        </div>

        <div className="mt-6 flex justify-end gap-3 border-t border-gray-100 pt-5">
          <Button type="button" variant="secondary">
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            {employee ? "Update Employee" : "Save Employee"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EmployeeForm;