import { createAsyncThunk } from "@reduxjs/toolkit";

import bannerService from "../../services/banner.service";

export const fetchBanners =
  createAsyncThunk(
    "banner/fetchBanners",
    bannerService.getBanners
  );

export const fetchBanner =
  createAsyncThunk(
    "banner/fetchBanner",
    bannerService.getBanner
  );

export const createBanner =
  createAsyncThunk(
    "banner/createBanner",
    bannerService.createBanner
  );

export const updateBanner =
  createAsyncThunk(
    "banner/updateBanner",
    ({ id, data }) =>
      bannerService.updateBanner(
        id,
        data
      )
  );

export const deleteBanner =
  createAsyncThunk(
    "banner/deleteBanner",
    bannerService.deleteBanner
  );

export const uploadBannerDesktop =
  createAsyncThunk(
    "banner/uploadDesktop",
    ({ id, image }) =>
      bannerService.uploadDesktopImage(
        id,
        image
      )
  );

export const uploadBannerMobile =
  createAsyncThunk(
    "banner/uploadMobile",
    ({ id, image }) =>
      bannerService.uploadMobileImage(
        id,
        image
      )
  );