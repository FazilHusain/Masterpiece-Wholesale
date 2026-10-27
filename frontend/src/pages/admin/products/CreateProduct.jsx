import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  createProduct,
  uploadGalleryImages,
  uploadProductVideo,
  uploadStoryImage,
} from "../../../redux/product";

import PageHeader from "../../../components/common/PageHeader";
import ProductForm from "./ProductForm";

export default function CreateProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (data, storyUploads = []) => {
    try {
      // =============================
      // CREATE PRODUCT
      // =============================

      const response = await dispatch(
        createProduct(data),
      ).unwrap();

      const createdProduct = response?.data;

      // =============================
      // PRODUCT ID
      // =============================

      const productId = createdProduct?._id;

      if (!productId) {
        throw new Error(
          "Product created but product ID was not returned.",
        );
      }

      // =============================
      // GALLERY
      // =============================

      const galleryFiles = Array.isArray(data.gallery)
        ? data.gallery.filter(
            (file) => file instanceof File,
          )
        : [];

      if (galleryFiles.length > 0) {
        await dispatch(
          uploadGalleryImages({
            id: productId,
            files: galleryFiles,
          }),
        ).unwrap();
      }

      // =============================
      // PRODUCT VIDEOS
      // =============================

      const videoUploads = Array.isArray(data.videos)
        ? data.videos.filter(
            (video) => video?.file instanceof File,
          )
        : [];

      if (videoUploads.length > 0) {
        for (const video of videoUploads) {
          await dispatch(
            uploadProductVideo({
              id: productId,
              file: video.file,
              title: video.title || "",
            }),
          ).unwrap();
        }
      }

      // =============================
      // STORY IMAGES
      // =============================

      if (storyUploads.length > 0) {
        for (const story of storyUploads) {
          await dispatch(
            uploadStoryImage({
              id: productId,
              storyIndex: story.index,
              file: story.file,
            }),
          ).unwrap();
        }
      }

      // =============================
      // SUCCESS
      // =============================

      toast.success("Product created successfully.");

      navigate("/admin/products");
    } catch (error) {
      console.error(
        "CREATE PRODUCT ERROR:",
        error,
      );

      toast.error(
        error?.message ||
          error ||
          "Failed to create product.",
      );
    }
  };

  return (
    <>
      <PageHeader
        title="Create Product"
        subtitle="Add a new product."
      />

      <ProductForm
        mode="create"
        onSubmit={handleSubmit}
      />
    </>
  );
}