import StatCard from "./StatCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { fetchMyQuickOrders } from "../../../../redux/websiteQuickOrder";

export default function DashboardHome({ user }) {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { orders, loading } = useSelector((state) => state.websiteQuickOrder);

  useEffect(() => {
    dispatch(fetchMyQuickOrders());
  }, [dispatch]);

  return (
    <>
      {/* Welcome */}
      <div className="rounded-2xl bg-[#173724] p-8 text-white shadow-lg">
        <h2 className="font-cormorant text-5xl">
          Welcome Back,
          <span className="italic"> {user?.firstName}</span>
        </h2>

        <p className="mt-4 max-w-2xl text-white/80">
          Manage your trade account, monitor your quick orders and stay
          connected with His Masterpiece.
        </p>
      </div>

      {/* Stats */}
      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Quick Orders" value={orders?.length || 0} />

        <StatCard
          title="Pending"
          value={
            orders?.filter((item) => item.status === "pending").length || 0
          }
        />

        <StatCard
          title="Completed"
          value={
            orders?.filter((item) => item.status === "completed").length || 0
          }
        />

        <StatCard title="Account" value="Active" />
      </div>

      {/* Recent Orders */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-[#E8DFD2] bg-white shadow-sm">
        <div className="border-b border-[#E8DFD2] p-6">
          <h3 className="font-cormorant text-3xl text-[#173724]">
            Recent Quick Orders
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F7F3EB]">
              <tr>
                <th className="px-6 py-4 text-left">Order ID</th>

                <th className="px-6 py-4 text-left">Date</th>

                <th className="px-6 py-4 text-left">Status</th>

                <th className="px-6 py-4 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center">
                    Loading...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-gray-500">
                    No Quick Orders Yet
                  </td>
                </tr>
              ) : (
                orders.slice(0, 5).map((item) => (
                  <tr key={item._id} className="border-b hover:bg-[#faf8f3]">
                    <td className="px-6 py-4">{item.orderNumber}</td>

                    <td className="px-6 py-4">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs">
                        {item.status}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <button onClick={() => navigate("/trade/dashboard")}>
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
