import { ClipboardList } from "lucide-react";

export default function PageHeader({
  total = 0,
}) {
  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

      <div>

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-black p-3 text-white">

            <ClipboardList size={22} />

          </div>

          <div>

            <h1 className="text-3xl font-bold">

              Wholesale Applications

            </h1>

            <p className="text-gray-500">

              Manage wholesale requests.

            </p>

          </div>

        </div>

      </div>

      <div className="rounded-xl border bg-white px-6 py-4 shadow-sm">

        <div className="text-xs uppercase tracking-wide text-gray-500">

          Total

        </div>

        <div className="mt-1 text-3xl font-bold">

          {total}

        </div>

      </div>

    </div>
  );
}