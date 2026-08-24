import { Card, Textarea, Input } from "../../../../components/ui";

export default function ContactSection({
  formData,
  handleChange,
}) {
  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-[#12312B]">
          Contact Information
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Website contact information.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <Input
          label="Email"
          name="email"
          value={formData.email || ""}
          onChange={handleChange}
          placeholder="info@hismasterpiece.com"
        />

        <Input
          label="Phone"
          name="phone"
          value={formData.phone || ""}
          onChange={handleChange}
          placeholder="+91 9876543210"
        />

        <Input
          label="WhatsApp"
          name="whatsapp"
          value={formData.whatsapp || ""}
          onChange={handleChange}
          placeholder="+91 9876543210"
        />

        <Input
          label="Google Map Embed URL"
          name="googleMap"
          value={formData.googleMap || ""}
          onChange={handleChange}
          placeholder="https://www.google.com/maps/embed..."
        />

      </div>

      <div className="mt-6">
        <Textarea
          label="Address"
          name="address"
          rows={4}
          value={formData.address || ""}
          onChange={handleChange}
        />
      </div>
    </Card>
  );
}