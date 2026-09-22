import { useEffect, useState } from "react";
import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";

function DepartmentForm({ onSubmit, department, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    if (department) {
      setFormData({
        name: department.name,
        description: department.description || "",
      });
    } else {
      setFormData({
        name: "",
        description: "",
      });
    }
  }, [department]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);

    if (!department) {
      setFormData({ name: "", description: "" });
    }
  };

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">
        {department ? "Edit Department" : "Add Department"}
      </h2>

      <form onSubmit={handleSubmit} className="mt-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Input
            label="Department Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter department name"
            required
          />

          <Input
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
          />
        </div>

        <div className="mt-6 flex justify-end gap-3 border-t border-gray-100 pt-5">
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            {department ? "Update Department" : "Save Department"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default DepartmentForm;