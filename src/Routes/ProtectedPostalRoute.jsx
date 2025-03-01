import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedPostalRoute = ({ children }) => {
//   const { user } = useAuth();

//   const isPostalCircleAdmin = user && user.role === "postalCircleAdmin"; 
const isPostalCircleAdmin = true;

  return isPostalCircleAdmin ? children : <Navigate to="/" />;
};

export default ProtectedPostalRoute;
