export default function DetailCard({
  title,
  subtitle,
  children,
  className = "",
}) {
  return (
    <div
      className={`
        rounded-2xl
        border
        border-[#E8E2D9]
        bg-white
        p-6
        shadow-sm
        ${className}
      `}
    >
      {(title || subtitle) && (
        <div className="mb-6 border-b border-[#F2F2F2] pb-4">
          {title && (
            <h2 className="text-xl font-semibold text-[#12312B]">
              {title}
            </h2>
          )}

          {subtitle && (
            <p className="mt-1 text-sm text-gray-500">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {children}
    </div>
  );
}