import clsx from "clsx";

export default function InfoBox({
  icon,
  label,
  value,
  className = "",
}) {
  return (
    <div
      className={clsx(
        "flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 transition-all duration-300",
        "hover:border-[#173724]/30 hover:shadow-sm",
        className
      )}
    >
      {icon && (
        <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-lg bg-[#F8F6F2] text-[#173724]">
          {icon}
        </div>
      )}

      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-[1.5px] text-gray-500">
          {label}
        </p>

        <p className="mt-1 break-words text-sm font-semibold leading-6 text-gray-800">
          {value || "-"}
        </p>
      </div>
    </div>
  );
}