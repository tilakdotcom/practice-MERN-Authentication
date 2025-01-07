import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";

export const ProtectedRouteForAuthentic = () => {
  const auth = useAppSelector((state) => state.auth);

  console.log(typeof(auth.user?.verified))

  // if (auth.user?.verified == false) {
  //   return <Navigate to="/verify-email" replace={true} />;
  // } 

  if (auth.user) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" replace={true} />;
  }
};

export const ProtectedRouteForNotAuthentic = () => {
  const auth = useAppSelector((state) => state.auth);
  if (!auth.user) {
    return <Outlet />;
  } else {
    return <Navigate to="/dashboard" replace={true} />;
  }
};
