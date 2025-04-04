import axios from 'axios';

const API_URL = import.meta.env.VITE_BASE_URL;
const AUTH_TOKEN = localStorage.getItem('userToken');

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${AUTH_TOKEN}`,
    'Content-Type': 'multipart/form-data', // For file uploads
  },
});

export const createAudio = async (audioFile) => {
  const formData = new FormData();
  formData.append('audio', audioFile);
  const response = await api.post('/user/Audio/createAudio', formData);
  return response.data;
};

export const getAudioById = async (id) => {
  const response = await api.get(`/user/getAudioById/${id}`);
  return response.data;
};

export const getAllAudio = async () => {
  const response = await api.get('/user/getAudio');
  return response.data;
};

export default api;