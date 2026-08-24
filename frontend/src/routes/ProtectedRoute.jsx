import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute() {
  const { isAuthenticated, authChecked } =
    useSelector((state) => state.auth);

  const token = localStorage.getItem("adminToken");

  if (!authChecked) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated && !token) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}