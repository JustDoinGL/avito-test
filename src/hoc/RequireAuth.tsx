import { FC, ReactElement } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";

interface RequireAuthProps {
  children: ReactElement;
}

const RequireAuth: FC<RequireAuthProps> = ({ children }) => {
  const location = useLocation();
  const { token } = useAppSelector((store) => store.registration);

  if (!token) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
};

export { RequireAuth };
