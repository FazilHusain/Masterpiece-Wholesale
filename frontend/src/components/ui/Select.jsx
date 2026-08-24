import { ChevronDown } from "lucide-react";

export default function Select({
  label,
  name,
  options = [],
  value = "",
  onChange,
  placeholder = "Select",
  error,
  disabled = false,
  className = "",
}) {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-sm font-medium text-[#222]">
          {label}
        </label>
      )}

      <div className="relative">
        <select
          name={name}
          value={value}
          disabled={disabled}
          onChange={onChange}
          className={`
            h-10
            w-full
            appearance-none
            rounded-lg
            border
            border-[#E8E2D9]
            bg-white
            px-4
            pr-12
            text-sm
            outline-none
            transition-all
            duration-300
            focus:border-[#B68C2F]
            disabled:bg-gray-100
            disabled:cursor-not-allowed
            ${className}
          `}
        >
          <option value="">{placeholder}</option>

          {options.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        <ChevronDown
          size={18}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
        />
      </div>

      {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
    </div>
  );
}
