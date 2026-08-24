import { Outlet } from "react-router-dom";

import Footer from "../components/website/layout/Footer";
import ScrollToTop from "../components/website/layout/ScrollToTop";
import WebsiteHeader from "../components/website/layout/WebsiteHeader";
import Newsletter from "../components/common/Newsletter";

export default function WebsiteLayout() {
  return (
    <>
      <ScrollToTop />

      <WebsiteHeader />

      <main className="min-h-screen">
        <Outlet />
      </main>
      <Newsletter />
      <Footer />
    </>
  );
}