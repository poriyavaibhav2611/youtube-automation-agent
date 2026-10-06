import { getCookie } from './cookies';

export const getApiHeaders = () => {
  const token = getCookie('yt-token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const formatStatus = (status) => {
  return status.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
};
