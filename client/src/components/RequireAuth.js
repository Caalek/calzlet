import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const { user } = useAuth();
  return (user && user.token) ? children : <Navigate to="/login" />;
};
export default RequireAuth;
