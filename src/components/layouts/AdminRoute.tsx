import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../redux/features/hooks";

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const { user, token } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (!token || user?.role !== "admin") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default AdminRoute;
