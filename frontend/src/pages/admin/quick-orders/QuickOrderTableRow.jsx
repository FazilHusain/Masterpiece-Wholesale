import { Eye, MessageSquare, RefreshCcw, Trash2 } from "lucide-react";

import { Link } from "react-router-dom";

const statusColor = {
  pending: "bg-yellow-100 text-yellow-700",

  confirmed: "bg-blue-100 text-blue-700",

  processing: "bg-indigo-100 text-indigo-700",

  completed: "bg-green-100 text-green-700",

  cancelled: "bg-red-100 text-red-700",
};

const QuickOrderTableRow = ({
  order,
  index,
  onStatus,
  onAdminNote,
  onDelete,
}) => {
  return (
    <tr className="border-b">
      <td className="px-6 py-4 font-semibold">{index}</td>
      <td>
        <div className="font-semibold px-6 py-4 ">{order.orderNumber}</div>
      </td>

      <td className="px-6 py-4">
        <div>
          {order.tradeUser?.firstName} {order.tradeUser?.lastName}
        </div>

        <small>{order.tradeUser?.email}</small>
      </td>

      <td className="px-6 py-4 font-semibold">
        {order.tradeUser?.businessName}
      </td>

      <td className="px-6 py-4 font-semibold">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor[order.status]}`}
        >
          {order.status}
        </span>
      </td>

      <td className="px-6 py-4 font-semibold">
        {new Date(order.createdAt).toLocaleDateString()}
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <Link
            to={`/admin/quick-orders/${order._id}`}
            className="text-blue-600 hover:text-blue-800"
            title="View Details"
          >
            <Eye size={18} />
          </Link>

          <button
            title="Update Status"
            onClick={() => onStatus(order)}
            className="text-indigo-600 hover:text-indigo-800"
          >
            <RefreshCcw size={18} />
          </button>

          <button
            title="Admin Note"
            onClick={() => onAdminNote(order)}
            className="text-green-600 hover:text-green-800"
          >
            <MessageSquare size={18} />
          </button>

          <button
            title="Delete"
            onClick={() => onDelete(order)}
            className="text-red-600 hover:text-red-800"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default QuickOrderTableRow;
