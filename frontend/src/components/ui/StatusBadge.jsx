export default function StatusBadge({
  status,
}) {
  const styles = {
    active: "bg-green-100 text-green-700",
    inactive: "bg-red-100 text-red-700",
    pending: "bg-yellow-100 text-yellow-700",
  };

  return (
    <span
      className={`
        rounded-full
        px-3
        py-1
        text-xs
        font-medium
        ${styles[status] || styles.pending}
      `}
    >
      {status}
    </span>
  );
}