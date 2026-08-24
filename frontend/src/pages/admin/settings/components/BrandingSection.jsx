import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { Card } from "../../../../components/ui";
import ImageUploader from "../../../../components/ui/upload/ImageUploader";

import { uploadSettingImage } from "../../../../redux/setting/settingThunk";

export default function BrandingSection({
  formData,
  setFormData,
}) {
  const dispatch = useDispatch();

  const handleUpload = async (type, files) => {
    if (!files?.length) return;

    try {
      const file = files[0];

      const response = await dispatch(
        uploadSettingImage({
          type,
          image: file,
        })
      ).unwrap();

      setFormData(response.data);

      toast.success(
        `${type} uploaded successfully.`
      );
    } catch (error) {
      toast.error(
        typeof error === "string"
          ? error
          : error?.message || "Image upload failed."
      );
    }
  };

  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-[#12312B]">
          Branding
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Website branding assets.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">

        <ImageUploader
          label="Logo"
          multiple={false}
          files={formData.logo ? [formData.logo] : []}
          onChange={(files) =>
            handleUpload("logo", files)
          }
        />

        <ImageUploader
          label="Footer Logo"
          multiple={false}
          files={
            formData.footerLogo
              ? [formData.footerLogo]
              : []
          }
          onChange={(files) =>
            handleUpload("footerLogo", files)
          }
        />

        <ImageUploader
          label="Favicon"
          multiple={false}
          files={
            formData.favicon
              ? [formData.favicon]
              : []
          }
          onChange={(files) =>
            handleUpload("favicon", files)
          }
        />

      </div>
    </Card>
  );
}