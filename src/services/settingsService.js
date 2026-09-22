import api from "./api";

const getSettings = () => {
  return api.get("/settings");
};

const updateAccountSettings = (settingsData) => {
  return api.put(
    "/settings/account",
    settingsData
  );
};

const updateNotificationSettings = (
  settingsData
) => {
  return api.put(
    "/settings/notifications",
    settingsData
  );
};

const updateSecuritySettings = (
  settingsData
) => {
  return api.put(
    "/settings/security",
    settingsData
  );
};

export {
  getSettings,
  updateAccountSettings,
  updateNotificationSettings,
  updateSecuritySettings,
};