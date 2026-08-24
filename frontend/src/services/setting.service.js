import api from "./axios";

const BASE_URL = "/admin/settings";

const getSettings = async () => {
  const { data } = await api.get(BASE_URL);

  return data;
};

const updateSettings = async (payload) => {
  const { data } = await api.put(BASE_URL, payload);

  return data;
};

const uploadImage = async (type, image) => {
  const formData = new FormData();

  formData.append("image", image);

  const { data } = await api.post(
    `${BASE_URL}/upload/${type}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

const settingService = {
  getSettings,
  updateSettings,
  uploadImage,
};

export default settingService;