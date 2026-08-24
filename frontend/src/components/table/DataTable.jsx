export default function DataTable({
  columns = [],
  data = [],
  loading = false,
  emptyMessage = "No records found",
}) {
  if (loading) {
    return (
      <div className="rounded-xl border border-[#E8E2D9] bg-white py-12 text-center">
        Loading...
      </div>
    );
  }

  if (!loading && data.length === 0) {
    return (
      <div className="rounded-xl border border-[#E8E2D9] bg-white py-16 text-center">
        <h3 className="text-lg font-semibold text-[#12312B]">
          {emptyMessage}
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          Start by creating your first record.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-xl border border-[#E8E2D9] bg-white">
      <div className="w-full overflow-x-auto">
        <table className="w-max min-w-full border-collapse">
          <thead className="sticky top-0 z-10 bg-[#F8F6F2]">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`whitespace-nowrap border-b border-[#ECE7DF] px-4 py-3 text-left text-[13px] font-semibold text-[#12312B] ${column.className || ""}`}
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((row, index) => (
              <tr
                key={row._id || index}
                className="border-b border-[#F4F1EC] transition hover:bg-[#FAF8F5]"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`whitespace-nowrap px-4 py-3 text-[13px] text-[#374151] ${column.className || ""}`}
                  >
                    {column.render
                      ? column.render(row)
                      : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}