import { Navigate } from "react-router-dom";

function RoleRoute({ children, allowedRoles }) {
  const userRole = "ADMIN";

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default RoleRoute;