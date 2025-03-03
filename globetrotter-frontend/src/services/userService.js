import api from './api';

export const createUser = async (username) => {
  try {
    const response = await api.post('/users', { username });
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const getUserByUsername = async (username) => {
  try {
    const response = await api.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const updateUserScore = async (userId, destinationId, correct) => {
  try {
    const response = await api.put(`/users/${userId}/score`, { 
      destinationId, 
      correct 
    });
    return response.data;
  } catch (error) {
    console.error('Error updating score:', error);
    throw error;
  }
};