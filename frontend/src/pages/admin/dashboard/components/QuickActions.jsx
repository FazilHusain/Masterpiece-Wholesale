import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Card, Button } from "../../../../components/ui";

export default function RecentJournal() {
  const { recentJournal } = useSelector((state) => state.dashboard);

  return (
    <Card>
      <div className="mb-6 flex items-center justify-between">

        <div>
          <h2 className="text-xl font-semibold text-[#12312B]">
            Recent Journal
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Latest published articles.
          </p>
        </div>

        <Link to="/admin/journal">
          <Button size="sm" variant="outline">
            View All
          </Button>
        </Link>

      </div>

      <div className="space-y-5">

        {recentJournal.length === 0 && (
          <p className="text-sm text-gray-400">No journal entries yet.</p>
        )}

        {recentJournal.map((item) => (
          <div
            key={item._id}
            className="flex gap-4 rounded-2xl border border-[#E9E2D7] p-4 transition hover:bg-[#FCFBF8]"
          >
            <img
              src={
                item.featuredImage ||
                "https://placehold.co/120x120/F8F5EF/12312B?text=Journal"
              }
              alt={item.title}
              className="h-20 w-20 rounded-xl object-cover"
            />

            <div className="flex-1">

              <h3 className="line-clamp-2 font-semibold text-[#12312B]">
                {item.title}
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                {item.category}
              </p>

              <p className="mt-1 text-xs text-gray-400">
                {new Date(item.createdAt).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>

            </div>

          </div>
        ))}

      </div>
    </Card>
  );
}