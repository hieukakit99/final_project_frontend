import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const userToken = localStorage.getItem("userToken"); // Kiểm tra token đăng nhập

  if (!userToken) {
    return <Navigate to="/sign-in" />; // Chuyển hướng đến trang đăng nhập nếu chưa đăng nhập
  }

  return <Outlet />; // Hiển thị nội dung nếu đã đăng nhập
};

export default PrivateRoute;
