export default function Checkbox({
  checked,
  label,
  onChange,
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3">

      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-5 w-5 accent-[#12312B]"
      />

      <span className="text-sm text-[#222]">
        {label}
      </span>

    </label>
  );
}