import DetailCard from "../../../../../components/common/DetailCard";
import DetailItem from "../../../../../components/common/DetailItem";

export default function ProductInformationCard({
  product,
}) {
  return (
    <DetailCard
      title="Product Information"
      subtitle="Technical specifications of the product."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        <DetailItem
          label="Material"
          value={product?.material}
        />

        <DetailItem
          label="Pattern"
          value={product?.pattern}
        />

        <DetailItem
          label="Color Family"
          value={product?.colorFamily}
        />

        <DetailItem
          label="HS Code"
          value={product?.hsCode}
        />

        <DetailItem
          label="Country of Origin"
          value={product?.countryOfOrigin}
        />

        <DetailItem
          label="Lead Time"
          value={product?.leadTime}
        />

      </div>

      <div className="mt-8">

        <DetailItem
          label="Care Instructions"
          value={product?.careInstructions}
        />

      </div>
    </DetailCard>
  );
}