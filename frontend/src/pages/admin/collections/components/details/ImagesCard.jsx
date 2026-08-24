import DetailCard from "../../../../../components/common/DetailCard";

export default function ImagesCard({
  collection,
}) {
  const images = [
    {
      title: "Banner Image",
      image: collection?.bannerImage,
    },
    {
      title: "Thumbnail Image",
      image: collection?.thumbnailImage,
    },
    {
      title: "Featured Image",
      image: collection?.featuredImage,
    },
  ];

  return (
    <DetailCard
      title="Images"
      subtitle="Collection media."
    >
      <div className="grid gap-6 md:grid-cols-3">
        {images.map((item) => (
          <div key={item.title}>
            <p className="mb-3 text-sm font-medium text-[#12312B]">
              {item.title}
            </p>

            <div className="aspect-square overflow-hidden rounded-xl border border-[#E8E2D9] bg-[#F8F6F2]">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-gray-400">
                  No Image
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </DetailCard>
  );
}