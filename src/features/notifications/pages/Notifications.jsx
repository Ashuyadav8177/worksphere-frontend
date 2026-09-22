
import { useEffect, useState } from "react";

import NotificationList from "../components/NotificationList";
import NotificationBadge from "../components/NotificationBadge";

import Button from "../../../components/common/Button";
import {
  getMyNotifications,
  markNotificationAsRead,
} from "../../../services/notificationService";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await getMyNotifications();

        const formattedNotifications = response.data.map((notification) => ({
          id: notification.id,
          message: notification.message,
          time: new Date(notification.createdAt).toLocaleString(),
          read: notification.isRead,
        }));

        setNotifications(formattedNotifications);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const handleMarkAsRead = async (id) => {
    try {
      await markNotificationAsRead(id);

      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === id
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  const handleMarkAllAsRead = async () => {
    const unreadNotifications = notifications.filter(
      (notification) => !notification.read
    );

    try {
      await Promise.all(
        unreadNotifications.map((notification) =>
          markNotificationAsRead(notification.id)
        )
      );

      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) => ({
          ...notification,
          read: true,
        }))
      );
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error);
    }
  };

  if (loading) {
    return <div className="text-sm text-gray-500">Loading notifications...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <NotificationBadge count={unreadCount} />

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Notifications
            </h1>

            <p className="text-sm text-gray-500">
              Unread Notifications:{" "}
              <span className="font-medium text-gray-700">
                {unreadCount}
              </span>
            </p>
          </div>
        </div>

        {unreadCount > 0 && (
          <Button variant="secondary" onClick={handleMarkAllAsRead}>
            Mark All as Read
          </Button>
        )}
      </div>

      {/* Notification List */}
      <NotificationList
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
      />
    </div>
  );
}

export default Notifications;
