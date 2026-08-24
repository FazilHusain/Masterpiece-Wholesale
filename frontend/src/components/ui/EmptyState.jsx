import { PackageOpen } from "lucide-react";

export default function EmptyState({
  title = "No Data Found",
  description = "There is nothing to display.",
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#E8E2D9] bg-white py-16">

      <PackageOpen
        size={60}
        className="text-[#B68C2F]"
      />

      <h3 className="mt-5 text-xl font-semibold text-[#12312B]">
        {title}
      </h3>

      <p className="mt-2 text-gray-500">
        {description}
      </p>

    </div>
  );
}