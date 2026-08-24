import { Card } from "../../../../components/ui";
import ImageUploader from "../../../../components/ui/upload/ImageUploader";

export default function MediaSection({
  formData,
  setFormData,
}) {
  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-[#12312B]">
          Media
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Upload category images.
        </p>
      </div>

      <div className="space-y-8">
        {/* Category Image */}

        <div>
          <h3 className="mb-3 text-sm font-medium">
            Category Image
          </h3>

          <ImageUploader
            files={formData.image}
            setFiles={(value) =>
              setFormData((prev) => ({
                ...prev,
                image:
                  typeof value === "function"
                    ? value(prev.image)
                    : value,
              }))
            }
            multiple={false}
          />
        </div>

        {/* Banner Image */}

        <div>
          <h3 className="mb-3 text-sm font-medium">
            Banner Image
          </h3>

          <ImageUploader
            files={formData.bannerImage}
            setFiles={(value) =>
              setFormData((prev) => ({
                ...prev,
                bannerImage:
                  typeof value === "function"
                    ? value(prev.bannerImage)
                    : value,
              }))
            }
            multiple={false}
          />
        </div>
      </div>
    </Card>
  );
}