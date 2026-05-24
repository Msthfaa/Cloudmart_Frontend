import api from './api';
import { getErrorMessage } from './api';

export const profileService = {
  // Ambil data profil
  async getProfile() {
    try {
      const response = await api.get('/profile');
      return response.data.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  // Ambil daftar alamat
  async getAddresses() {
    try {
      const response = await api.get('/profile/addresses');
      return response.data.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  // Tambah alamat baru
  async addAddress(addressData) {
    try {
      const response = await api.post('/profile/addresses', addressData);
      return response.data.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }
};
