import { actionStyles } from "./AuditTable";

function AuditCard({ user, action, resource, timestamp, ip }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-100 text-sm font-semibold text-violet-600">
            {user?.charAt(0)}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">{user}</h3>
            <p className="text-xs text-gray-500">{resource}</p>
          </div>
        </div>

        <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${actionStyles[action] || "bg-gray-100 text-gray-600"}`}>
          {action}
        </span>
      </div>

      {/* Meta */}
      <div className="mt-4 space-y-1.5 border-t border-gray-100 pt-4 text-xs text-gray-500">
        <p>Timestamp: {timestamp}</p>
        <p className="font-mono">IP: {ip}</p>
      </div>
    </div>
  );
}

export default AuditCard;