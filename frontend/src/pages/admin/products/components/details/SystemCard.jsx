import DetailCard from "../../../../../components/common/DetailCard";
import DetailItem from "../../../../../components/common/DetailItem";

export default function SystemCard({
  product,
}) {
  return (
    <DetailCard
      title="System Information"
      subtitle="Record information."
    >
      <div className="grid gap-6 md:grid-cols-3">

        <DetailItem
          label="Product ID"
          value={product?._id}
        />

        <DetailItem
          label="Created At"
          value={
            product?.createdAt
              ? new Date(product.createdAt).toLocaleString()
              : "-"
          }
        />

        <DetailItem
          label="Updated At"
          value={
            product?.updatedAt
              ? new Date(product.updatedAt).toLocaleString()
              : "-"
          }
        />

      </div>

      <div className="mt-8">

        <DetailItem
          label="Admin Note"
          value={product?.adminNote}
        />

      </div>

      <div className="mt-8">

        <DetailItem
          label="Tags"
          value={
            Array.isArray(product?.tags)
              ? product.tags.join(", ")
              : "-"
          }
        />

      </div>
    </DetailCard>
  );
}