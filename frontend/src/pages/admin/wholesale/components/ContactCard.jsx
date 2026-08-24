import React from "react";
import { MapPin } from "lucide-react";

export default function ContactCard({ application }) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <div className="mb-5 flex items-center gap-2">

        <MapPin size={20} />

        <h2 className="text-lg font-semibold">
          Location
        </h2>

      </div>

      <div className="grid gap-5 md:grid-cols-3">

        <div>

          <label className="text-xs uppercase text-gray-500">
            City
          </label>

          <p>{application.city || "-"}</p>

        </div>

        <div>

          <label className="text-xs uppercase text-gray-500">
            State
          </label>

          <p>{application.state || "-"}</p>

        </div>

        <div>

          <label className="text-xs uppercase text-gray-500">
            Country
          </label>

          <p>{application.country}</p>

        </div>

      </div>

    </div>
  );
}