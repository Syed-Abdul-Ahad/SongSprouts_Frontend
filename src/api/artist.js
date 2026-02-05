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

  // Update service offering
  updateServiceOffering: async (serviceId, data) => {
    const response = await api.patch(`/artists/service-offerings/${serviceId}`, data);
    return response.data;
  },

  // Update addon
  updateAddon: async (addonId, data) => {
    const response = await api.patch(`/artists/addons/${addonId}`, data);
    return response.data;
  },
};
