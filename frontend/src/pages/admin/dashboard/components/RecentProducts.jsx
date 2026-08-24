import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Card, Button, Badge } from "../../../../components/ui";

export default function RecentProducts() {
  const { recentProducts } = useSelector((state) => state.dashboard);

  return (
    <Card>
      <div className="mb-6 flex items-center justify-between">

        <div>
          <h2 className="text-xl font-semibold text-[#12312B]">
            Recent Products
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Recently added products.
          </p>
        </div>

        <Link to="/admin/products">
          <Button variant="outline" size="sm">
            View All
          </Button>
        </Link>

      </div>

      <div className="space-y-5">

        {recentProducts.length === 0 && (
          <p className="text-sm text-gray-400">No products yet.</p>
        )}

        {recentProducts.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between rounded-2xl border border-[#E9E2D7] p-4 transition hover:bg-[#FCFBF8]"
          >

            <div className="flex items-center gap-4">

              <img
                src={
                  item.thumbnail ||
                  "https://placehold.co/100x100/F8F5EF/12312B?text=Product"
                }
                alt={item.name}
                className="h-16 w-16 rounded-xl object-cover"
              />

              <div>

                <h3 className="font-semibold text-[#12312B]">
                  {item.name}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {item.category?.name || "—"}
                </p>

              </div>

            </div>

            <Badge
              variant={item.isActive ? "success" : "secondary"}
            >
              {item.isActive ? "Active" : "Inactive"}
            </Badge>

          </div>
        ))}

      </div>
    </Card>
  );
}