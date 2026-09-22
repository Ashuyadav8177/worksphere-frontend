import api from "./api";

const login = (loginData) => {
  return api.post("/auth/login", loginData);
};

const register = (registerData) => {
  return api.post("/auth/register", registerData);
};

const logout = () => {
  return api.post("/auth/logout");
};

export {
  login,
  register,
  logout,
};