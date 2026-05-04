import api, { showToastSuccess, showToastError, getErrorMessage } from './api';

export const cartService = {
  // ===================== GET CART =====================
  async getCart() {
    try {
      const { data } = await api.get('/cart');
      return data.data || data;
    } catch (error) {
      throw error;
    }
  },

  // ===================== ADD TO CART =====================
  async addToCart(variantId, quantity = 1) {
    try {
      const { data } = await api.post('/cart', { variant_id: variantId, quantity });
      showToastSuccess('Produk ditambahkan ke keranjang!');
      return data.data || data;
    } catch (error) {
      showToastError(getErrorMessage(error));
      throw error;
    }
  },

  // ===================== UPDATE CART ITEM =====================
  async updateCartItem(cartItemId, quantity) {
    try {
      const { data } = await api.put(`/cart/${cartItemId}`, { quantity });
      return data.data || data;
    } catch (error) {
      showToastError(getErrorMessage(error));
      throw error;
    }
  },

  // ===================== REMOVE CART ITEM =====================
  async removeCartItem(cartItemId) {
    try {
      const { data } = await api.delete(`/cart/${cartItemId}`);
      return data.data || data;
    } catch (error) {
      showToastError(getErrorMessage(error));
      throw error;
    }
  },
};
