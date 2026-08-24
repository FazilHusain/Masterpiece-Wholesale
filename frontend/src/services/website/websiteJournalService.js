import api from "../axios"

const BASE_URL = "/api/journal";

const getJournals = async () => {
  const { data } = await api.get(BASE_URL);
  return data;
};

const getFeaturedJournal = async () => {
  const { data } = await api.get(`${BASE_URL}/featured`);
  return data;
};

const getJournal = async (slug) => {
  const { data } = await api.get(`${BASE_URL}/slug/${slug}`);
  return data;
};

const getRelatedJournals = async (slug) => {
  const { data } = await api.get(`${BASE_URL}/related/${slug}`);
  return data;
};

export default {
  getJournals,
  getFeaturedJournal,
  getJournal,
  getRelatedJournals,
};