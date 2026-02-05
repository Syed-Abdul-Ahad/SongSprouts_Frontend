import api from './axios';

export const artistAPI = {
  // Get artist profile
  getProfile: async (userId) => {
    const response = await api.get(`/artists/profile/${userId}`);
    return response.data;
  },

  // Update artist profile (onboarding)
  updateProfile: async (formData) => {
    const response = await api.patch(`/artists/profile`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      
    });
    return response.data;
  },
};
