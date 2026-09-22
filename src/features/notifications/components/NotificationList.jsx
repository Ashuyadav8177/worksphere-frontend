import NotificationItem from "./NotificationItem";
import EmptyState from "../../../components/common/EmptyState";

function NotificationList({ notifications, onMarkAsRead }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <h2 className="mb-4 text-base font-semibold text-gray-900">Notification List</h2>

      {notifications.length === 0 ? (
        <EmptyState title="No notifications available." />
      ) : (
        <div className="divide-y divide-gray-100">
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              message={notification.message}
              time={notification.time}
              read={notification.read}
              onMarkAsRead={() => onMarkAsRead(notification.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default NotificationList;