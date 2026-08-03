import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  children,
  allowedRoles,
}) => {
  const role =
    localStorage.getItem("userRole")?.toLowerCase();

  if (!role) {
     return <Navigate to="/" replace />;
  }

  if (
    allowedRoles &&
    !allowedRoles
      .map((allowedRole) =>
        allowedRole.toLowerCase()
      )
      .includes(role)
  ) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;