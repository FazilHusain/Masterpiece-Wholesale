import DetailCard from "../../../../../components/common/DetailCard";
import DetailItem from "../../../../../components/common/DetailItem";

export default function BasicInformationCard({
  product,
}) {
  return (
    <DetailCard
      title="Basic Information"
      subtitle="Primary product details."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        <DetailItem
          label="Product Name"
          value={product?.name}
        />

        <DetailItem
          label="Slug"
          value={product?.slug}
        />

        <DetailItem
          label="SKU"
          value={product?.sku}
        />

        <DetailItem
          label="Collection"
          value={product?.collection?.name}
        />

        <DetailItem
          label="Category"
          value={product?.category?.name}
        />

        <DetailItem
          label="Visibility"
          value={
            product?.visibility
              ? product.visibility.charAt(0).toUpperCase() +
                product.visibility.slice(1)
              : "-"
          }
        />

      </div>

      <div className="mt-8">

        <DetailItem
          label="Short Description"
          value={product?.shortDescription}
        />

      </div>

      <div className="mt-8">

        <DetailItem
          label="Description"
          value={product?.description}
        />

      </div>
    </DetailCard>
  );
}