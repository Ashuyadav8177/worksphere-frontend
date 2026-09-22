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

function TaskCard({ title, assignedTo, status, priority, dueDate }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${priorityStyles[priority] || priorityStyles.LOW}`}>
          {priority}
        </span>
      </div>

      {/* Assigned To */}
      <div className="mt-3 flex items-center gap-2">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-semibold text-violet-600">
          {assignedTo?.charAt(0)}
        </div>
        <span className="text-sm text-gray-700">{assignedTo}</span>
      </div>

      {/* Status + Due Date */}
      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
        <Badge variant={statusVariant[status] || "default"}>{status?.replace("_", " ")}</Badge>
        <span className="text-xs text-gray-500">Due: {dueDate}</span>
      </div>
    </div>
  );
}

export default TaskCard;