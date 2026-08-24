const OrderInfoCard = ({ order }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">

      <h2 className="text-lg font-semibold mb-5">
        Order Information
      </h2>

      <div className="space-y-5">

        <div>
          <p className="text-xs uppercase text-gray-500">
            Order Number
          </p>

          <p className="mt-1 font-medium">
            {order.orderNumber}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase text-gray-500">
            Total Items
          </p>

          <p className="mt-1 font-medium">
            {order.orderItems?.length || 0}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase text-gray-500">
            Created At
          </p>

          <p className="mt-1">
            {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase text-gray-500">
            Updated At
          </p>

          <p className="mt-1">
            {new Date(order.updatedAt).toLocaleString()}
          </p>
        </div>

      </div>

    </div>
  );
};

export default OrderInfoCard;