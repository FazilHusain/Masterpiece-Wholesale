import DetailCard from "../../../../../components/common/DetailCard";
import { Badge, StatusBadge } from "../../../../../components/ui";

export default function HeroCard({ journal }) {
  return (
    <DetailCard>
      <div className="grid gap-8 lg:grid-cols-[320px_1fr]">

        <div>
          <div className="aspect-square overflow-hidden rounded-2xl border border-[#E8E2D9] bg-[#F8F6F2]">

            {journal?.featuredImage ? (
              <img
                src={journal.featuredImage}
                alt={journal.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-gray-400">
                No Image
              </div>
            )}

          </div>
        </div>

        <div>

          <div className="flex flex-wrap items-center gap-2">

            {journal?.isFeatured && (
              <Badge variant="warning">
                Featured
              </Badge>
            )}

            <StatusBadge
              status={journal?.isActive}
              activeText="Active"
              inactiveText="Inactive"
            />

          </div>

          <h1 className="mt-5 text-4xl font-bold text-[#12312B]">
            {journal?.title}
          </h1>

          <p className="mt-2 text-gray-500">
            Author :
            <span className="ml-1 font-medium">
              {journal?.author}
            </span>
          </p>

          <p className="mt-6 leading-7 text-gray-600">
            {journal?.shortDescription || "-"}
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-3">

            <div className="rounded-xl border border-[#E8E2D9] p-4">
              <p className="text-xs uppercase text-gray-400">
                Category
              </p>

              <h3 className="mt-2 font-semibold text-[#12312B]">
                {journal?.category}
              </h3>
            </div>

            <div className="rounded-xl border border-[#E8E2D9] p-4">
              <p className="text-xs uppercase text-gray-400">
                Published
              </p>

              <h3 className="mt-2 font-semibold text-[#12312B]">
                {journal?.publishedAt
                  ? new Date(
                      journal.publishedAt
                    ).toLocaleDateString()
                  : "-"}
              </h3>
            </div>

            <div className="rounded-xl border border-[#E8E2D9] p-4">
              <p className="text-xs uppercase text-gray-400">
                Display Order
              </p>

              <h3 className="mt-2 font-semibold text-[#12312B]">
                {journal?.displayOrder}
              </h3>
            </div>

          </div>

        </div>

      </div>
    </DetailCard>
  );
}