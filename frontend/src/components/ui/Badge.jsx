export default function Badge({
  children,
}) {
  return (
    <span className="rounded-full bg-[#FFF5DE] px-3 py-1 text-xs font-medium text-[#B68C2F]">
      {children}
    </span>
  );
}