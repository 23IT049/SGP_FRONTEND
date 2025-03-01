import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedPDARoute = ({ children }) => {
  const { user } = useAuth();

//   const isPDA = user?.role === "pda";

  // Assume that "pda" is a role or condition you're checking for
//   const isPDA = user === "pda"; 
const isPDA = true
  
  return isPDA ? children : <Navigate to="/" />;
};

export default ProtectedPDARoute;
