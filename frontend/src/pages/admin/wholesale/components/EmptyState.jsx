import React from "react";
import { Inbox } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="rounded-xl border bg-white py-20">

      <div className="flex flex-col items-center">

        <Inbox
          size={60}
          className="text-gray-300"
        />

        <h2 className="mt-5 text-xl font-semibold">
          No Applications Found
        </h2>

        <p className="mt-2 text-gray-500">
          There are no wholesale applications yet.
        </p>

      </div>

    </div>
  );
}