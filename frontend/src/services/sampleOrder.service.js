import api from "./axios";

const BASE_URL = "/admin/sample-orders";

const getSampleOrders = async (params) => {
  const { data } = await api.get(BASE_URL, {
    params,
  });

  return data;
};

const getSampleOrder = async (id) => {
  const { data } = await api.get(
    `${BASE_URL}/${id}`
  );

  return data;
};

const createSampleOrder = async (body) => {
  const { data } = await api.post(
    BASE_URL,
    body
  );

  return data;
};

const updateSampleOrder = async (
  id,
  body
) => {
  const { data } = await api.patch(
    `${BASE_URL}/${id}`,
    body
  );

  return data;
};

const updateSampleStatus = async (
  id,
  status
) => {
  const { data } = await api.patch(
    `${BASE_URL}/${id}/status`,
    { status }
  );

  return data;
};

const addAdminNote = async (
  id,
  adminNote
) => {
  const { data } = await api.patch(
    `${BASE_URL}/${id}/admin-note`,
    { adminNote }
  );

  return data;
};

const deleteSampleOrder = async (
  id
) => {
  const { data } = await api.delete(
    `${BASE_URL}/${id}`
  );

  return data;
};

export default {
  getSampleOrders,
  getSampleOrder,
  createSampleOrder,
  updateSampleOrder,
  updateSampleStatus,
  addAdminNote,
  deleteSampleOrder,
};