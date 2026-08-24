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
          Banner Images
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Upload desktop and mobile banner images.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">

        {/* ================= DESKTOP ================= */}

        <div>
          <h3 className="mb-4 font-semibold text-[#12312B]">
            Desktop Banner
          </h3>

          <ImageUploader
            files={
              formData.desktopImage
                ? [formData.desktopImage]
                : []
            }
            setFiles={(value) =>
              setFormData((prev) => ({
                ...prev,
                desktopImage:
                  typeof value === "function"
                    ? value(
                        prev.desktopImage
                          ? [prev.desktopImage]
                          : [],
                      )?.[0] || ""
                    : value?.[0] || "",
              }))
            }
            multiple={false}
          />
        </div>

        {/* ================= MOBILE ================= */}

        <div>
          <h3 className="mb-4 font-semibold text-[#12312B]">
            Mobile Banner
          </h3>

          <ImageUploader
            files={
              formData.mobileImage
                ? [formData.mobileImage]
                : []
            }
            setFiles={(value) =>
              setFormData((prev) => ({
                ...prev,
                mobileImage:
                  typeof value === "function"
                    ? value(
                        prev.mobileImage
                          ? [prev.mobileImage]
                          : [],
                      )?.[0] || ""
                    : value?.[0] || "",
              }))
            }
            multiple={false}
          />
        </div>

      </div>

      {/* ================= GUIDELINES ================= */}

      <div className="mt-6 rounded-2xl border border-[#E8E2D9] bg-[#FCFBF8] p-5">
        <h4 className="text-sm font-semibold text-[#12312B]">
          Recommended Banner Sizes
        </h4>

        <ul className="mt-3 space-y-2 text-sm text-gray-500">
          <li>
            • Desktop: <strong>1920 × 700 px</strong>
          </li>

          <li>
            • Mobile: <strong>768 × 900 px</strong>
          </li>

          <li>
            • Format: JPG / PNG / WEBP
          </li>

          <li>
            • Maximum file size: 5 MB
          </li>
        </ul>
      </div>
    </Card>
  );
}