const BASE_URL = import.meta.env.VITE_BASE_URL;

async function createDynamicMockup({ image, mockupUuid, smartObjectsUuid }) {
  try {
    if (!image || !mockupUuid || !smartObjectsUuid) {
      throw new Error('Image, mockup UUID, and smart objects UUID are required');
    }

    const formData = new FormData();
    formData.append('image', image);
    formData.append('mockup_uuid', mockupUuid);
    formData.append('smart_objectsUuid', smartObjectsUuid);

    const response = await fetch(`${BASE_URL}/DynamicMockups/create`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create dynamic mockup');
    }

    return data.data;
  } catch (error) {
    throw error instanceof Error ? error : new Error('An unexpected error occurred while creating dynamic mockup');
  }
}

async function getDynamicMockups() {
  try {
    const response = await fetch(`${BASE_URL}/DynamicMockups/get`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch dynamic mockups');
    }

    return data.data;
  } catch (error) {
    throw error instanceof Error ? error : new Error('An unexpected error occurred while fetching dynamic mockups');
  }
}

export const graphicDesignService = {
  createDynamicMockup,
  getDynamicMockups,
};