import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import PageHeader from "../../../components/common/PageHeader";
import { Loader } from "../../../components/ui";
import BannerForm from "./BannerForm";

import {
  fetchBanner,
  updateBanner,
  uploadBannerDesktop,
  uploadBannerMobile,
} from "../../../redux/banner";

import { clearBanner } from "../../../redux/banner/bannerSlice";

export default function EditBanner() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { banner, loading } = useSelector(
    (state) => state.banner,
  );

  // -----------------------------------------
  // FETCH BANNER
  // -----------------------------------------

  useEffect(() => {
    dispatch(fetchBanner(id));

    return () => {
      dispatch(clearBanner());
    };
  }, [dispatch, id]);

  // -----------------------------------------
  // UPDATE BANNER
  // -----------------------------------------

  const handleSubmit = async (data) => {
    try {
      const desktopImage = data?.desktopImage;
      const mobileImage = data?.mobileImage;

      // -----------------------------------------
      // Images ko update API se alag rakho
      // -----------------------------------------

      const {
        desktopImage: _desktopImage,
        mobileImage: _mobileImage,
        ...bannerData
      } = data;

      // -----------------------------------------
      // UPDATE BASIC BANNER DATA
      // -----------------------------------------

      await dispatch(
        updateBanner({
          id,
          data: bannerData,
        }),
      ).unwrap();

      // -----------------------------------------
      // NEW DESKTOP IMAGE
      // Sirf tab upload hoga jab user ne
      // nayi image select ki ho
      // -----------------------------------------

      if (desktopImage instanceof File) {
        await dispatch(
          uploadBannerDesktop({
            id,
            image: desktopImage,
          }),
        ).unwrap();
      }

      // -----------------------------------------
      // NEW MOBILE IMAGE
      // -----------------------------------------

      if (mobileImage instanceof File) {
        await dispatch(
          uploadBannerMobile({
            id,
            image: mobileImage,
          }),
        ).unwrap();
      }

      toast.success("Banner updated successfully.");

      navigate("/admin/banner");
    } catch (error) {
      console.error("UPDATE BANNER ERROR:", error);

      toast.error(
        typeof error === "string"
          ? error
          : error?.message || "Something went wrong.",
      );
    }
  };

  // -----------------------------------------
  // LOADING
  // -----------------------------------------

  if (loading && !banner) {
    return <Loader />;
  }

  return (
    <>
      <PageHeader
        title="Edit Banner"
        subtitle="Update banner information."
      />

      <BannerForm
        mode="edit"
        initialValues={banner || {}}
        onSubmit={handleSubmit}
      />
    </>
  );
}