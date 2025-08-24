import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { token, role } = useAuth();
  if (!token) {
    return <Navigate to="/sign-in" />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" />;
  }
  return children;
};

export default PrivateRoute;
