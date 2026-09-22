import { useEffect, useState } from "react";
import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";
import { getEmployees } from "../../../services/employeeService";

function TaskForm({ onSubmit, editingTask }) {
  const [employees, setEmployees] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedToId: "",
    dueDate: "",
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await getEmployees();
        setEmployees(response.data.content);
      } catch (error) {
        console.error("Failed to fetch employees", error);
      }
    };
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title || "",
        description: editingTask.description || "",
        assignedToId: editingTask.assignedToId || "",
        dueDate: editingTask.dueDate || "",
      });
    } else {
      setFormData({ title: "", description: "", assignedToId: "", dueDate: "" });
    }
  }, [editingTask]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);

    if (!editingTask) {
      setFormData({ title: "", description: "", assignedToId: "", dueDate: "" });
    }
  };

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <h2 className="text-lg font-semibold text-gray-900">
        {editingTask ? "Edit Task" : "Create Task"}
      </h2>

      <form onSubmit={handleSubmit} className="mt-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Input
              label="Task Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title"
              required
            />
          </div>

          <div className="w-full">
            <label htmlFor="assignedToId" className="mb-1.5 block text-sm font-medium text-gray-700">
              Assign To
            </label>
            <select
              id="assignedToId"
              name="assignedToId"
              value={formData.assignedToId}
              onChange={handleChange}
              required
              className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none transition-all duration-200 hover:border-gray-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10"
            >
              <option value="">Select employee</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.firstName} {emp.lastName}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Due Date"
            name="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={handleChange}
            required
          />

          <div className="sm:col-span-2">
            <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter task description"
              rows={3}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end border-t border-gray-100 pt-5">
          <Button type="submit" variant="primary">
            {editingTask ? "Update Task" : "Create Task"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;