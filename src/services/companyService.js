const BASE_URL = import.meta.env.VITE_BASE_URL;

async function getPrivacyPolicy() {
  try {
    const response = await fetch(`${BASE_URL}/User/getPrivacy`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch Privacy Policy data');
    }

    return {
      status: response.status,
      success: true,
      data: data.data,
      message: data.message || 'Privacy Policy retrieved successfully',
    };
  } catch (error) {
    const errorResponse = {
      status: error instanceof Response ? error.status : 500,
      success: false,
      message: error instanceof Error ? error.message : 'An unexpected error occurred while fetching Privacy Policy data',
      data: null,
    };
    throw errorResponse;
  }
}

async function getFAQ() {
  try {
    const response = await fetch(`${BASE_URL}/User/faq/All`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch FAQ data');
    }

    return {
      status: response.status,
      success: true,
      data: data?.data,
      message: data.message || 'FAQ retrieved successfully',
    };
  } catch (error) {
    const errorResponse = {
      status: error instanceof Response ? error.status : 500,
      success: false,
      message: error instanceof Error ? error.message : 'An unexpected error occurred while fetching FAQ data',
      data: null,
    };
    throw errorResponse;
  }
}

async function createInquiry(inquiryData) {
  try {
    if (!inquiryData.name || !inquiryData.email || !inquiryData.message) {
      throw new Error('Name, email, and message are required');
    }

    const response = await fetch(`${BASE_URL}/user/createInquiry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: inquiryData.name,
        email: inquiryData.email,
        phone: inquiryData.phone,
        lookingFor: inquiryData.lookingFor,
        message: inquiryData.message,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to submit inquiry');
    }

    return {
      status: response.status,
      success: true,
      data: data,
      message: 'Inquiry submitted successfully',
    };
  } catch (error) {
    const errorResponse = {
      status: error instanceof Response ? error.status : 500,
      success: false,
      message: error instanceof Error ? error.message : 'An unexpected error occurred while submitting inquiry',
      data: null,
    };
    throw errorResponse;
  }
}

async function getCareerData() {
  try {
    const response = await fetch(`${BASE_URL}/Career/getCareer`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch Career data');
    }

    return {
      status: response.status,
      success: true,
      data: data.data,
      message: data.message || 'Career data retrieved successfully',
    };
  } catch (error) {
    const errorResponse = {
      status: error instanceof Response ? error.status : 500,
      success: false,
      message: error instanceof Error ? error.message : 'An unexpected error occurred while fetching Career data',
      data: null,
    };
    throw errorResponse;
  }
}

async function getAboutUs() {
  try {
    const response = await fetch('https://studio-sphere360-backend.vercel.app/api/v1/User/getAboutUs', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch About Us data');
    }

    return {
      status: response.status,
      success: true,
      data: data.data,
      message: data.message || 'About Us data retrieved successfully',
    };
  } catch (error) {
    const errorResponse = {
      status: error instanceof Response ? error.status : 500,
      success: false,
      message: error instanceof Error ? error.message : 'An unexpected error occurred while fetching About Us data',
      data: null,
    };
    throw errorResponse;
  }
}

export const companyService = {
  getPrivacyPolicy,
  getFAQ,
  createInquiry,
  getCareerData,
  getAboutUs
};