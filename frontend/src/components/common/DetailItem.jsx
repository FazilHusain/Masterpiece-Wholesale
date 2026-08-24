export default function DetailItem({
  label,
  value,
}) {
  return (
    <div className="space-y-1">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <p className="text-sm font-medium text-[#12312B] break-words">
        {value || "-"}
      </p>
    </div>
  );
}