import { Card } from "../../../../components/ui";
import ImageUploader from "../../../../components/ui/upload/ImageUploader";

export default function MediaSection({
  formData,
  setFormData,
}) {
  const featuredImage = formData?.featuredImage;

  // ImageUploader ko hamesha array chahiye
  const files = featuredImage
    ? [featuredImage]
    : [];

  const handleFilesChange = (value) => {
    setFormData((prev) => {
      const currentFiles = prev?.featuredImage
        ? [prev.featuredImage]
        : [];

      const nextFiles =
        typeof value === "function"
          ? value(currentFiles)
          : value;

      const nextImage = Array.isArray(nextFiles)
        ? nextFiles[0] || ""
        : nextFiles || "";

      return {
        ...prev,
        featuredImage: nextImage,
      };
    });
  };

  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-[#12312B]">
          Featured Image
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Upload the main image that will appear on
          the Journal listing and detail page.
        </p>
      </div>

      <ImageUploader
        files={files}
        setFiles={handleFilesChange}
        multiple={false}
      />
    </Card>
  );
}