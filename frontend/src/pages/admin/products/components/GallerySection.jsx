import { Card } from "../../../../components/ui";
import ImageUploader from "../../../../components/ui/upload/ImageUploader";
import { Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { deleteGalleryImage } from "../../../../redux/product/productThunk";

export default function GallerySection({ formData, setFormData, productId }) {
  const dispatch = useDispatch();

  const gallery = Array.isArray(formData.gallery) ? formData.gallery : [];

  // ==========================================
  // GALLERY CHANGE
  // ==========================================

  const handleGalleryChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      gallery: typeof value === "function" ? value(prev.gallery || []) : value,
    }));
  };

  // ==========================================
  // DELETE EXISTING GALLERY IMAGE
  // ==========================================

  const handleDeleteGalleryImage = async (imageId) => {
    if (!productId || !imageId) {
      toast.error("Product ID or image ID is missing.");
      console.log("Gallery delete IDs:", {
        productId,
        imageId,
      });
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this image?",
    );

    if (!confirmed) return;

    try {
      await dispatch(
        deleteGalleryImage({
          id: productId,
          imageId,
        }),
      ).unwrap();

      // Remove ONLY deleted image from local UI
      setFormData((prev) => ({
        ...prev,
        gallery: (prev.gallery || []).filter(
          (image) => image?._id?.toString() !== imageId?.toString(),
        ),
      }));

      toast.success("Gallery image deleted.");

      toast.success("Gallery image deleted successfully.");
    } catch (error) {
      console.error("Delete gallery image error:", error);

      toast.error(
        typeof error === "string"
          ? error
          : error?.message || "Failed to delete gallery image.",
      );
    }
  };

  return (
    <Card>
      {/* ===================================== */}
      {/* HEADER */}
      {/* ===================================== */}

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-[#12312B]">
            Gallery Images
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Upload up to 10 product gallery images.
          </p>
        </div>

        <div className="rounded-xl bg-[#F8F6F2] px-4 py-2 text-sm font-medium text-[#12312B]">
          {gallery.length} / 10
        </div>
      </div>

      {/* ===================================== */}
      {/* EXISTING GALLERY IMAGES */}
      {/* ===================================== */}

      {gallery.length > 0 && (
        <div className="mb-8">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#12312B]">
            Existing Images
          </h3>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {gallery.map((image, index) => {
              const imageUrl =
                typeof image === "string" ? image : image?.url || "";

              const imageId = typeof image === "object" ? image?._id : null;

              return (
                <div
                  key={imageId || index}
                  className="group relative overflow-hidden rounded-xl border border-[#E8E2D9] bg-[#F8F6F2]"
                >
                  {/* IMAGE */}

                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={image?.alt || `Gallery image ${index + 1}`}
                      className="h-40 w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-40 items-center justify-center text-xs text-gray-400">
                      No Image
                    </div>
                  )}

                  {/* IMAGE NUMBER */}

                  <span className="absolute bottom-2 left-2 rounded-md bg-black/60 px-2 py-1 text-[10px] font-medium text-white">
                    {index + 1}
                  </span>

                  {/* DELETE */}

                  {imageId && productId && (
                    <button
                      type="button"
                      onClick={() => handleDeleteGalleryImage(imageId)}
                      className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-red-600 text-white opacity-0 shadow-lg transition-all duration-200 group-hover:opacity-100 hover:bg-red-700"
                      title="Delete image"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ===================================== */}
      {/* UPLOADER */}
      {/* ===================================== */}

      {gallery.length < 10 && (
        <>
          {/* <div className="mb-3">
            <h3 className="text-sm font-medium text-[#12312B]">Upload Image</h3>
          </div> */}

          <ImageUploader
            files={gallery}
            setFiles={handleGalleryChange}
            multiple={true}
            maxFiles={10}
          />
        </>
      )}

      {/* ===================================== */}
      {/* GUIDELINES */}
      {/* ===================================== */}

      <div className="mt-6 rounded-2xl border border-[#E8E2D9] bg-[#FCFBF8] p-5">
        <h4 className="font-semibold text-[#12312B]">Gallery Guidelines</h4>

        <ul className="mt-4 space-y-2 text-sm text-gray-500">
          <li>• Maximum 10 images</li>
          <li>• JPG, PNG, WEBP</li>
          <li>• Recommended 1200 × 1200 px</li>
          <li>• Keep the same aspect ratio for all images</li>
          <li>• First image will be displayed after Featured Image</li>
        </ul>
      </div>
    </Card>
  );
}
