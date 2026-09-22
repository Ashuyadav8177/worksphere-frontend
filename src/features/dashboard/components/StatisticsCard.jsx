function StatisticsCard({ title, value, icon, trend, trendDirection = "up", iconColor = "violet" }) {
  const iconColors = {
    violet: "bg-violet-100 text-violet-600",
    blue: "bg-blue-100 text-blue-600",
    emerald: "bg-emerald-100 text-emerald-600",
    orange: "bg-orange-100 text-orange-600",
  };

  return (
    <div className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <div
        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${
          iconColors[iconColor] || iconColors.violet
        }`}
      >
        {icon}
      </div>

      <div className="min-w-0">
        <h3 className="text-sm text-gray-500">{title}</h3>
        <h2 className="mt-0.5 text-2xl font-bold text-gray-900">{value}</h2>

        {trend && (
          <p
            className={`mt-1 flex items-center gap-1 text-xs font-medium ${
              trendDirection === "up" ? "text-emerald-600" : "text-red-500"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-3 w-3 ${trendDirection === "down" ? "rotate-180" : ""}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
            </svg>
            {trend}
          </p>
        )}
      </div>
    </div>
  );
}

export default StatisticsCard;
