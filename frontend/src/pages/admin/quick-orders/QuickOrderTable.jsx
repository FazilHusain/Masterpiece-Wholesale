import QuickOrderTableRow from "./QuickOrderTableRow";

const QuickOrderTable = ({
  orders,
  loading,
  pagination,
  onPageChange,

  onStatus,
  onAdminNote,
  onDelete,
}) => {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-12 text-center">
        Loading Quick Orders...
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="bg-white rounded-xl shadow p-12 text-center text-gray-500">
        No Quick Orders Found
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr className="text-left">
              <th className="px-6 py-4">#</th>
              <th className="px-6 py-4">Order</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Business</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Created</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order, index) => (
              <QuickOrderTableRow
                key={order._id}
                order={order}
                index={
                  ((pagination.page || 1) - 1) * (pagination.limit || 10) +
                  index +
                  1
                }
                onStatus={onStatus}
                onAdminNote={onAdminNote}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>

      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between border-t px-6 py-4">
          <button
            disabled={pagination.page === 1}
            onClick={() => onPageChange?.(pagination.page - 1)}
            className="border rounded-lg px-4 py-2 disabled:opacity-40"
          >
            Previous
          </button>

          <span className="font-medium">
            Page {pagination.page} of {pagination.totalPages}
          </span>

          <button
            disabled={pagination.page === pagination.totalPages}
            onClick={() => onPageChange?.(pagination.page + 1)}
            className="border rounded-lg px-4 py-2 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default QuickOrderTable;
