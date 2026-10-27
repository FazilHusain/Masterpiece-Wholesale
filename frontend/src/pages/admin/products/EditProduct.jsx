import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  fetchProduct,
  updateProduct,
  uploadGalleryImages,
  uploadProductVideo,
  uploadStoryImage,
  clearProduct,
} from "../../../redux/product";

import { Loader } from "../../../components/ui";
import PageHeader from "../../../components/common/PageHeader";
import ProductForm from "./ProductForm";

export default function EditProduct() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product, loading } = useSelector(
    (state) => state.product,
  );

  useEffect(() => {
    dispatch(fetchProduct(id));

    return () => {
      dispatch(clearProduct());
    };
  }, [dispatch, id]);

  const handleSubmit = async (
    data,
    storyUploads = [],
  ) => {
    try {
      // =========================================
      // 1. UPDATE PRODUCT DATA
      // =========================================

      await dispatch(
        updateProduct({
          id,
          data,
        }),
      ).unwrap();

      // =========================================
      // 2. NEW GALLERY FILES
      // =========================================

      const galleryFiles = Array.isArray(data.gallery)
        ? data.gallery.filter(
            (file) => file instanceof File,
          )
        : [];

      // =========================================
      // 3. UPLOAD NEW GALLERY
      // =========================================

      if (galleryFiles.length > 0) {
        await dispatch(
          uploadGalleryImages({
            id,
            files: galleryFiles,
          }),
        ).unwrap();
      }

      // =========================================
      // 4. PRODUCT VIDEOS
      // =========================================

      const videoUploads = Array.isArray(data.videos)
        ? data.videos.filter(
            (video) => video?.file instanceof File,
          )
        : [];

      if (videoUploads.length > 0) {
        for (const video of videoUploads) {
          await dispatch(
            uploadProductVideo({
              id,
              file: video.file,
              title: video.title || "",
            }),
          ).unwrap();
        }
      }

      // =========================================
      // 5. STORY IMAGES
      // =========================================

      if (storyUploads.length > 0) {
        for (const story of storyUploads) {
          await dispatch(
            uploadStoryImage({
              id,
              storyIndex: story.index,
              file: story.file,
            }),
          ).unwrap();
        }
      }

      // =========================================
      // 6. SUCCESS
      // =========================================

      toast.success(
        "Product updated successfully.",
      );

      navigate("/admin/products");
    } catch (error) {
      console.error(
        "UPDATE PRODUCT ERROR:",
        error,
      );

      toast.error(
        typeof error === "string"
          ? error
          : error?.message ||
              "Failed to update product.",
      );
    }
  };

  // =========================================
  // LOADER
  // =========================================

  if (loading && !product) {
    return <Loader />;
  }

  return (
    <>
      <PageHeader
        title="Edit Product"
        subtitle="Update product details."
      />

      <ProductForm
        mode="edit"
        initialValues={product}
        productId={id}
        onSubmit={handleSubmit}
      />
    </>
  );
}