import axios from 'axios';
import { getCookie, removeCookie } from '../utils/cookies';
import { CONSTANTS } from '../utils/constant';

const apiClient = axios.create({
  baseURL: CONSTANTS.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getCookie('yt-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      removeCookie('yt-token');
      // Only redirect if not already on the login or verification page
      if (window.location.pathname !== '/login' && window.location.pathname !== '/verify-2fa') {
        window.location.href = '/login';
      }
    }

    if (error.response?.data) {
      const data = error.response.data;
      const apiMessage = data.message || data.detail || data.errors || data.error;
      if (apiMessage) {
        error.message = typeof apiMessage === 'string' ? apiMessage : JSON.stringify(apiMessage);
      }
    }

    return Promise.reject(error);
  }
);

const apiService = {
  get: async (url, config = {}) => {
    const response = await apiClient.get(url, config);
    return response.data;
  },

  post: async (url, data, config = {}) => {
    if (data instanceof FormData) {
      const cfg = {
        ...config,
        headers: {
          ...config.headers,
          'Content-Type': undefined
        }
      };
      const response = await apiClient.post(url, data, cfg);
      return response.data;
    }
    const response = await apiClient.post(url, data, config);
    return response.data;
  },

  put: async (url, data, config = {}) => {
    if (data instanceof FormData) {
      const cfg = {
        ...config,
        headers: {
          ...config.headers,
          'Content-Type': undefined,
        },
      };
      const response = await apiClient.put(url, data, cfg);
      return response.data;
    }
    const response = await apiClient.put(url, data, config);
    return response.data;
  },

  delete: async (url, config = {}) => {
    const response = await apiClient.delete(url, config);
    return response.data;
  },

  patch: async (url, data, config = {}) => {
    const response = await apiClient.patch(url, data, config);
    return response.data;
  }
};

export default apiService;
