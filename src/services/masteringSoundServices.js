import axios from 'axios';

const API_URL =  'http://localhost:5002/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add API key to requests
api.interceptors.request.use((config) => {
  const apiKey = '8a3098b3c49fa526941916418da935f91cadc42bf995cdee7cc338cf214dc3eb';
  
  if (apiKey) {
    config.headers.Authorization = `Bearer ${apiKey}`;
  }
  
  return config;
});

// Song API
export const getSongs = async (userId, page = 1, limit = 10) => {
  const response = await api.get('/songs/list', {
    params: { userId, page, limit },
  });
  return response.data;
};

export const getSong = async (id) => {
  const response = await api.get(`/songs/${id}`);
  return response.data;
};

export const getSignedUrl = async (fileName, fileType, userId) => {
  const response = await api.get('/songs/get-signed-url', {
    params: { fileName, fileType, userId },
  });
  return response.data;
};

export const createSong = async (songData) => {
  const response = await api.post('/songs', songData);
  return response.data;
};

// Mastering API
export const submitForMastering = async (data) => {
  try {
    console.log('Submitting for mastering with data:', data);
    console.log('API URL:', API_URL + '/mastering/submit');
    
    const response = await api.post('/mastering/submit', data);
    console.log('Mastering submission successful:', response.data);
    return response.data;
  } catch (error) {
    console.error('Mastering submission error:', error.response?.data || error.message);
    throw error;
  }
};

export const getMasteringJobStatus = async (id) => {
  const response = await api.get(`/mastering/status/${id}`);
  return response.data;
};

export const listMasteringJobs = async (userId) => {
  const response = await api.get('/mastering/list', {
    params: { userId },
  });
  return response.data;
};


export const uploadFileToS3 = async (file, userId) => {
  try {
    // Get signed URL from backend
    const { signedUrl, uid, fileExtension, key } = await getSignedUrl(
      file.name,
      file.type,
      userId
    );
    
    // Upload file to S3
    await axios.put(signedUrl, file, {
      headers: {
        'Content-Type': file.type,
      },
    });
    
    return {
      uid,
      fileExtension,
      key,
      success: true
    };
  } catch (error) {
    console.error('Error uploading file to S3:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

export default api;