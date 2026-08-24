const QuickOrderItemsCard = ({ order }) => {
  const items =
    order?.orderItems
      ?.split("\n")
      .filter(Boolean)
      .map((row) => {
        const [sku, quantity, unit = "Pcs"] = row
          .split(",")
          .map((v) => v.trim());

        return {
          sku,
          quantity,
          unit,
        };
      }) || [];

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Quick Order Items</h2>

        <span className="px-3 py-1 rounded-full bg-gray-100 text-sm font-medium">
          {items.length} Items
        </span>
      </div>

      {items.length === 0 ? (
        <div className="py-12 text-center text-gray-500">No Items Found</div>
      ) : (
        <div className="space-y-5">
          {items.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-xl p-5">
              <div className="grid md:grid-cols-3 gap-5">
                {/* SKU */}

                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    SKU
                  </p>

                  <p className="mt-1 font-semibold">{item.sku || "-"}</p>
                </div>

                {/* Quantity */}

                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Quantity
                  </p>

                  <p className="mt-1 font-semibold">{item.quantity || "-"}</p>
                </div>

                {/* Unit */}

                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Unit
                  </p>

                  <p className="mt-1 font-semibold">{item.unit || "-"}</p>
                </div>
              </div>

              {item.notes && (
                <div className="mt-5 pt-5 border-t">
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Notes
                  </p>

                  <p className="mt-2 text-gray-700 whitespace-pre-wrap leading-7">
                    {item.notes}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuickOrderItemsCard;
