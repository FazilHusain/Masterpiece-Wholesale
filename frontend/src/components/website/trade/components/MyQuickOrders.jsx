import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TradeQuickOrderDetails from "./TradeQuickOrderDetails";
import {
  fetchMyQuickOrder,
  fetchMyQuickOrders,
} from "../../../../redux/websiteQuickOrder/tradeQuickOrderThunk";

const statusColor = {
  pending: "bg-yellow-100 text-yellow-700",

  confirmed: "bg-blue-100 text-blue-700",

  processing: "bg-indigo-100 text-indigo-700",

  completed: "bg-green-100 text-green-700",

  cancelled: "bg-red-100 text-red-700",
};

export default function MyQuickOrders() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [selectedOrder, setSelectedOrder] = useState(null);

  const [showDetails, setShowDetails] = useState(false);

  const { orders, loading } = useSelector((state) => state.websiteQuickOrder);

  useEffect(() => {
    dispatch(fetchMyQuickOrders());
  }, [dispatch]);

  return (
    <>
      <div className="rounded-2xl border border-[#E6DED2] bg-white shadow-sm">
        {/* Header */}

        <div className="flex items-center justify-between border-b border-[#E6DED2] p-6">
          <div>
            <h2 className="font-cormorant text-4xl text-[#183425]">
              My Quick Orders
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Track all your submitted quick orders.
            </p>
          </div>

          <button
            onClick={() => navigate("/trade/quick-order")}
            className="rounded-lg bg-[#183425] px-5 py-3 text-sm text-white hover:bg-[#10261A]"
          >
            + Create Quick Order
          </button>
        </div>

        {/* Loading */}

        {loading && <div className="p-12 text-center">Loading...</div>}

        {/* Empty */}

        {!loading && orders?.length === 0 && (
          <div className="p-16 text-center">
            <h3 className="text-xl font-semibold text-[#183425]">
              No Quick Orders Found
            </h3>

            <p className="mt-2 text-gray-500">Submit your first quick order.</p>
          </div>
        )}

        {/* Table */}

        {!loading && orders?.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-[850px] w-full">
              <thead className="bg-[#F7F3EB]">
                <tr>
                  <th className="px-6 py-4 text-left">Order</th>

                  <th className="px-6 py-4 text-left">Date</th>

                  <th className="px-6 py-4 text-left">Status</th>

                  <th className="px-6 py-4 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((item) => (
                  <tr key={item._id} className="border-b hover:bg-[#faf8f3]">
                    <td className="px-6 py-5">{item.orderNumber}</td>

                    <td className="px-6 py-5">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs ${statusColor[item.status]}`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <button
                        onClick={async () => {
                          const res = await dispatch(
                            fetchMyQuickOrder(item._id),
                          );

                          if (fetchMyQuickOrder.fulfilled.match(res)) {
                            setSelectedOrder(res.payload.data);

                            setShowDetails(true);
                          }
                        }}
                      >
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {showDetails && (
        <TradeQuickOrderDetails
          order={selectedOrder}
          onClose={() => {
            setShowDetails(false);

            setSelectedOrder(null);
          }}
        />
      )}
    </>
  );
}
