const BASE_URL = import.meta.env.VITE_BASE_URL;

async function login(email, password) {
  try {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const response = await fetch(`${BASE_URL}/user/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    // Store user data in localStorage with the correct structure
    const userData = {
      user: data.data,
      accessToken: data.accessToken
    };
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('userToken', data.accessToken);

    return userData; // Return the properly structured user data
  } catch (error) {
    throw error instanceof Error ? error : new Error('An unexpected error occurred during login');
  }
}

async function register(userData) {
  try {
    if (!userData.email || !userData.password) {
      throw new Error('Email and password are required for registration');
    }

    const response = await fetch(`${BASE_URL}/user/registration`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName: userData.fullName,
        firstName: userData.firstName,
        lastName: userData.lastName,
        mobileNumber: userData.mobileNumber,
        email: userData.email,
        password: userData.password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }

    return data;
  } catch (error) {
    throw error instanceof Error ? error : new Error('An unexpected error occurred during registration');
  }
}

function getUserData() {
  try {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error retrieving user data:', error);
    return null;
  }
}

function logout() {
  try {
    localStorage.removeItem('userData');
    localStorage.removeItem('userToken');
  } catch (error) {
    console.error('Error during logout:', error);
  }
}

function isLoggedIn() {
  try {
    const userData = getUserData();
    return !!(userData && userData.accessToken);
  } catch (error) {
    console.error('Error checking login status:', error);
    return false;
  }
}

async function socialLogin(socialData) {
  try {
    const response = await fetch(`${BASE_URL}/user/socialLogin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(socialData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Social login failed');
    }

    // Store user data in localStorage
    const userData = {
      user: {
        _id: data.data._id,
        firstName: data.data.firstName,
        lastName: data.data.lastName,
        mobileNumber: data.data.mobileNumber,
        userType: data.data.userType,
      },
      accessToken: data.data.token
    };
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('userToken', data.data.token);

    return userData;
  } catch (error) {
    throw error instanceof Error ? error : new Error('An unexpected error occurred during social login');
  }
}

async function forgotPassword(email) {
  try {
    if (!email) {
      throw new Error('Email is required');
    }

    const response = await fetch(`${BASE_URL}/user/forgetPassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Forgot password request failed');
    }

    return data;
  } catch (error) {
    throw error instanceof Error ? error : new Error('An unexpected error occurred during forgot password request');
  }
}

async function verifyOtp(email, otp) {
  try {
    if (!email || !otp) {
      throw new Error('Email and OTP are required');
    }

    const response = await fetch(`${BASE_URL}/user/forgotVerifyOtp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, otp }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'OTP verification failed');
    }

    return data;
  } catch (error) {
    throw error instanceof Error ? error : new Error('An unexpected error occurred during OTP verification');
  }
}

async function resetPassword(userId, newPassword, confirmPassword) {
  try {
    if (!userId || !newPassword || !confirmPassword) {
      throw new Error('User ID, new password, and confirm password are required');
    }

    const response = await fetch(`${BASE_URL}/user/resetPassword/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newPassword, confirmPassword }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Password reset failed');
    }

    return data;
  } catch (error) {
    throw error instanceof Error ? error : new Error('An unexpected error occurred during password reset');
  }
}

export const userService = {
  login,
  register,
  getUserData,
  logout,
  isLoggedIn,
  socialLogin,
  forgotPassword,
  verifyOtp,
  resetPassword,
};