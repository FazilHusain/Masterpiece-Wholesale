import { useEffect } from "react";
import { useDispatch } from "react-redux";

import AppRoutes from "./routes/AppRoutes";

import {
  loginSuccess,
  authChecked,
  logout,
} from "./redux/auth/authSlice";

import { fetchWebsiteSettings } from "./redux/websiteSetting/websiteSettingThunk";

import { getProfile } from "./services/auth.service";
import WebsiteFavicon from "./components/ui/WebsiteFavicon";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // ==========================
    // Fetch Website Settings
    // ==========================

    dispatch(fetchWebsiteSettings());

    // ==========================
    // Check Admin Authentication
    // ==========================

    const checkAuth = async () => {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        dispatch(authChecked());
        return;
      }

      try {
        const { data } = await getProfile();

        dispatch(loginSuccess(data.admin));
      } catch (error) {
        localStorage.removeItem("adminToken");
        dispatch(logout());
      }
    };

    checkAuth();
  }, [dispatch]);

  return (
  <>
    <WebsiteFavicon />
    <AppRoutes />
  </>
);
}

export default App;