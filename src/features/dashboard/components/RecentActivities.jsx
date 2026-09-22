function RecentActivities({ activities }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <h3 className="text-base font-semibold text-gray-900">Recent Activities</h3>

      <div className="mt-4 space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-violet-500" />
            <div className="min-w-0">
              <p className="text-sm text-gray-700">{activity.text}</p>
              {activity.time && (
                <p className="mt-0.5 text-xs text-gray-400">{activity.time}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentActivities;