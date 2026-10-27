import { Route, Routes } from "react-router-dom";

import WebsiteLayout from "../layouts/WebsiteLayout";

import Home from "../pages/website/Home";
import About from "../pages/website/About";
import Contact from "../pages/website/Contact";

import Wholesale from "../pages/website/wholesale/Wholesale";

import Journal from "../pages/website/Journal";
import JournalDetail from "../pages/website/JournalDetail";

import Collections from "../pages/website/Collections";
import CollectionDetail from "../pages/website/CollectionDetail";
import CollectionProducts from "../components/website/collections/CollectionProducts";

import Categories from "../pages/website/Categories";
import CategoryDetail from "../pages/website/CategoryDetail";

import QuickOrder from "../pages/website/QuickOrder";

import TradeLogin from "../pages/website/trade/TradeLogin";
import TradeDashboard from "../pages/website/trade/TradeDashboard";
import TradeProtectedRoute from "./TradeProtectedRoute";

import Products from "../pages/website/Products";
import ProductDetail from "../pages/website/ProductDetail";

import MyQuickOrders from "../components/website/trade/components/MyQuickOrders";
import TradeProfile from "../components/website/trade/components/TradeProfile";

import SampleRequest from "../pages/website/SampleRequest";
import TradeSampleRequest from "../pages/website/trade/TradeSampleRequest";
import MySampleOrders from "../components/website/trade/components/MySampleOrder";
import SetPassword from "../components/website/trade/SetPassword";
import TradeForgotPassword from "../components/website/trade/TradeForgotPassword";
import TradeResetPassword from "../components/website/trade/TradeResetPassword";
import SamplePayment from "../components/website/sampleOrder/SamplePayment";
import NotFound from "../pages/website/NotFound";

// Forgot Password

// import TradeVerifyOtp from "../pages/website/trade/TradeVerifyOtp";

// Set Password
//import TradeSetPassword from "../pages/website/trade/TradeSetPassword";

export default function WebsiteRoutes() {
  return (
    <Routes>
      {/* ================= WEBSITE ================= */}

      <Route element={<WebsiteLayout />}>
        {/* Home */}
        <Route index element={<Home />} />

        {/* About */}
        <Route path="/about" element={<About />} />

        {/* Contact */}
        <Route path="/contact" element={<Contact />} />

        {/* Wholesale */}
        <Route path="/wholesale" element={<Wholesale />} />

        {/* Collections */}
        <Route path="/collections" element={<Collections />} />

        <Route path="/collections/:slug" element={<CollectionDetail />} />

        <Route
          path="/collections/:slug/products"
          element={<CollectionProducts />}
        />

        {/* Categories */}
        <Route path="/categories" element={<Categories />} />

        <Route path="/categories/:slug" element={<CategoryDetail />} />

        {/* Products */}
        <Route path="/products" element={<Products />} />

        <Route path="/products/:slug" element={<ProductDetail />} />

        {/* Sample Request */}
        <Route path="/sample-request/:slug" element={<SampleRequest />} />

        <Route path="/sample-payment" element={<SamplePayment />} />

        {/* Journal */}
        <Route path="/journal" element={<Journal />} />

        <Route path="/journal/:slug" element={<JournalDetail />} />

        {/* <Route path="/shipping" element={<Shipping />} />
        <Route path="/returns-exchanges" element={<ReturnsExchanges />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/faqs" element={<FAQs />} /> */}

        {/* Trade Login */}
        <Route path="/trade-login" element={<TradeLogin />} />

        {/* ================= TRADE PASSWORD RECOVERY ================= */}

        <Route
          path="/trade/forgot-password"
          element={<TradeForgotPassword />}
        />

        {/* <Route
          path="/trade/verify-otp"
          element={<TradeVerifyOtp />}
        /> */}

        <Route path="/trade/reset-password" element={<TradeResetPassword />} />
      </Route>

      {/* ================= PROTECTED TRADE PORTAL ================= */}

      <Route element={<TradeProtectedRoute />}>
        <Route path="/trade/dashboard" element={<TradeDashboard />} />

        <Route path="/trade/profile" element={<TradeProfile />} />

        <Route path="/trade/set-password" element={<SetPassword />} />

        <Route path="/trade/quick-order" element={<QuickOrder />} />

        <Route path="/trade/quick-orders" element={<MyQuickOrders />} />

        <Route path="/trade/sample-orders" element={<MySampleOrders />} />

        <Route
          path="/trade/sample-order/:slug"
          element={<TradeSampleRequest />}
        />

        {/* Existing password-change flow */}
        {/* <Route
          path="/trade/set-password"
          element={<TradeSetPassword />}
        /> */}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
