import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Package,
  FolderOpen,
  LayoutGrid,
  Handshake,
  FileText,
  ShoppingBag,
} from "lucide-react";

import StatCard from "./components/StatCard";
import RecentTradeRequests from "./components/RecentTradeRequests";
import RecentProducts from "./components/RecentProducts";
import RecentJournal from "./components/RecentJournal";
import QuickActions from "./components/QuickActions";
import WebsiteStatus from "./components/WebsiteStatus";

import {
  fetchDashboardStats,
  fetchDashboardRecent,
} from "../../../redux/dashboard";

export default function Dashboard() {
  const dispatch = useDispatch();

  const { stats } = useSelector((state) => state.dashboard);
  console.log(stats)

  useEffect(() => {
    dispatch(fetchDashboardStats());
    dispatch(fetchDashboardRecent());
  }, [dispatch]);

  const statCards = [
    {
      title: "Products",
      value: stats.products,
      subtitle: "Manage product catalog",
      icon: Package,
    },
    {
      title: "Collections",
      value: stats.collections,
      subtitle: "Luxury collections",
      icon: FolderOpen,
    },
    {
      title: "Categories",
      value: stats.categories,
      subtitle: "Product categories",
      icon: LayoutGrid,
    },
    {
      title: "Trade Requests",
      value: stats.tradeRequests,
      subtitle: "Wholesale enquiries",
      icon: Handshake,
    },
    {
      title: "Journal",
      value: stats.journal,
      subtitle: "Published articles",
      icon: FileText,
    },
    {
      title: "Sample Orders",
      value: stats.sampleOrders,
      subtitle: "Sample purchases",
      icon: ShoppingBag,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-[#12312B]">Dashboard</h1>

        <p className="mt-2 text-gray-500">
          Welcome back. Here's an overview of your business.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {statCards.map((item) => (
          <StatCard key={item.title} {...item} />
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <RecentProducts />

        <RecentTradeRequests />
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <RecentJournal />

        <QuickActions />
      </div>

      <div>
        <WebsiteStatus />
      </div>
    </div>
  );
}