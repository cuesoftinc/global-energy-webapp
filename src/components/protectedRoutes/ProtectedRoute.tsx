import React from "react";
import { Navigate } from "react-router-dom";
import useValidateToken from "../../hook/useValidateToken";

interface PROPS {
    children: React.ReactNode;
  }
  const ProtectedRoute: React.FC<PROPS> = ({ children }) => {
    const { validateToken } = useValidateToken();
  
    if (validateToken) {
      return <Navigate to="/dashboard" />;
    }
    return children;
  };
  
  export default ProtectedRoute;
  