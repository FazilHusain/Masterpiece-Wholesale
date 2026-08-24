import React from "react";
import { User, Mail, Phone } from "lucide-react";

export default function ApplicantCard({ application }) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <div className="mb-5 flex items-center gap-2">

        <User className="text-gray-600" size={20} />

        <h2 className="text-lg font-semibold">
          Applicant Information
        </h2>

      </div>

      <div className="space-y-5">

        <div>

          <label className="text-xs uppercase text-gray-500">
            Full Name
          </label>

          <p className="mt-1 font-medium">
            {application.firstName} {application.lastName}
          </p>

        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

          <div>

            <label className="text-xs uppercase text-gray-500">
              Email
            </label>

            <div className="mt-1 flex items-center gap-2">

              <Mail size={16} />

              <span>{application.email}</span>

            </div>

          </div>

          <div>

            <label className="text-xs uppercase text-gray-500">
              WhatsApp
            </label>

            <div className="mt-1 flex items-center gap-2">

              <Phone size={16} />

              <span>{application.whatsapp}</span>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}