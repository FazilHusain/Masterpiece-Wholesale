import api from "./axios";

const BASE_URL = "/admin/banner";

const getBanners = async (params) => {
  const { data } = await api.get(BASE_URL, {
    params,
  });

  return data;
};

const getBanner = async (id) => {
  const { data } = await api.get(
    `${BASE_URL}/${id}`
  );

  return data;
};

const createBanner = async (body) => {
  const { data } = await api.post(
    BASE_URL,
    body
  );

  return data;
};

const updateBanner = async (
  id,
  body
) => {
  const { data } = await api.put(
    `${BASE_URL}/${id}`,
    body
  );

  return data;
};

const deleteBanner = async (
  id
) => {
  const { data } = await api.delete(
    `${BASE_URL}/${id}`
  );

  return data;
};

const uploadDesktopImage = async (
  id,
  image
) => {
  const formData = new FormData();

  formData.append("image", image);

  const { data } = await api.post(
    `${BASE_URL}/${id}/upload-desktop-image`,
    formData
  );

  return data;
};

const uploadMobileImage = async (
  id,
  image
) => {
  const formData = new FormData();

  formData.append("image", image);

  const { data } = await api.post(
    `${BASE_URL}/${id}/upload-mobile-image`,
    formData
  );

  return data;
};

export default {
  getBanners,
  getBanner,
  createBanner,
  updateBanner,
  deleteBanner,
  uploadDesktopImage,
  uploadMobileImage,
};