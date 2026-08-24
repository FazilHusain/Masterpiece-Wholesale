const AdminNoteCard = ({ order }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">

      <h2 className="text-lg font-semibold mb-5">
        Admin Note
      </h2>

      {order?.adminNote ? (
        <div className="rounded-lg border bg-blue-50 border-blue-200 p-4">

          <p className="whitespace-pre-wrap">
            {order.adminNote}
          </p>

        </div>
      ) : (
        <div className="rounded-lg border border-dashed p-6 text-center text-gray-500">
          No admin note available.
        </div>
      )}

    </div>
  );
};

export default AdminNoteCard;