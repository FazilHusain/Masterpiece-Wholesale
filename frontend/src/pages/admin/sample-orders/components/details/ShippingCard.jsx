import {
  Globe,
  Mailbox,
  MapPin,
  MapPinned,
  Navigation,
} from "lucide-react";

import DetailCard from "../../../../../components/common/DetailCard";
import InfoBox from "../../../../../components/common/InfoBox";

export default function ShippingCard({ order }) {
  return (
    <DetailCard
      title="Shipping Information"
      subtitle="Delivery address and shipping destination."
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

        <InfoBox
          icon={<MapPin size={18} />}
          label="Shipping Address"
          value={order?.shippingAddress || "-"}
        />

        <InfoBox
          icon={<Navigation size={18} />}
          label="City"
          value={order?.city || "-"}
        />

        <InfoBox
          icon={<MapPinned size={18} />}
          label="State / Province"
          value={order?.state || "-"}
        />

        <InfoBox
          icon={<Mailbox size={18} />}
          label="Postal Code"
          value={order?.postalCode || "-"}
        />

        <InfoBox
          icon={<Globe size={18} />}
          label="Country"
          value={order?.country || "-"}
        />

        {/* Future Ready */}

        <InfoBox
          icon={<MapPin size={18} />}
          label="Delivery Status"
          value="Not Shipped Yet"
          className="bg-[#F8F6F2]"
        />

      </div>
    </DetailCard>
  );
}