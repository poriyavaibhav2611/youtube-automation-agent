import apiService from './apiService';

export const login = async (credentials) => {
  const response = await apiService.post('/auth/login', credentials);
  return response;
};

export const loginVerify = async (verificationCode, token) => {
  const response = await apiService.post('/auth/login-verify', { verificationCode, token });
  return response;
};

export const register = async (userData) => {
  const response = await apiService.post('/auth/register', userData);
  return response;
};

export const logout = async () => {
  try {
    const response = await apiService.post('/auth/logout');
    return response;
  } catch (err) {
    return null;
  }
};

export const getProfile = async () => {
  try {
    const response = await apiService.get('/auth/profile');
    return response;
  } catch (err) {
    return null;
  }
};
