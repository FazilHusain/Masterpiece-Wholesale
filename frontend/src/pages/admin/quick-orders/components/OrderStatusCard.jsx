const OrderStatusCard = ({
  order,
  setStatusModal,
  setNoteModal,
  setDeleteModal,
}) => {
  const statusClasses = {
    Pending: "bg-yellow-100 text-yellow-700",
    Confirmed: "bg-blue-100 text-blue-700",
    Processing: "bg-indigo-100 text-indigo-700",
    Completed: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">

      <h2 className="text-lg font-semibold mb-5">
        Order Status
      </h2>

      <span
        className={`inline-flex px-4 py-2 rounded-full text-sm font-semibold ${statusClasses[order.status]}`}
      >
        {order.status}
      </span>

      <div className="mt-6 space-y-3">

        <button
          onClick={() => setStatusModal(true)}
          className="w-full rounded-lg bg-[#183425] text-white py-3 hover:bg-[#10271b]"
        >
          Update Status
        </button>

        <button
          onClick={() => setNoteModal(true)}
          className="w-full rounded-lg border py-3 hover:bg-gray-50"
        >
          Add Admin Note
        </button>

        <button
          onClick={() => setDeleteModal(true)}
          className="w-full rounded-lg border border-red-500 text-red-600 py-3 hover:bg-red-50"
        >
          Delete Order
        </button>

      </div>

    </div>
  );
};

export default OrderStatusCard;