export default function Textarea({
  label,
  error,
  rows = 3,
  className = "",
  ...props
}) {
  return (
    <div>

      {label && (
        <label className="mb-2 block text-sm font-medium text-[#222]">
          {label}
        </label>
      )}

      <textarea
        rows={rows}
        className={`
          w-full
          rounded-xl
          border
          border-[#E8E2D9]
          bg-white
          px-3
          py-2.5
          text-[14px]
          rounded-lg
          outline-none
          resize-none
          transition-all
          duration-300
          focus:border-[#B68C2F]
          ${className}
        `}
        {...props}
      />

      {error && (
        <p className="mt-2 text-xs text-red-500">
          {error}
        </p>
      )}

    </div>
  );
}