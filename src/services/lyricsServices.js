
const BASE_URL = import.meta.env.VITE_BASE_URL;
// Create new lyrics
export const createLyrics = async (lyricsData) => {
  try {
    const token = localStorage.getItem('userToken');
    const response = await fetch(`${BASE_URL}/user/LyricsWriting/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(lyricsData)
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to create lyrics');
    }
    return data;
  } catch (error) {
    throw error instanceof Error ? error : new Error('An unexpected error occurred while creating lyrics');
  }
};

// Delete lyrics by ID
export const deleteLyrics = async (id) => {
  try {
    const token = localStorage.getItem('userToken');
    const response = await fetch(`${BASE_URL}/user/deleteLyricsWriting/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete lyrics');
    }
    return data;
  } catch (error) {
    throw error instanceof Error ? error : new Error('An unexpected error occurred while deleting lyrics');
  }
};

// Get lyrics by ID
export const getLyricsById = async (id) => {
  try {
    const token = localStorage.getItem('userToken');
    const response = await fetch(`${BASE_URL}/user/getLyricsWritingById/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch lyrics');
    }
    return data;
  } catch (error) {
    throw error instanceof Error ? error : new Error('An unexpected error occurred while fetching lyrics');
  }
};

// Get all lyrics
export const getAllLyrics = async () => {
  try {
    const token = localStorage.getItem('userToken');
    const response = await fetch(`${BASE_URL}/user/getLyricsWriting`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch all lyrics');
    }
    return data;
  } catch (error) {
    throw error instanceof Error ? error : new Error('An unexpected error occurred while fetching all lyrics');
  }
};

export const lyricsService = {
  createLyrics,
  deleteLyrics,
  getLyricsById,
  getAllLyrics
};