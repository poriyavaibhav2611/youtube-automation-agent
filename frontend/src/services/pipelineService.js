import apiService from './apiService';

export const fetchPipelineVideos = async () => {
  const response = await apiService.get('/pipeline');
  return response;
};

export const updateVideoStatus = async (id, status) => {
  const response = await apiService.put(`/pipeline/${id}/status`, { status });
  return response;
};
