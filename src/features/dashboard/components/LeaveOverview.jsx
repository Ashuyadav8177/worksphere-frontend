function LeaveOverview({ approved, pending, rejected }) {
  const stats = [
    {
      label: "Leave Approved",
      value: approved,
      color: "bg-emerald-500",
    },
    {
      label: "Leave Pending",
      value: pending,
      color: "bg-orange-500",
    },
    {
      label: "Leave Rejected",
      value: rejected,
      color: "bg-red-500",
    },
  ];

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <h3 className="text-base font-semibold text-gray-900">
        Leave Overview
      </h3>

      <div className="mt-4 space-y-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <span
                className={`h-2.5 w-2.5 rounded-full ${stat.color}`}
              />
              <span className="text-sm text-gray-600">
                {stat.label}
              </span>
            </div>

            <span className="text-sm font-semibold text-gray-900">
              {stat.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LeaveOverview;
