import Badge from "../../../components/ui/Badge";

const statusVariant = {
  approved: "active",
  pending: "pending",
  rejected: "inactive",
};

function LeaveDetails({ employee, leaveType, startDate, endDate, reason, status, onClose }) {
  const details = [
    { label: "Leave Type", value: leaveType },
    { label: "Start Date", value: startDate },
    { label: "End Date", value: endDate },
    { label: "Reason", value: reason },
  ];

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Leave Details</h2>
        {onClose && (
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
        )}
      </div>

      {/* Profile */}
      <div className="mt-5 flex flex-col items-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-100 text-xl font-semibold text-violet-600">
          {employee?.charAt(0)}
        </div>
        <h3 className="mt-3 text-base font-semibold text-gray-900">{employee}</h3>
        <div className="mt-2">
          <Badge variant={statusVariant[status?.toLowerCase()] || "default"}>
            {status?.toUpperCase()}
          </Badge>
        </div>
      </div>

      {/* Details List */}
      <div className="mt-6 space-y-4 border-t border-gray-100 pt-5">
        {details.map((item) => (
          <div key={item.label} className="flex items-start justify-between gap-4">
            <span className="shrink-0 text-sm text-gray-500">{item.label}</span>
            <span className="text-right text-sm font-medium text-gray-900">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LeaveDetails;