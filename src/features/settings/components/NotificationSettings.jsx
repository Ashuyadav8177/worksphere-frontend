import { useState } from "react";
import Button from "../../../components/common/Button";

function Toggle({ checked, onChange, label }) {
  return (
    <label className="flex cursor-pointer items-center justify-between py-3">
      <span className="text-sm text-gray-700">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ${
          checked ? "bg-violet-600" : "bg-gray-200"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
            checked ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </label>
  );
}

function NotificationSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [leaveNotifications, setLeaveNotifications] = useState(true);
  const [taskNotifications, setTaskNotifications] = useState(false);
  const [attendanceNotifications, setAttendanceNotifications] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Notification settings updated successfully");
  };

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <h2 className="mb-2 text-base font-semibold text-gray-900">Notification Settings</h2>

      <form onSubmit={handleSubmit}>
        <div className="divide-y divide-gray-100">
          <Toggle label="Email Notifications" checked={emailNotifications} onChange={setEmailNotifications} />
          <Toggle label="Push Notifications" checked={pushNotifications} onChange={setPushNotifications} />
          <Toggle label="Leave Notifications" checked={leaveNotifications} onChange={setLeaveNotifications} />
          <Toggle label="Task Notifications" checked={taskNotifications} onChange={setTaskNotifications} />
          <Toggle
            label="Attendance Notifications"
            checked={attendanceNotifications}
            onChange={setAttendanceNotifications}
          />
        </div>

        <div className="mt-5 flex justify-end border-t border-gray-100 pt-5">
          <Button type="submit" variant="primary">
            Save Notification Settings
          </Button>
        </div>
      </form>
    </div>
  );
}

export default NotificationSettings;