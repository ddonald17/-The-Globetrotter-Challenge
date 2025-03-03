import api from './api';

export const getRandomDestination = async () => {
  try {
    const response = await api.get('/destinations/random');
    return response.data;
  } catch (error) {
    console.error('Error fetching random destination:', error);
    throw error;
  }
};

export const revealDestination = async (id) => {
    try {
      const response = await api.get(`/destinations/${id}/reveal`);
      return response.data;
    } catch (error) {
      console.error('Error revealing destination:', error);
      throw error;
    }
};  