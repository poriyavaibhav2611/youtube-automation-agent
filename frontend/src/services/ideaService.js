import apiService from './apiService';

export const fetchIdeas = async (status = '') => {
  const query = status ? `?status=${status}` : '';
  const response = await apiService.get(`/ideas${query}`);
  return response;
};

export const fetchIdeaById = async (id) => {
  const response = await apiService.get(`/ideas/${id}`);
  return response;
};

export const generateScriptForIdea = async (id) => {
  const response = await apiService.post(`/ideas/${id}/generate`);
  return response;
};
