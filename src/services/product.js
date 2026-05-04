import api, { getErrorMessage } from './api';

export const productService = {
  // ===================== CATEGORIES =====================
  async getCategories() {
    try {
      const { data } = await api.get('/categories');
      return data.data || data;
    } catch (error) {
      throw error;
    }
  },

  // ===================== PRODUCTS (with pagination & filters) =====================
  async getProducts(params = {}) {
    try {
      const { data } = await api.get('/products', { params });
      return data.data || data;
    } catch (error) {
      throw error;
    }
  },

  // ===================== PRODUCT DETAIL =====================
  async getProductById(id) {
    try {
      const { data } = await api.get(`/products/${id}`);
      return data.data || data;
    } catch (error) {
      throw error;
    }
  },
};
