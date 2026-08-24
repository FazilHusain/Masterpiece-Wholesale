import DetailCard from "../../../../../components/common/DetailCard";
import DetailItem from "../../../../../components/common/DetailItem";
import { Badge, StatusBadge } from "../../../../../components/ui";

export default function BasicInformationCard({
  collection,
}) {
  return (
    <DetailCard
      title="Basic Information"
      subtitle="Collection details."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        <DetailItem
          label="Collection Name"
          value={collection?.name}
        />

        <DetailItem
          label="Slug"
          value={collection?.slug}
        />

        <DetailItem
          label="Display Order"
          value={collection?.displayOrder}
        />

        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">
            Featured
          </p>

          {collection?.isFeatured ? (
            <Badge variant="warning">
              Featured
            </Badge>
          ) : (
            "-"
          )}
        </div>

        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">
            Homepage
          </p>

          {collection?.showOnHomepage ? (
            <Badge variant="success">
              Visible
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
            status={collection?.isActive}
            activeText="Active"
            inactiveText="Inactive"
          />
        </div>

      </div>

      <div className="mt-8">
        <DetailItem
          label="Description"
          value={collection?.description}
        />
      </div>
    </DetailCard>
  );
}