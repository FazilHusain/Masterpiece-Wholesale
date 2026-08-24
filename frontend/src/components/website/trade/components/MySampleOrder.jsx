import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import TradeSampleOrderDetails from "./TradesampleOrderDetails";

import { fetchMyWebsiteSampleOrders, fetchWebsiteSampleOrder } from "../../../../redux/websiteSampleOrder";

const statusColor = {
  Pending: "bg-yellow-100 text-yellow-700",
  Approved: "bg-blue-100 text-blue-700",
  Rejected: "bg-red-100 text-red-700",
  Packed: "bg-purple-100 text-purple-700",
  Shipped: "bg-indigo-100 text-indigo-700",
  Delivered: "bg-green-100 text-green-700",
};

export default function MySampleOrders() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [selectedOrder, setSelectedOrder] = useState(null);

  const [showDetails, setShowDetails] = useState(false);

  const { orders, loading } = useSelector((state) => state.websiteSampleOrder);

  useEffect(() => {
    dispatch(fetchMyWebsiteSampleOrders());
  }, [dispatch]);

  return (
    <>
      <div className="rounded-2xl border border-[#E6DED2] bg-white shadow-sm">
        {/* Header */}

        <div className="flex items-center justify-between border-b border-[#E6DED2] p-6">
          <div>
            <h2 className="font-cormorant text-4xl text-[#183425]">
              My Sample Orders
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Track all your submitted sample requests.
            </p>
          </div>

          <button
            onClick={() => navigate("/products?type=sample")}
            className="rounded-lg bg-[#183425] px-5 py-3 text-sm text-white transition hover:bg-[#10261A]"
          >
            + Request Sample
          </button>
        </div>

        {/* Loading */}

        {loading && <div className="p-12 text-center">Loading...</div>}

        {/* Empty */}

        {!loading && orders?.length === 0 && (
          <div className="p-16 text-center">
            <h3 className="text-xl font-semibold text-[#183425]">
              No Sample Orders Found
            </h3>

            <p className="mt-2 text-gray-500">
              Submit your first sample request.
            </p>
          </div>
        )}

        {/* Table */}

        {!loading && orders?.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-[950px] w-full">
              <thead className="bg-[#F7F3EB]">
                <tr>
                  <th className="px-6 py-4 text-left">Order</th>

                  <th className="px-6 py-4 text-left">Product</th>

                  <th className="px-6 py-4 text-left">Date</th>

                  <th className="px-6 py-4 text-left">Status</th>

                  <th className="px-6 py-4 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((item) => (
                  <tr key={item._id} className="border-b hover:bg-[#FAF8F3]">
                    <td className="px-6 py-5 font-medium">
                      {item.orderNumber}
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product?.featuredImage}
                          alt={item.product?.name}
                          className="h-12 w-12 rounded-lg object-cover"
                        />

                        <div>
                          <p className="font-medium">{item.product?.name}</p>

                          <p className="text-xs text-gray-500">
                            Qty :{item.quantity}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs ${
                          statusColor[item.status]
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <button
                        onClick={async () => {
                          const res = await dispatch(
                            fetchWebsiteSampleOrder(item._id),
                          );

                          if (fetchWebsiteSampleOrder.fulfilled.match(res)) {
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
        <TradeSampleOrderDetails
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
