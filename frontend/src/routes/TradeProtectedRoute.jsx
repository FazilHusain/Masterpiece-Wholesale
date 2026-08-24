import { Navigate, Outlet, useLocation } from "react-router-dom";

const TradeProtectedRoute = () => {
  const location = useLocation();

  const token = localStorage.getItem("tradeToken");
  const storedUser = localStorage.getItem("tradeUser");

  // Login nahi hai
  if (!token) {
    return <Navigate to="/trade-login" replace />;
  }

  let user;

  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch {
    user = null;
  }

  // Password change required
  if (
    user?.mustChangePassword === true &&
    location.pathname !== "/trade/set-password"
  ) {
    return <Navigate to="/trade/set-password" replace />;
  }

  return <Outlet />;
};

export default TradeProtectedRoute;