const API_URL = import.meta.env.VITE_BASE_URL 

export const getAllNotifications = async () => {
  const token = localStorage.getItem('userToken');
  
  const response = await fetch(`${API_URL}/admin/notification/allNotification`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};