const toastConfig = {
  success: {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    iconBg: "bg-emerald-500",
    text: "text-emerald-800",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    ),
  },
  error: {
    bg: "bg-red-50",
    border: "border-red-200",
    iconBg: "bg-red-500",
    text: "text-red-800",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    ),
  },
  info: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    iconBg: "bg-blue-500",
    text: "text-blue-800",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    ),
  },
};

function Toast({ message, title, type = "info", onClose }) {
  const config = toastConfig[type] || toastConfig.info;

  return (
    <div
      className={`flex w-full max-w-sm items-start gap-3 rounded-lg border ${config.bg} ${config.border} px-4 py-3 shadow-sm`}
    >
      <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${config.iconBg}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3.5 w-3.5 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          {config.icon}
        </svg>
      </div>

      <div className="min-w-0 flex-1">
        {title && (
          <p className={`text-sm font-semibold ${config.text}`}>{title}</p>
        )}
        <p className={`text-sm ${title ? "mt-0.5 text-gray-600" : `font-medium ${config.text}`}`}>
          {message}
        </p>
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close notification"
          className="shrink-0 text-gray-400 transition-colors hover:text-gray-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default Toast;
