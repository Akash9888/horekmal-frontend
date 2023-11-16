import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoutes() {
  const loginUserInfo = useSelector((state) => state.userLoginR);
  const { userInfo } = loginUserInfo;

  return userInfo ? <Outlet /> : <Navigate to="/sign-in" />;
}
