import { Card } from "../../../../components/ui";
import ImageUploader from "../../../../components/ui/upload/ImageUploader";

export default function MediaSection({
  formData,
  setFormData,
}) {
  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-[#17342F]">
          Media
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Upload collection images.
        </p>
      </div>

      <div className="space-y-8">

        {/* Banner */}

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

        {/* Thumbnail */}

        <div>
          <h3 className="mb-3 text-sm font-medium">
            Thumbnail Image
          </h3>

          <ImageUploader
            files={formData.thumbnailImage}
            setFiles={(value) =>
              setFormData((prev) => ({
                ...prev,
                thumbnailImage:
                  typeof value === "function"
                    ? value(prev.thumbnailImage)
                    : value,
              }))
            }
            multiple={false}
          />
        </div>

        {/* Featured */}

        <div>
          <h3 className="mb-3 text-sm font-medium">
            Featured Image
          </h3>

          <ImageUploader
            files={formData.featuredImage}
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
        </div>

      </div>
    </Card>
  );
}