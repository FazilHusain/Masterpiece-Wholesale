import {
  Building2,
  Globe,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";

import DetailCard from "../../../../../components/common/DetailCard";

export default function CustomerCard({ order }) {
  const address =
    order?.tradeUser?.addresses?.find((item) => item.isDefault) ||
    order?.tradeUser?.addresses?.[0];

  return (
    <DetailCard
      title="Customer Information"
      subtitle="Customer & business information."
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

        {/* Customer */}

        <InfoBox
          icon={<User size={18} />}
          label="Customer Name"
          value={order?.customerName}
        />

        {/* Company */}

        <InfoBox
          icon={<Building2 size={18} />}
          label="Business Name"
          value={order?.companyName || "Individual Customer"}
        />

        {/* Email */}

        <InfoBox
          icon={<Mail size={18} />}
          label="Email"
          value={order?.email}
        />

        {/* Phone */}

        <InfoBox
          icon={<Phone size={18} />}
          label="Phone"
          value={order?.phone}
        />

        {/* Customer Type */}

        <InfoBox
          icon={<User size={18} />}
          label="Customer Type"
          value={
            order?.tradeUser
              ? "Trade Customer"
              : "Public Customer"
          }
        />

        {/* Country */}

        <InfoBox
          icon={<Globe size={18} />}
          label="Country"
          value={order?.country || "-"}
        />

      </div>

      {/* Address */}

      <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-5">

        <div className="flex items-center gap-2">

          <MapPin
            size={18}
            className="text-[#173724]"
          />

          <h3 className="font-semibold text-[#173724]">
            Delivery Address
          </h3>

        </div>

        <div className="mt-3 text-sm leading-7 text-gray-700">

          {address ? (
            <>
              <p>{address.addressLine1}</p>

              {address.addressLine2 && (
                <p>{address.addressLine2}</p>
              )}

              <p>
                {[address.city, address.state]
                  .filter(Boolean)
                  .join(", ")}
              </p>

              <p>
                {[address.country, address.postalCode]
                  .filter(Boolean)
                  .join(" - ")}
              </p>
            </>
          ) : (
            <p className="italic text-gray-400">
              Address not available
            </p>
          )}

        </div>

      </div>
    </DetailCard>
  );
}

function InfoBox({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 transition hover:border-[#173724]/30 hover:shadow-sm">

      <div className="mt-1 text-[#173724]">
        {icon}
      </div>

      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
          {label}
        </p>

        <p className="mt-1 break-words text-sm font-semibold text-gray-800">
          {value || "-"}
        </p>
      </div>

    </div>
  );
}