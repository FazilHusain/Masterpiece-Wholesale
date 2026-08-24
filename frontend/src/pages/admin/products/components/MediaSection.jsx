import { Card } from "../../../../components/ui";
import ImageUploader from "../../../../components/ui/upload/ImageUploader";

export default function MediaSection({
  formData,
  setFormData,
}) {
  return (
    <Card>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-[#12312B]">
          Featured Image
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Upload the primary image of your product.
        </p>
      </div>

      <ImageUploader
        files={Array.isArray(formData.featuredImage)
          ? formData.featuredImage
          : formData.featuredImage
            ? [formData.featuredImage]
            : []
        }
        setFiles={(value) =>
          setFormData((prev) => ({
            ...prev,
            featuredImage:
              typeof value === "function"
                ? value(prev.featuredImage)
                : value,
          }))
        }
        multiple={false}
      />

      <div className="mt-5 rounded-2xl border border-[#E8E2D9] bg-[#FCFBF8] p-4">
        <h4 className="text-sm font-semibold text-[#12312B]">
          Recommended Image
        </h4>

        <ul className="mt-3 space-y-2 text-sm text-gray-500">
          <li>• JPG, PNG or WEBP</li>
          <li>• Recommended: 1200 × 1200 px</li>
          <li>• Maximum size: 5 MB</li>
          <li>• High quality square image</li>
        </ul>
      </div>
    </Card>
  );
}