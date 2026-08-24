import React from "react";
import { FileText } from "lucide-react";

export default function RequirementCard({
  application,
}) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <div className="mb-5 flex items-center gap-2">

        <FileText size={20} />

        <h2 className="text-lg font-semibold">
          Customer Requirement
        </h2>

      </div>

      <div className="rounded-lg bg-gray-50 p-4 leading-7 text-gray-700">

        {application.message ||
          "No requirement provided."}

      </div>

    </div>
  );
}