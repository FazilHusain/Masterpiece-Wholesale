import Card from "../../../../components/ui/Card";
import Input from "../../../../components/ui/Input";

export default function SocialSection({
  formData,
  handleChange,
}) {
  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-[#12312B]">
          Social Media
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Manage your social media links.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <Input
          label="Facebook"
          name="facebook"
          value={formData.facebook || ""}
          onChange={handleChange}
          placeholder="https://facebook.com/..."
        />

        <Input
          label="Instagram"
          name="instagram"
          value={formData.instagram || ""}
          onChange={handleChange}
          placeholder="https://instagram.com/..."
        />

        <Input
          label="LinkedIn"
          name="linkedin"
          value={formData.linkedin || ""}
          onChange={handleChange}
          placeholder="https://linkedin.com/company/..."
        />

        <Input
          label="Pinterest"
          name="pinterest"
          value={formData.pinterest || ""}
          onChange={handleChange}
          placeholder="https://pinterest.com/..."
        />

        <Input
          label="YouTube"
          name="youtube"
          value={formData.youtube || ""}
          onChange={handleChange}
          placeholder="https://youtube.com/..."
        />

        <Input
          label="X (Twitter)"
          name="twitter"
          value={formData.twitter || ""}
          onChange={handleChange}
          placeholder="https://x.com/..."
        />

      </div>
    </Card>
  );
}