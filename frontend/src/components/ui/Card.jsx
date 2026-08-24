export default function Card({
  children,
  className = "",
}) {
  return (
    <div
      className={`
        w-full
        max-w-full
        overflow-hidden
        rounded-2xl
        border
        border-[#E8E2D9]
        bg-white
        p-6
        shadow-sm
        ${className}
      `}
    >
      {children}
    </div>
  );
}