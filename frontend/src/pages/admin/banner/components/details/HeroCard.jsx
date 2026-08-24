import DetailCard from "../../../../../components/common/DetailCard";
import { Badge, StatusBadge } from "../../../../../components/ui";

export default function HeroCard({ banner }) {
  return (
    <DetailCard>
      <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
        {/* Images */}
        <div className="space-y-5">
          {/* Desktop */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
              Desktop Banner
            </h3>

            <div className="overflow-hidden rounded-2xl border border-[#E8E2D9] bg-[#F8F6F2]">
              {banner?.desktopImage ? (
                <img
                  src={banner.desktopImage}
                  alt={banner.title}
                  className="h-56 w-full object-cover"
                />
              ) : (
                <div className="flex h-56 items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>
          </div>

          {/* Mobile */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
              Mobile Banner
            </h3>

            <div className="mx-auto w-52 overflow-hidden rounded-2xl border border-[#E8E2D9] bg-[#F8F6F2]">
              {banner?.mobileImage ? (
                <img
                  src={banner.mobileImage}
                  alt={banner.title}
                  className="h-72 w-full object-cover"
                />
              ) : (
                <div className="flex h-72 items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Information */}
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge
              status={banner?.isActive}
              activeText="Active"
              inactiveText="Inactive"
            />

            <Badge variant="secondary">
              {banner?.page}
            </Badge>

            <Badge variant="warning">
              {banner?.type}
            </Badge>
          </div>

          <h1 className="mt-5 text-4xl font-bold text-[#12312B]">
            {banner?.title}
          </h1>

          {banner?.subtitle && (
            <h3 className="mt-2 text-xl font-medium text-[#B68C2F]">
              {banner.subtitle}
            </h3>
          )}

          <p className="mt-6 leading-8 text-gray-600">
            {banner?.description || "-"}
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-xl border border-[#E8E2D9] p-4">
              <p className="text-xs uppercase text-gray-400">
                Button Text
              </p>

              <h3 className="mt-2 font-semibold text-[#12312B]">
                {banner?.buttonText || "-"}
              </h3>
            </div>

            <div className="rounded-xl border border-[#E8E2D9] p-4">
              <p className="text-xs uppercase text-gray-400">
                Button Link
              </p>

              <h3 className="mt-2 break-all font-semibold text-[#12312B]">
                {banner?.buttonLink || "-"}
              </h3>
            </div>

            <div className="rounded-xl border border-[#E8E2D9] p-4">
              <p className="text-xs uppercase text-gray-400">
                Display Order
              </p>

              <h3 className="mt-2 font-semibold text-[#12312B]">
                {banner?.displayOrder}
              </h3>
            </div>

            <div className="rounded-xl border border-[#E8E2D9] p-4">
              <p className="text-xs uppercase text-gray-400">
                Active Period
              </p>

              <h3 className="mt-2 text-sm font-semibold text-[#12312B]">
                {banner?.startDate
                  ? new Date(
                      banner.startDate
                    ).toLocaleDateString()
                  : "-"}{" "}
                -{" "}
                {banner?.endDate
                  ? new Date(
                      banner.endDate
                    ).toLocaleDateString()
                  : "-"}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </DetailCard>
  );
}