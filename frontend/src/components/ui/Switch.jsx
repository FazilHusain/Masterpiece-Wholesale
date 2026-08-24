export default function Switch({
  checked,
  onChange,
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`
        relative
        h-7
        w-14
        rounded-full
        transition-all
        duration-300
        ${checked ? "bg-[#12312B]" : "bg-gray-300"}
      `}
    >
      <span
        className={`
          absolute
          top-1
          h-5
          w-5
          rounded-full
          bg-white
          transition-all
          duration-300
          ${checked ? "left-8" : "left-1"}
        `}
      />
    </button>
  );
}