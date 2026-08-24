import { Package2 } from "lucide-react";

export default function CategoriesCard({ application }) {
  const categories = Array.isArray(application?.categoriesInterested)
    ? application.categoriesInterested
    : application?.categoriesInterested
        ?.split(",")
        .map((item) => item.trim())
        .filter(Boolean) || [];

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-2">
        <Package2 size={20} />

        <h2 className="text-lg font-semibold">Categories Interested</h2>
      </div>

      {categories.length ? (
        <div className="flex flex-wrap gap-3">
          {categories.map((item) => (
            <span
              key={item}
              className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium"
            >
              {item}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No categories selected.</p>
      )}
    </div>
  );
}
