import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ allowedRoles }) {
  const {
    isAuthenticated,
    user,
  } = useSelector((state) => state.auth);

  // ==========================================
  // NOT AUTHENTICATED
  // ==========================================

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // ==========================================
  // ROLE CHECK
  // ==========================================

  if (
    allowedRoles &&
    !allowedRoles.includes(user?.role)
  ) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  // ==========================================
  // ACCESS GRANTED
  // ==========================================

  return <Outlet />;
}

export default ProtectedRoute;