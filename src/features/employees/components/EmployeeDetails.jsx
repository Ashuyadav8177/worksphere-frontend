import Badge from "../../../components/ui/Badge";
import Button from "../../../components/common/Button";

const statusVariant = {
  active: "active",
  pending: "pending",
  inactive: "inactive",
};

function EmployeeDetails({ employee, onClose }) {
  if (!employee) {
    return null;
  }

  const details = [
    { label: "Employee ID", value: employee.id },
    { label: "Department", value: employee.department },
    { label: "Email", value: employee.email },
    { label: "Phone", value: employee.phone },
  ];

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Employee Details</h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Profile */}
      <div className="mt-5 flex flex-col items-center text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-violet-100 text-2xl font-semibold text-violet-600">
          {employee.name?.charAt(0)}
        </div>
        <h3 className="mt-3 text-base font-semibold text-gray-900">{employee.name}</h3>
        <div className="mt-2">
          <Badge variant={statusVariant[employee.status?.toLowerCase()] || "default"}>
            {employee.status?.toUpperCase()}
          </Badge>
        </div>
      </div>

      {/* Details List */}
      <div className="mt-6 space-y-4 border-t border-gray-100 pt-5">
        {details.map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <span className="text-sm text-gray-500">{item.label}</span>
            <span className="text-sm font-medium text-gray-900">{item.value}</span>
          </div>
        ))}
      </div>

      {/* Close Button */}
      <div className="mt-6 border-t border-gray-100 pt-5">
        <Button variant="secondary" className="w-full" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
}

export default EmployeeDetails;