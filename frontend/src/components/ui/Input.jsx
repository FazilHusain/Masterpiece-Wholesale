export default function Input({ label, error, className = "", ...props }) {
  return (
    <div>
      {label && (
        <label className="mb-1.5
block
text-[13px]
font-medium
text-[#333]F">{label}</label>
      )}

      <input
        className={`
          h-10
rounded-lg
text-[14px]
          w-full
          border
          border-[#E8E2D9]
          bg-white
          px-4
          outline-none
          transition
          focus:border-[#B68C2F]
          ${className}
        `}
        {...props}
      />

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
