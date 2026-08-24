const CustomerNotesCard = ({ order }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">

      <h2 className="text-xl font-semibold mb-5">
        Customer Notes
      </h2>

      {order?.notes ? (
        <div className="rounded-lg border bg-gray-50 p-5">
          <p className="leading-7 whitespace-pre-wrap text-gray-700">
            {order.notes}
          </p>
        </div>
      ) : (
        <div className="rounded-lg border border-dashed p-8 text-center text-gray-500">
          No customer notes available.
        </div>
      )}

    </div>
  );
};

export default CustomerNotesCard;