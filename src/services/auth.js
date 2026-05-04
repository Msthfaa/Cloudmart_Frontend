import api, { showToastSuccess, showToastError, getErrorMessage } from './api';

export const authService = {
  // ===================== LOGIN =====================
  async login(credentials) {
    try {
      const { data } = await api.post('/login', credentials);
      const responseData = data.data || data; // Handle wrapper
      
      // Simpan token ke localStorage
      localStorage.setItem('access_token', responseData.access_token);
      if (responseData.refresh_token) {
        localStorage.setItem('refresh_token', responseData.refresh_token);
      }
      showToastSuccess('Login berhasil!');
      return responseData;
    } catch (error) {
      showToastError(getErrorMessage(error));
      throw error;
    }
  },

  // ===================== REGISTER =====================
  async register(userData) {
    try {
      const { data } = await api.post('/register', userData);
      showToastSuccess('Registrasi berhasil! Silakan login.');
      return data.data || data;
    } catch (error) {
      showToastError(getErrorMessage(error));
      throw error;
    }
  },

  // ===================== PROFILE =====================
  async getProfile() {
    try {
      const { data } = await api.get('/profile');
      return data.data || data;
    } catch (error) {
      throw error;
    }
  },

  // ===================== ADDRESSES =====================
  async getAddresses() {
    try {
      const { data } = await api.get('/profile/addresses');
      return data.data || data;
    } catch (error) {
      throw error;
    }
  },

  async addAddress(addressData) {
    try {
      const { data } = await api.post('/profile/addresses', addressData);
      showToastSuccess('Alamat berhasil ditambahkan!');
      return data;
    } catch (error) {
      showToastError(getErrorMessage(error));
      throw error;
    }
  },

  // ===================== LOGOUT =====================
  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },

  // ===================== CHECK AUTH =====================
  isAuthenticated() {
    return !!localStorage.getItem('access_token');
  },
};