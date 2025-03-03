import api from './api';

export const createChallenge = async (creatorId) => {
  try {
    const response = await api.post('/challenges', { creatorId });
    return response.data;
  } catch (error) {
    console.error('Error creating challenge:', error);
    throw error;
  }
};

export const getChallenge = async (accessCode) => {
  try {
    const response = await api.get(`/challenges/${accessCode}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching challenge:', error);
    throw error;
  }
};
