function AttendanceCard({ employee, department, present, absent, late }) {
  const stats = [
    { label: "Present", value: present, color: "text-emerald-600 bg-emerald-50" },
    { label: "Absent", value: absent, color: "text-red-600 bg-red-50" },
    { label: "Late", value: late, color: "text-orange-600 bg-orange-50" },
  ];

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-violet-100 text-sm font-semibold text-violet-600">
          {employee?.charAt(0)}
        </div>
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-gray-900">{employee}</h3>
          <p className="truncate text-xs text-gray-500">{department}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-gray-100 pt-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`rounded-lg px-2 py-2.5 text-center ${stat.color}`}
          >
            <p className="text-base font-bold">{stat.value}</p>
            <p className="text-[11px] font-medium">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AttendanceCard;
