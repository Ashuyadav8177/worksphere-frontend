function NotificationItem({ message, time, read, onMarkAsRead }) {
  return (
    <div
      className={`flex items-start gap-3 rounded-lg px-3 py-3 transition-colors ${
        read ? "bg-white" : "bg-violet-50/50"
      }`}
    >
      {/* Icon */}
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-600">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
        </svg>
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <p className="text-sm text-gray-800">{message}</p>
        <small className="mt-0.5 block text-xs text-gray-400">{time}</small>
      </div>

      {/* Action / status */}
      {!read ? (
        <button
          type="button"
          onClick={onMarkAsRead}
          className="shrink-0 rounded-lg px-2.5 py-1 text-xs font-medium text-violet-600 transition-colors hover:bg-violet-100"
        >
          Mark as Read
        </button>
      ) : (
        <span className="shrink-0 text-xs font-medium text-gray-400">Read</span>
      )}

      {/* Unread dot */}
      {!read && <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-violet-500" />}
    </div>
  );
}

export default NotificationItem;