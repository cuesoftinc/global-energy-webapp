import React from "react";
import useValidateToken from "../../hook/useValidateToken";
import { Navigate } from "react-router-dom";

interface PROPS {
    children: React.ReactNode
}

const ProtectedAuthRoute: React.FC<PROPS> = ({ children }) => {
    const { validateToken } = useValidateToken();

    if (!validateToken) {
        return <Navigate to="/" />;
    }

    return children;
};
export default ProtectedAuthRoute