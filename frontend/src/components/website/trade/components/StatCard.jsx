export default function StatCard({
  title,
  value,
}) {
  return (
    <div className="rounded-2xl border border-[#E8DFD2] bg-white p-6 shadow-sm">

      <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
        {title}
      </p>

      <h3 className="mt-3 text-4xl font-bold text-[#173724]">
        {value}
      </h3>

    </div>
  );
}