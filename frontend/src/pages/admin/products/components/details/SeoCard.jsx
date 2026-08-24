import DetailCard from "../../../../../components/common/DetailCard";
import DetailItem from "../../../../../components/common/DetailItem";

export default function SeoCard({
  product,
}) {
  return (
    <DetailCard
      title="SEO Information"
      subtitle="Search engine optimization."
    >
      <div className="grid gap-6 md:grid-cols-2">

        <DetailItem
          label="Meta Title"
          value={product?.metaTitle}
        />

        <DetailItem
          label="Slug"
          value={product?.slug}
        />

      </div>

      <div className="mt-8">

        <DetailItem
          label="Meta Description"
          value={product?.metaDescription}
        />

      </div>

      <div className="mt-8">

        <DetailItem
          label="Search Keywords"
          value={
            Array.isArray(product?.searchKeywords)
              ? product.searchKeywords.join(", ")
              : "-"
          }
        />

      </div>
    </DetailCard>
  );
}