import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getPage } from "../../utils/helpers";
import { useAppSelector } from "../../redux/hooks";

const ClientProtectedRoute = () => {
  const currentPage = getPage();
  const { user } = useAppSelector((state) => state.user);

  if (user?.role === "client") {
    if (currentPage === "client") {
      return <Navigate to={"/dashboard"} />;
    }
    return <Outlet />;
  } else {
    return <Navigate to={"/"} replace />;
  }
};

export default ClientProtectedRoute;
