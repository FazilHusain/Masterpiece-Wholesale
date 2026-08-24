import React from "react";
import { Building2, Globe } from "lucide-react";

export default function BusinessCard({ application }) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <div className="mb-5 flex items-center gap-2">

        <Building2 size={20} />

        <h2 className="text-lg font-semibold">
          Business Information
        </h2>

      </div>

      <div className="grid gap-5 md:grid-cols-2">

        <div>

          <label className="text-xs uppercase text-gray-500">
            Business Name
          </label>

          <p className="mt-1 font-medium">
            {application.businessName}
          </p>

        </div>

        <div>

          <label className="text-xs uppercase text-gray-500">
            Business Type
          </label>

          <p className="mt-1">
            {application.businessType}
          </p>

        </div>

        <div>

          <label className="text-xs uppercase text-gray-500">
            Years in Business
          </label>

          <p className="mt-1">
            {application.yearsInBusiness}
          </p>

        </div>

        <div>

          <label className="text-xs uppercase text-gray-500">
            Annual Purchase
          </label>

          <p className="mt-1">
            {application.annualPurchase}
          </p>

        </div>

        <div>

          <label className="text-xs uppercase text-gray-500">
            Website
          </label>

          <a
            href={application.website}
            target="_blank"
            rel="noreferrer"
            className="mt-1 flex items-center gap-2 text-blue-600"
          >
            <Globe size={16} />

            {application.website || "-"}
          </a>

        </div>

      </div>

    </div>
  );
}