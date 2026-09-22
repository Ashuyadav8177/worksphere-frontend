import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState({
    isAuthenticated: true,
    name: "Admin User",
    email: "admin@soms.com",
    role: "ADMIN",
  });

  const login = (userData) => {
    setUser({
      ...userData,
      isAuthenticated: true,
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;