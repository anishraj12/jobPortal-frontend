import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const token = useSelector((state: any) => state.jwt);

  // If no token exists, redirect to login page
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Decode the JWT token
  const decoded: any = jwtDecode(token);

  // If user role is not allowed, redirect to unauthorized page
  if (allowedRoles && !allowedRoles.includes(decoded.applicantType)) {
    return <Navigate to="/unauthorized" />;
  }

  // If everything is fine, render the children (protected route)
  return children;
};

export default ProtectedRoute;
