import { Navigate, Route, Routes } from "react-router-dom";

import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";

import Dashboard from "../pages/admin/dashboard/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "../layouts/AdminLayout";

import {
  Collections,
  CreateCollection,
  EditCollection,
} from "../pages/admin/collections";

import CollectionDetails from "../pages/admin/collections/CollectionDetails";

import {
  Categories,
  CreateCategory,
  EditCategory,
} from "../pages/admin/categories";

import CategoryDetails from "../pages/admin/categories/CategoryDetails";

import {
  Products,
  CreateProduct,
  EditProduct,
  ProductDetails,
} from "../pages/admin/products";

import { Orders, OrderDetails } from "../pages/admin/orders";

import Settings from "../pages/admin/settings/Settings";

import Journal from "../pages/admin/journal/Journal";
import CreateJournal from "../pages/admin/journal/CreateJournal";
import EditJournal from "../pages/admin/journal/EditJournal";
import JournalDetails from "../pages/admin/journal/JournalDetails";

import Banner from "../pages/admin/banner/Banner";
import CreateBanner from "../pages/admin/banner/CreateBanner";
import EditBanner from "../pages/admin/banner/EditBanner";
import BannerDetails from "../pages/admin/banner/BannerDetails";

import SampleOrders from "../pages/admin/sample-orders/SampleOrders";
import SampleOrderDetails from "../pages/admin/sample-orders/SampleOrderDetails";

import Applications from "../pages/admin/wholesale/Applications";
import ApplicationDetails from "../pages/admin/wholesale/ApplicationDetails";

import Contacts from "../pages/admin/contact/Contacts";
import ContactDetails from "../pages/admin/contact/ContactDetails";

import AdminManagement from "../pages/admin/AdminManagement/AdminManagement";

import QuickOrders from "../pages/admin/quick-orders";
import QuickOrderDetails from "../pages/admin/quick-orders/QuickOrderDetails";
import AdminNotFound from "../pages/admin/AdminNotFound";

export default function AdminRoutes() {
  return (
    <Routes>
      {/* ========================================
          ADMIN ROOT
      ======================================== */}

      <Route path="/" element={<Navigate to="/admin/login" replace />} />

      {/* ========================================
          PUBLIC AUTH ROUTES
      ======================================== */}

      <Route path="login" element={<Login />} />

      <Route path="forgot-password" element={<ForgotPassword />} />

      <Route index element={<Navigate to="login" replace />} />

      {/* ========================================
          PROTECTED ADMIN ROUTES
      ======================================== */}

      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          {/* Dashboard */}

          <Route path="dashboard" element={<Dashboard />} />

          {/* Admin Management */}

          <Route path="admins" element={<AdminManagement />} />

          {/* Contacts */}

          <Route path="contact" element={<Contacts />} />

          <Route path="contact/:id" element={<ContactDetails />} />

          {/* Wholesale */}

          <Route path="wholesale" element={<Applications />} />

          <Route path="wholesale/:id" element={<ApplicationDetails />} />

          {/* Sample Orders */}

          <Route path="sample-orders" element={<SampleOrders />} />

          <Route path="sample-orders/:id" element={<SampleOrderDetails />} />

          {/* Banners */}

          <Route path="banner" element={<Banner />} />

          <Route path="banner/create" element={<CreateBanner />} />

          <Route path="banner/:id/edit" element={<EditBanner />} />

          <Route path="banner/:id" element={<BannerDetails />} />

          {/* Journal */}

          <Route path="journal" element={<Journal />} />

          <Route path="journal/create" element={<CreateJournal />} />

          <Route path="journal/:id/edit" element={<EditJournal />} />

          <Route path="journal/:id" element={<JournalDetails />} />

          {/* Quick Orders */}

          <Route path="quick-orders" element={<QuickOrders />} />

          <Route path="quick-orders/:id" element={<QuickOrderDetails />} />

          {/* Settings */}

          <Route path="settings" element={<Settings />} />

          {/* Orders */}

          <Route path="orders" element={<Orders />} />

          <Route path="orders/:id" element={<OrderDetails />} />

          {/* Products */}

          <Route path="products" element={<Products />} />

          <Route path="products/create" element={<CreateProduct />} />

          <Route path="products/:id/edit" element={<EditProduct />} />

          <Route path="products/:id" element={<ProductDetails />} />

          {/* Categories */}

          <Route path="categories" element={<Categories />} />

          <Route path="categories/create" element={<CreateCategory />} />

          <Route path="categories/:id/edit" element={<EditCategory />} />

          <Route path="categories/:id" element={<CategoryDetails />} />

          {/* Collections */}

          <Route path="collections" element={<Collections />} />

          <Route path="collections/create" element={<CreateCollection />} />

          <Route path="collections/:id/edit" element={<EditCollection />} />

          <Route path="collections/:id" element={<CollectionDetails />} />
        </Route>
      </Route>

      {/* ========================================
          ADMIN 404
      ======================================== */}

      <Route path="*" element={<AdminNotFound />} />
    </Routes>
  );
}
