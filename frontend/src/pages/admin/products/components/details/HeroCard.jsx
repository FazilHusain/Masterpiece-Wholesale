import DetailCard from "../../../../../components/common/DetailCard";
import Badge from "../../../../../components/ui/Badge";
import StatusBadge from "../../../../../components/ui/StatusBadge";

export default function HeroCard({ product }) {
  return (
    <DetailCard>
      <div className="grid gap-8 lg:grid-cols-[320px_1fr]">

        {/* Featured Image */}

        <div>
          <div className="aspect-square overflow-hidden rounded-2xl border border-[#E8E2D9] bg-[#F8F6F2]">
            {product?.featuredImage ? (
              <img
                src={product.featuredImage}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-gray-400">
                No Image
              </div>
            )}
          </div>

          {/* Gallery */}

          {product?.gallery?.length > 0 && (
            <div className="mt-4 grid grid-cols-4 gap-3">
              {product.gallery.slice(0, 4).map((image, index) => (
                <div
                  key={index}
                  className="aspect-square overflow-hidden rounded-xl border border-[#E8E2D9]"
                >
                  <img
                    src={image.url}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}

        <div>

          <div className="flex flex-wrap items-center gap-2">

            {product?.isFeatured && (
              <Badge variant="warning">
                Featured
              </Badge>
            )}

            {product?.isBestSeller && (
              <Badge variant="success">
                Best Seller
              </Badge>
            )}

            {product?.isNew && (
              <Badge variant="secondary">
                New Arrival
              </Badge>
            )}

            <StatusBadge
              status={product?.isActive}
              activeText="Active"
              inactiveText="Inactive"
            />

          </div>

          <h1 className="mt-5 text-4xl font-bold text-[#12312B]">
            {product?.name}
          </h1>

          <p className="mt-2 text-gray-500">
            SKU : <span className="font-medium">{product?.sku}</span>
          </p>

          <p className="mt-6 text-gray-600 leading-7">
            {product?.shortDescription || "-"}
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-2">

            <div className="rounded-xl border border-[#E8E2D9] p-4">
              <p className="text-xs uppercase text-gray-400">
                Collection
              </p>

              <h3 className="mt-2 font-semibold text-[#12312B]">
                {product?.collection?.name || "-"}
              </h3>
            </div>

            <div className="rounded-xl border border-[#E8E2D9] p-4">
              <p className="text-xs uppercase text-gray-400">
                Category
              </p>

              <h3 className="mt-2 font-semibold text-[#12312B]">
                {product?.category?.name || "-"}
              </h3>
            </div>

            <div className="rounded-xl border border-[#E8E2D9] p-4">
              <p className="text-xs uppercase text-gray-400">
                Visibility
              </p>

              <h3 className="mt-2 font-semibold text-[#12312B] capitalize">
                {product?.visibility}
              </h3>
            </div>

            <div className="rounded-xl border border-[#E8E2D9] p-4">
              <p className="text-xs uppercase text-gray-400">
                Display Order
              </p>

              <h3 className="mt-2 font-semibold text-[#12312B]">
                {product?.displayOrder}
              </h3>
            </div>

          </div>

        </div>

      </div>
    </DetailCard>
  );
}