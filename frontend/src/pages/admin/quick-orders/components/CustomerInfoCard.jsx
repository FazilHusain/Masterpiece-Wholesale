import { Building2, Globe, Mail, Phone, User } from "lucide-react";

const CustomerInfoCard = ({ order }) => {
  const user = order?.tradeUser || {};

  const address =
    order?.tradeUser?.addresses?.find((item) => item.isDefault) ||
    order?.tradeUser?.addresses?.[0];

  console.log(address);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">Customer Information</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Customer */}

        <div className="flex items-start gap-3">
          <User size={18} className="mt-1 text-gray-500" />

          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500">
              Customer Name
            </p>

            <p className="mt-1 font-medium">
              {user.firstName || ""} {user.lastName || ""}
            </p>
          </div>
        </div>

        {/* Business */}

        <div className="flex items-start gap-3">
          <Building2 size={18} className="mt-1 text-gray-500" />

          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500">
              Business Name
            </p>

            <p className="mt-1 font-medium">{user.businessName || "-"}</p>
          </div>
        </div>

        {/* Email */}

        <div className="flex items-start gap-3">
          <Mail size={18} className="mt-1 text-gray-500" />

          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500">
              Email
            </p>

            <p className="mt-1">{user.email || "-"}</p>
          </div>
        </div>

        {/* Phone */}

        <div className="flex items-start gap-3">
          <Phone size={18} className="mt-1 text-gray-500" />

          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500">
              Phone
            </p>

            <p className="mt-1">{user.phone || "-"}</p>
          </div>
        </div>

        {/* Country */}

        <div className="flex items-start gap-3">
          <Globe size={18} className="mt-1 text-gray-500" />

          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500">
              DELIVERY ADDRESS
            </p>

            <p className="mt-2 whitespace-pre-line text-sm leading-6">
              {address ? (
                <>
                  {address.addressLine1}
                  {address.addressLine2 && (
                    <>
                      <br />
                      {address.addressLine2}
                    </>
                  )}
                  <br />
                  {[address.city, address.state].filter(Boolean).join(", ")}
                  <br />
                  {[address.country, address.postalCode]
                    .filter(Boolean)
                    .join(" - ")}
                </>
              ) : (
                "Address not available"
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerInfoCard;
