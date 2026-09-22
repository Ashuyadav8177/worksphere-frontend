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

function SecuritySettings() {
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [activeSessions, setActiveSessions] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Security settings updated successfully");
  };

  const handleLogoutSessions = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout from all other sessions?"
    );
    if (!confirmLogout) return;

    alert("All other sessions have been logged out");
    setActiveSessions(false);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
        <h2 className="mb-2 text-base font-semibold text-gray-900">Security Settings</h2>

        <form onSubmit={handleSubmit}>
          <div className="divide-y divide-gray-100">
            <Toggle label="Enable Two-Factor Authentication" checked={twoFactorAuth} onChange={setTwoFactorAuth} />
            <Toggle label="Login Alerts" checked={loginAlerts} onChange={setLoginAlerts} />
            <Toggle label="Keep Active Sessions" checked={activeSessions} onChange={setActiveSessions} />
          </div>

          <div className="mt-5 flex justify-end border-t border-gray-100 pt-5">
            <Button type="submit" variant="primary">
              Save Security Settings
            </Button>
          </div>
        </form>
      </div>

      {/* Session Management */}
      <div className="rounded-xl border border-red-100 bg-red-50/30 p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
        <h3 className="text-base font-semibold text-gray-900">Session Management</h3>
        <p className="mt-1 text-sm text-gray-500">Manage your active login sessions.</p>

        <div className="mt-4">
          <Button type="button" variant="danger" onClick={handleLogoutSessions}>
            Logout Other Sessions
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SecuritySettings;