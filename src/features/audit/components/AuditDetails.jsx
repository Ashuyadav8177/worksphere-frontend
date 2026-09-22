import { actionStyles } from "./AuditTable";

function AuditDetails({ user, action, resource, timestamp, ip, onClose }) {
  const details = [
    { label: "User", value: user },
    { label: "Resource", value: resource },
    { label: "Timestamp", value: timestamp },
    { label: "IP Address", value: ip },
  ];

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Audit Log Details</h2>
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

      {/* Action badge */}
      <div className="mt-5 flex justify-center">
        <span className={`rounded-full px-4 py-1.5 text-sm font-semibold ${actionStyles[action] || "bg-gray-100 text-gray-600"}`}>
          {action}
        </span>
      </div>

      {/* Details List */}
      <div className="mt-6 space-y-4 border-t border-gray-100 pt-5">
        {details.map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <span className="text-sm text-gray-500">{item.label}</span>
            <span className={`text-sm font-medium text-gray-900 ${item.label === "IP Address" ? "font-mono" : ""}`}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AuditDetails;