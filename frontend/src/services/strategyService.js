import apiService from './apiService';

export const fetchStrategy = async () => {
  const response = await apiService.get('/strategy');
  return response;
};

export const saveStrategyData = async (strategyData) => {
  const response = await apiService.post('/strategy', strategyData);
  return response;
};

export const activateStrategyData = async (strategyData) => {
  const response = await apiService.post('/strategy/activate', strategyData);
  return response;
};
