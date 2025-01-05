import { Navigate, Route, RouteProps } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";

const ProtectedRoute = (props: RouteProps) => {
  const auth =  useAppSelector((state)=> state.auth)

  if (auth.user) {
    if (props.path === "/login") {
      return <Navigate to={"/"} />;
    }
    return <Route {...props} />;
  } else if (!auth.user) {
    return <Navigate to={"/login"} />;
  } else {
    return <div>Not found</div>;
  }
};

export default ProtectedRoute;