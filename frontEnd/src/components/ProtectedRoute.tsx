import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";

const ProtectedRoute = () => {
  const auth = useAppSelector((state) => state.auth);
  if (auth.user) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" replace={true} />;
  }
};

export default ProtectedRoute;
