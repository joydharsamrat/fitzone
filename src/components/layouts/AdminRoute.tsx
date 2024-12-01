import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/features/hooks";

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const { user, token } = useAppSelector((state) => state.auth);

  if (!token || user?.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminRoute;
