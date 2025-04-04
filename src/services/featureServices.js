const BASE_URL = import.meta.env.VITE_BASE_URL;

async function getCreateMusic() {
  try {
    const response = await fetch(`${BASE_URL}/CreateMusic/getCreateMusic`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch CreateMusic data');
    }
  
    return {
      status: response.status,
      success: true,
      data: data.data,
      message: data.message || 'Data retrieved successfully',
    };
  } catch (error) {
    const errorResponse = {
      status: error instanceof Response ? error.status : 500,
      success: false,
      message: error instanceof Error ? error.message : 'An unexpected error occurred while fetching CreateMusic data',
      data: null,
    };
    throw errorResponse;
  }
}

async function getMastering() {
  try {
    const response = await fetch(`${BASE_URL}/Mastering/getMastering`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch Mastering data');
    }
  
    return {
      status: response.status,
      success: true,
      data: data.data,
      message: data.message || 'Mastering data retrieved successfully',
    };
  } catch (error) {
    const errorResponse = {
      status: error instanceof Response ? error.status : 500,
      success: false,
      message: error instanceof Error ? error.message : 'An unexpected error occurred while fetching Mastering data',
      data: null,
    };
    throw errorResponse;
  }
}

async function getSongWriting() {
  try {
    const response = await fetch(`${BASE_URL}/SongWriting/getSongWriting`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch SongWriting data');
    }
  
    return {
      status: response.status,
      success: true,
      data: data.data,
      message: data.message || 'SongWriting data retrieved successfully',
    };
  } catch (error) {
    const errorResponse = {
      status: error instanceof Response ? error.status : 500,
      success: false,
      message: error instanceof Error ? error.message : 'An unexpected error occurred while fetching SongWriting data',
      data: null,
    };
    throw errorResponse;
  }
}

async function getRecordMusic() {
  try {
    const response = await fetch(`${BASE_URL}/RecordMusic/getRecordMusic`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch RecordMusic data');
    }
  
    return {
      status: response.status,
      success: true,
      data: data.data,
      message: data.message || 'RecordMusic data retrieved successfully',
    };
  } catch (error) {
    const errorResponse = {
      status: error instanceof Response ? error.status : 500,
      success: false,
      message: error instanceof Error ? error.message : 'An unexpected error occurred while fetching RecordMusic data',
      data: null,
    };
    throw errorResponse;
  }
}

async function getRecordVideo() {
  try {
    const response = await fetch(`${BASE_URL}/CreateVideo/getCreateVideo`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch RecordMusic data');
    }
  
    return {
      status: response.status,
      success: true,
      data: data.data,
      message: data.message || 'RecordMusic data retrieved successfully',
    };
  } catch (error) {
    const errorResponse = {
      status: error instanceof Response ? error.status : 500,
      success: false,
      message: error instanceof Error ? error.message : 'An unexpected error occurred while fetching RecordMusic data',
      data: null,
    };
    throw errorResponse;
  }
}

export const createMusicService = {
  getCreateMusic,
  getMastering,
  getSongWriting,
  getRecordMusic,
  getRecordVideo
};