const BASE_URL = import.meta.env.VITE_BASE_URL;

async function getMusicRight() {
  try {
    const response = await fetch(`${BASE_URL}/static/getMusicRight`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch music rights data");
    }

    return data;
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error(
          "An unexpected error occurred while fetching music rights data"
        );
  }
}

async function getAllBlogs(page = 1, limit = 3) {
  try {
    const response = await fetch(`${BASE_URL}/admin/allBlog?page=${page}&limit=${limit}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch blog data");
    }

    return data;
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error("An unexpected error occurred while fetching blog data");
  }
}

async function getVision() {
  try {
    const response = await fetch(`${BASE_URL}/Vision/getVision`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch vision data");
    }

    return data;
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error("An unexpected error occurred while fetching vision data");
  }
}

export const communityServices = {
  getMusicRight,
  getAllBlogs,
  getVision,
};
