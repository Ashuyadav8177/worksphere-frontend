import Badge from "../../../components/ui/Badge";

const statusVariant = {
  approved: "active",
  pending: "pending",
  rejected: "inactive",
};

function LeaveCard({ employee, leaveType, startDate, endDate, reason, status }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-violet-100 text-sm font-semibold text-violet-600">
            {employee?.charAt(0)}
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-gray-900">{employee}</h3>
            <p className="truncate text-xs text-gray-500">{leaveType}</p>
          </div>
        </div>

        <Badge variant={statusVariant[status?.toLowerCase()] || "default"}>
          {status?.toUpperCase()}
        </Badge>
      </div>

      {/* Details */}
      <div className="mt-4 space-y-2 border-t border-gray-100 pt-4 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Start Date</span>
          <span className="font-medium text-gray-900">{startDate}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500">End Date</span>
          <span className="font-medium text-gray-900">{endDate}</span>
        </div>
        {reason && (
          <div>
            <span className="text-gray-500">Reason</span>
            <p className="mt-1 text-gray-700">{reason}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LeaveCard;