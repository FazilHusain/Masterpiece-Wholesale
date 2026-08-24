import DetailCard from "../../../../../components/common/DetailCard";
import DetailItem from "../../../../../components/common/DetailItem";
import { Badge, StatusBadge } from "../../../../../components/ui";

export default function BasicInformationCard({
  category,
}) {
  return (
    <DetailCard
      title="Basic Information"
      subtitle="Category details."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        <DetailItem
          label="Category Name"
          value={category?.name}
        />

        <DetailItem
          label="Slug"
          value={category?.slug}
        />

        <DetailItem
          label="Collection"
          value={category?.collection?.name}
        />

        <DetailItem
          label="Sub Category"
          value={category?.parentCategory?.name}
        />

        <DetailItem
          label="Display Order"
          value={category?.displayOrder}
        />

        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">
            Featured
          </p>

          {category?.isFeatured ? (
            <Badge variant="warning">
              Featured
            </Badge>
          ) : (
            "-"
          )}
        </div>

        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">
            Status
          </p>

          <StatusBadge
            status={category?.isActive}
            activeText="Active"
            inactiveText="Inactive"
          />
        </div>

      </div>

      <div className="mt-8">
        <DetailItem
          label="Description"
          value={category?.description}
        />
      </div>
    </DetailCard>
  );
}