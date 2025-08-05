import { Navigate, useLocation } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

function ProtectedRouteAgent({ children }: ProtectedRouteProps) {
  //const token="vvv"
  const token = sessionStorage.getItem("Agtoken");
  const location = useLocation();
  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return <>{children}</>;
}

export default ProtectedRouteAgent;
