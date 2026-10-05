import apiService from './apiService';

export const getProductions = async () => {
  const response = await apiService.get('/production');
  return response;
};

export const startProduction = async (data) => {
  const response = await apiService.post('/production', data);
  return response;
};

export const approveProduction = async (id) => {
  const response = await apiService.post(`/production/${id}/approve`);
  return response;
};
