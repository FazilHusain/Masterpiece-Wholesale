import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import PageHeader from "../../../components/common/PageHeader";
import BannerForm from "./BannerForm";

import {
  createBanner,
  uploadBannerDesktop,
  uploadBannerMobile,
} from "../../../redux/banner";

export default function CreateBanner() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      const desktopImage = data?.desktopImage;
      const mobileImage = data?.mobileImage;

      // Images ko create API se alag rakho
      const {
        desktopImage: _desktopImage,
        mobileImage: _mobileImage,
        ...bannerData
      } = data;

      // Step 1: banner create
      const result = await dispatch(
        createBanner(bannerData),
      ).unwrap();

      const bannerId = result?.data?._id;

      if (!bannerId) {
        throw new Error(
          "Banner created but ID was not returned.",
        );
      }

      // Step 2: desktop image
      if (desktopImage instanceof File) {
        await dispatch(
          uploadBannerDesktop({
            id: bannerId,
            image: desktopImage,
          }),
        ).unwrap();
      }

      // Step 3: mobile image
      if (mobileImage instanceof File) {
        await dispatch(
          uploadBannerMobile({
            id: bannerId,
            image: mobileImage,
          }),
        ).unwrap();
      }

      toast.success("Banner created successfully.");

      navigate("/admin/banner");
    } catch (error) {
      console.error("CREATE BANNER ERROR:", error);

      toast.error(
        typeof error === "string"
          ? error
          : error?.message ||
              "Something went wrong.",
      );
    }
  };

  return (
    <>
      <PageHeader
        title="Create Banner"
        subtitle="Create website banner."
      />

      <BannerForm
        mode="create"
        onSubmit={handleSubmit}
      />
    </>
  );
}