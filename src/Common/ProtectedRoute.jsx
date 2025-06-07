import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children, message = "Login first to access this page" }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    toast.warn(message, {
      toastId: "login-required",
      hideProgressBar: true,
    });
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
