import DetailCard from "../../../../../components/common/DetailCard";

export default function ContentCard({
  journal,
}) {
  return (
    <DetailCard
      title="Content"
      subtitle="Complete journal content."
    >

      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{
          __html: journal?.content || "-",
        }}
      />

    </DetailCard>
  );
}