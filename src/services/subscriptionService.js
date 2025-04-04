const BASE_URL = import.meta.env.VITE_BASE_URL;

async function getSubscriptions(type) {
  try {
    if (!type) {
      throw new Error('Subscription type is required');
    }

    const response = await fetch(`${BASE_URL}/Subscription?type=${type}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch subscription plans');
    }

    return data.data; // Returns array of subscription plans
  } catch (error) {
    throw error instanceof Error ? error : new Error('An unexpected error occurred while fetching subscription plans');
  }
}

async function getPlatformComparison() {
  try {
    const response = await fetch(`${BASE_URL}/PlatformComparison`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch platform comparison data');
    }

    return data.data;
  } catch (error) {
    throw error instanceof Error ? error : new Error('An unexpected error occurred while fetching platform comparison');
  }
}

async function getPlanDetails() {
  try {
    const response = await fetch(`${BASE_URL}/PlanDetails`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch plan details');
    }

    return data.data;
  } catch (error) {
    throw error instanceof Error ? error : new Error('An unexpected error occurred while fetching plan details');
  }
}

export const subscriptionService = {
  getSubscriptions,
  getPlatformComparison,
  getPlanDetails,
};
