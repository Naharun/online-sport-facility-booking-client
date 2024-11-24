import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../redux/store";

interface ProtectedRouteProps {
  children: JSX.Element;
  role: "admin" | "user";
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== role) {
    return (
      <Navigate
        to={user.role === "admin" ? "/admin/dashboard" : "/user/dashboard"}
      />
    );
  }

  return children;
};

export default ProtectedRoute;
