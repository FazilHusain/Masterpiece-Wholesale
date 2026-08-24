import StatusBadge from "./StatusBadge";

export default function StatsCards({
  applications = [],
}) {
  const pending =
    applications.filter(
      (x) => x.status === "Pending",
    ).length;

  const reviewing =
    applications.filter(
      (x) => x.status === "Reviewing",
    ).length;

  const approved =
    applications.filter(
      (x) => x.status === "Approved",
    ).length;

  const rejected =
    applications.filter(
      (x) => x.status === "Rejected",
    ).length;

  const card = (
    title,
    value,
    status,
  ) => (
    <div className="rounded-xl border bg-white p-5 shadow-sm">

      <div className="text-sm text-gray-500">

        {title}

      </div>

      <div className="mt-3 flex items-center justify-between">

        <div className="text-3xl font-bold">

          {value}

        </div>

        <StatusBadge
          status={status}
        />

      </div>

    </div>
  );

  return (
    <div className="grid gap-5 md:grid-cols-4">

      {card(
        "Pending",
        pending,
        "Pending",
      )}

      {card(
        "Reviewing",
        reviewing,
        "Reviewing",
      )}

      {card(
        "Approved",
        approved,
        "Approved",
      )}

      {card(
        "Rejected",
        rejected,
        "Rejected",
      )}

    </div>
  );
}