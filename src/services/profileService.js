import api from "./api";

const getProfile = () => {
  return api.get("/profile");
};

const updateProfile = (profileData) => {
  return api.put(
    "/profile",
    profileData
  );
};

const changePassword = (passwordData) => {
  return api.put(
    "/profile/change-password",
    passwordData
  );
};

const uploadProfilePicture = (formData) => {
  return api.post(
    "/profile/profile-picture",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export {
  getProfile,
  updateProfile,
  changePassword,
  uploadProfilePicture,
};