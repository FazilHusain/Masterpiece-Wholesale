import api from "./axios";

const BASE_URL = "/admin/journal";

/* ========================= */

const getJournals = async () => {
  const { data } = await api.get(BASE_URL);

  return data;
};

/* ========================= */

const getFeaturedJournal = async () => {
  const { data } = await api.get(`${BASE_URL}/featured`);

  return data;
};

/* ========================= */

const getJournal = async (slug) => {
  const { data } = await api.get(`${BASE_URL}/slug/${slug}`);

  return data;
};

/* ========================= */

const getRelatedJournals = async (slug) => {
  const { data } = await api.get(`${BASE_URL}/related/${slug}`);

  return data;
};

/* ========================= */

const createJournal = async (body) => {
  const { data } = await api.post(BASE_URL, body);

  return data;
};

/* ========================= */

const updateJournal = async (id, body) => {
  const { data } = await api.put(`${BASE_URL}/${id}`, body);

  return data;
};

/* ========================= */

const deleteJournal = async (id) => {
  const { data } = await api.delete(`${BASE_URL}/${id}`);

  return data;
};

/* ========================= */

const uploadFeaturedImage = async (id, image) => {
  const formData = new FormData();

  formData.append("image", image);

  const { data } = await api.post(
    `${BASE_URL}/${id}/upload-featured-image`,
    formData,
  );

  return data;
};

const getJournalById = async (id) => {
  const { data } = await api.get(`${BASE_URL}/${id}`);

  return data;
};

const journalService = {
  getJournals,
  getFeaturedJournal,
  getJournal,
  getJournalById,
  getRelatedJournals,
  createJournal,
  updateJournal,
  deleteJournal,
  uploadFeaturedImage,
};

export default journalService;
