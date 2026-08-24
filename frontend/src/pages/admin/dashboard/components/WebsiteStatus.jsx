import { Card } from "../../../../components/ui";
export default function WebsiteStatus() {
  const items = [
    {
      title: "Website",
      value: "Online",
    },
    {
      title: "Maintenance",
      value: "OFF",
    },
    {
      title: "Storage",
      value: "Firebase (Soon)",
    },
    {
      title: "Timezone",
      value: "UTC",
    },
  ];

  return (
    <Card>

      <h2 className="mb-6 text-xl font-semibold text-[#12312B]">
        Website Status
      </h2>

      <div className="space-y-5">

        {items.map((item) => (
          <div
            key={item.title}
            className="flex items-center justify-between border-b border-[#EFE7DB] pb-3 last:border-none"
          >
            <span className="text-gray-500">
              {item.title}
            </span>

            <span className="font-semibold text-[#12312B]">
              {item.value}
            </span>
          </div>
        ))}

      </div>

    </Card>
  );
}