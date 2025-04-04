const BASE_URL = import.meta.env.VITE_BASE_URL;

async function getPromote() {
  try {
    const response = await fetch(`${BASE_URL}/Promote/getPromote`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch promotion data");
    }

    return data;
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error("An unexpected error occurred while fetching promotion data");
  }
}

async function getDistribution() {
  try {
    const response = await fetch(`${BASE_URL}/Distribution/getDistribution`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch distribution data");
    }

    return data;
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error("An unexpected error occurred while fetching distribution data");
  }
}

async function getClientReviews() {
  try {
    const response = await fetch(`${BASE_URL}/clientReview`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch client reviews");
    }

    return data;
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error("An unexpected error occurred while fetching client reviews");
  }
}

async function getOpportunities() {
  try {
    const response = await fetch(`${BASE_URL}/Opportunities/getOpportunities`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch opportunities data");
    }

    return data;
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error("An unexpected error occurred while fetching opportunities data");
  }
}

async function getFanReach() {
  try {
    const response = await fetch(`${BASE_URL}/FanReach/getFanReach`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch opportunities data");
    }

    return data;
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error("An unexpected error occurred while fetching opportunities data");
  }
}

async function getPeerToPeer() {
  try {
    const response = await fetch(`${BASE_URL}/PeerToPeerCollaboration/getPeerToPeerCollaboration`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch opportunities data");
    }

    return data;
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error("An unexpected error occurred while fetching opportunities data");
  }
}

async function getMore() {
  try {
    const response = await fetch(`${BASE_URL}/More/getMore`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch more data");
    }

    return data;
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error("An unexpected error occurred while fetching more data");
  }
}



export const providedServices = {
  getPromote,
  getDistribution,
  getClientReviews,
  getOpportunities,
  getFanReach,
  getPeerToPeer,
  getMore,
};