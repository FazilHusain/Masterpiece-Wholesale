import TableRow from "./TableRow";

export default function ApplicationsTable({
  applications = [],
  selectedRows = [],
  toggleSelection,
  toggleSelectAll,
}) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="w-12 px-5 py-4">
                <input
                  type="checkbox"
                  checked={
                    applications.length > 0 &&
                    selectedRows.length === applications.length
                  }
                  onChange={toggleSelectAll}
                />
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase">
                Application
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase">
                Business
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase">
                Country
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase">
                Status
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase">
                Applied
              </th>

              <th className="px-5 py-4 text-center text-xs font-semibold uppercase">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {applications.map((item) => (
              <TableRow
                key={item._id}
                item={item}
                checked={selectedRows.includes(item._id)}
                onCheck={toggleSelection}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
