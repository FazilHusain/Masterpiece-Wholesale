import { Building2, Mail, Phone, User, MapPin } from "lucide-react";

export default function TradeProfile({ user }) {
  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="rounded-2xl bg-[#183425] p-8 text-white">
        <h2 className="font-cormorant text-5xl">
          My Profile
        </h2>

        <p className="mt-3 text-white/80">
          Manage your business account information.
        </p>
      </div>

      {/* Details */}

      <div className="rounded-2xl border border-[#E6DED2] bg-white p-8 shadow-sm">
        <div className="grid gap-8 md:grid-cols-2">

          <div className="flex items-start gap-4">
            <User className="mt-1 text-[#183425]" size={22} />

            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
                Full Name
              </p>

              <h3 className="mt-2 text-lg font-semibold text-[#183425]">
                {user?.firstName} {user?.lastName}
              </h3>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Building2 className="mt-1 text-[#183425]" size={22} />

            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
                Business Name
              </p>

              <h3 className="mt-2 text-lg font-semibold text-[#183425]">
                {user?.businessName || "-"}
              </h3>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Mail className="mt-1 text-[#183425]" size={22} />

            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
                Email
              </p>

              <h3 className="mt-2 text-lg font-semibold text-[#183425]">
                {user?.email}
              </h3>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Phone className="mt-1 text-[#183425]" size={22} />

            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
                Mobile
              </p>

              <h3 className="mt-2 text-lg font-semibold text-[#183425]">
                {user?.phone || "-"}
              </h3>
            </div>
          </div>

          <div className="flex items-start gap-4 md:col-span-2">
            <MapPin className="mt-1 text-[#183425]" size={22} />

            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
                Address
              </p>

              <h3 className="mt-2 text-lg font-semibold text-[#183425]">
                {user?.address || "-"}
              </h3>
            </div>
          </div>

        </div>
      </div>

      {/* Account Status */}

      <div className="rounded-2xl border border-[#E6DED2] bg-white p-8 shadow-sm">
        <h3 className="mb-5 font-cormorant text-3xl text-[#183425]">
          Account Status
        </h3>

        <div className="flex flex-wrap gap-4">

          <span className="rounded-full bg-green-100 px-5 py-2 text-sm font-medium text-green-700">
            ✓ Active Trade Account
          </span>

          <span className="rounded-full bg-[#F7F3EB] px-5 py-2 text-sm text-[#183425]">
            Luxury Buyer
          </span>

        </div>
      </div>
    </div>
  );
}