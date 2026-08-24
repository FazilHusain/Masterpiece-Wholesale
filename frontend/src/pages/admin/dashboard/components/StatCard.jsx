import { ArrowUpRight } from "lucide-react";

export default function StatCard({
  title,
  value,
  icon: Icon,
  subtitle = "",
}) {
  return (
    <div className="group rounded-3xl border border-[#E8E2D9] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-[#12312B]">
            {value}
          </h2>

          {subtitle && (
            <p className="mt-2 text-sm text-gray-400">
              {subtitle}
            </p>
          )}

        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF5DE]">

          <Icon
            size={28}
            className="text-[#B68C2F]"
          />

        </div>

      </div>

      <div className="mt-6 flex items-center gap-2 text-sm font-medium text-[#B68C2F]">

        View Details

        <ArrowUpRight size={16} />

      </div>

    </div>
  );
}