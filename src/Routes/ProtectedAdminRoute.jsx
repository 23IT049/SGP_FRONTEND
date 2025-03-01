import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedAdminRoute = ({ children }) => {
  const {user} = useAuth();

  const isAdmin = user === "admin"
  
  return isAdmin ? children : <Navigate to="/" />;
};

export default ProtectedAdminRoute;
