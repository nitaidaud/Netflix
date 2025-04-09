import { useAppSelector } from "@/store/Store";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type PrivateRouteProps = {
  children: ReactNode;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
    
  return isAuthenticated ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
