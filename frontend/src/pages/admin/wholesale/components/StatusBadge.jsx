
const statusClasses = {
  Pending:
    "bg-amber-100 text-amber-700 border border-amber-200",

  Reviewing:
    "bg-sky-100 text-sky-700 border border-sky-200",

  Approved:
    "bg-emerald-100 text-emerald-700 border border-emerald-200",

  Rejected:
    "bg-red-100 text-red-700 border border-red-200",
};

export default function StatusBadge({
  status,
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
        statusClasses[status] ||
        "bg-gray-100 text-gray-600 border"
      }`}
    >
      <span
        className="mr-2 h-2 w-2 rounded-full bg-current"
      />

      {status}
    </span>
  );
}