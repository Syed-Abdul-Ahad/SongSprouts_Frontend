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

  // Delete service offering
  deleteServiceOffering: async (serviceId) => {
    const response = await api.delete(`/artists/service-offerings/${serviceId}`);
    return response.data;
  },

  // Delete addon
  deleteAddon: async (addonId) => {
    const response = await api.delete(`/artists/addons/${addonId}`);
    return response.data;
  },
};
