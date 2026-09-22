function AttendanceStats({ present, absent, late }) {
  const stats = [
    {
      label: "Present",
      value: present,
      iconBg: "bg-emerald-100 text-emerald-600",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      ),
    },
    {
      label: "Absent",
      value: absent,
      iconBg: "bg-red-100 text-red-600",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      ),
    },
    {
      label: "Late",
      value: late,
      iconBg: "bg-orange-100 text-orange-600",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      ),
    },
  ];

  return (
    <div>
      <h2 className="mb-4 text-base font-semibold text-gray-900">Attendance Statistics</h2>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
          >
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${stat.iconBg}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                {stat.icon}
              </svg>
            </div>

            <div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="mt-0.5 text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AttendanceStats;
