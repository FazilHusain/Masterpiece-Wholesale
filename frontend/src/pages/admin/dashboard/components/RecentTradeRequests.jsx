import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Card, Button, Badge } from "../../../../components/ui";

export default function RecentTradeRequests() {
  const { recentTradeRequests } = useSelector((state) => state.dashboard);

  return (
    <Card>

      <div className="mb-6 flex items-center justify-between">

        <div>
          <h2 className="text-xl font-semibold text-[#12312B]">
            Recent Trade Requests
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Latest wholesale enquiries.
          </p>
        </div>

        <Link to="/admin/wholesale">
          <Button size="sm" variant="outline">
            View All
          </Button>
        </Link>

      </div>

      <div className="space-y-4">

        {recentTradeRequests.length === 0 && (
          <p className="text-sm text-gray-400">No trade requests yet.</p>
        )}

        {recentTradeRequests.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between rounded-2xl border border-[#EFE7DB] p-4 transition hover:bg-[#FCFBF8]"
          >

            <div>

              <h3 className="font-semibold text-[#12312B]">
                {item.businessName}
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                {item.country}
              </p>

            </div>

            <Badge
              variant={
                item.status === "Approved"
                  ? "success"
                  : item.status === "Rejected"
                    ? "danger"
                    : "warning"
              }
            >
              {item.status}
            </Badge>

          </div>
        ))}

      </div>

    </Card>
  );
}