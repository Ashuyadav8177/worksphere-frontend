import { useState } from "react";
import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";

function LeaveForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    leaveType: "CASUAL",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);

    setFormData({
      leaveType: "CASUAL",
      startDate: "",
      endDate: "",
      reason: "",
    });
  };

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <h2 className="text-lg font-semibold text-gray-900">Apply Leave</h2>

      <form onSubmit={handleSubmit} className="mt-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* Leave Type */}
          <div className="w-full">
            <label htmlFor="leaveType" className="mb-1.5 block text-sm font-medium text-gray-700">
              Leave Type
            </label>
            <select
              id="leaveType"
              name="leaveType"
              value={formData.leaveType}
              onChange={handleChange}
              className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none transition-all duration-200 hover:border-gray-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10"
            >
              <option value="CASUAL">Casual</option>
              <option value="SICK">Sick</option>
              <option value="PAID">Paid</option>
              <option value="EMERGENCY">Emergency</option>
            </select>
          </div>

          {/* Start Date */}
          <Input
            label="Start Date"
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleChange}
            required
          />

          {/* End Date */}
          <Input
            label="End Date"
            name="endDate"
            type="date"
            value={formData.endDate}
            onChange={handleChange}
            required
          />

          {/* Reason */}
          <div className="sm:col-span-2">
            <label htmlFor="reason" className="mb-1.5 block text-sm font-medium text-gray-700">
              Reason
            </label>
            <textarea
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Enter leave reason"
              required
              rows={3}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="mt-6 flex justify-end border-t border-gray-100 pt-5">
          <Button type="submit" variant="primary">
            Apply Leave
          </Button>
        </div>
      </form>
    </div>
  );
}

export default LeaveForm;