import Badge from "../../../components/ui/Badge";

const statusVariant = {
  TODO: "pending",
  IN_PROGRESS: "new",
  COMPLETED: "active",
};

const priorityStyles = {
  HIGH: "bg-red-100 text-red-700",
  MEDIUM: "bg-orange-100 text-orange-700",
  LOW: "bg-gray-100 text-gray-600",
};

function TaskDetails({ title, assignedTo, status, priority, dueDate, description, onClose }) {
  const details = [
    { label: "Assigned To", value: assignedTo },
    { label: "Due Date", value: dueDate },
    { label: "Description", value: description || "—" },
  ];

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Task Details</h2>
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

      {/* Title + badges */}
      <div className="mt-5">
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
        <div className="mt-2 flex items-center gap-2">
          <Badge variant={statusVariant[status] || "default"}>{status?.replace("_", " ")}</Badge>
          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${priorityStyles[priority] || priorityStyles.LOW}`}>
            {priority}
          </span>
        </div>
      </div>

      {/* Details List */}
      <div className="mt-6 space-y-4 border-t border-gray-100 pt-5">
        {details.map((item) => (
          <div key={item.label}>
            <span className="text-sm text-gray-500">{item.label}</span>
            <p className="mt-1 text-sm font-medium text-gray-900">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskDetails;