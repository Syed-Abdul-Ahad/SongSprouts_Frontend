import api from './axios';

export const artistAPI = {
  // Get all artists with pagination and filters
  getAllArtists: async (page = 1, limit = 10, filters = {}) => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    // Add optional filters
    if (filters.search) params.append('search', filters.search);
    // Handle genres array - convert to comma-separated string
    if (filters.genres && filters.genres.length > 0) {
      params.append('genre', filters.genres.join(','));
    }
    if (filters.location) params.append('location', filters.location);
    if (filters.sortBy) params.append('sortBy', filters.sortBy);
    if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);

    const response = await api.get(`/artists?${params.toString()}`);
    return response.data;
  },

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

  // Create service offering
  createServiceOffering: async (data) => {
    const response = await api.post(`/artists/service-offerings`, data);
    return response.data;
  },

  // Create addon
  createAddon: async (data) => {
    const response = await api.post(`/artists/addons`, data);
    return response.data;
  },
};
