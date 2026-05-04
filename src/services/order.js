import api, { showToastSuccess, showToastError, getErrorMessage } from './api';

export const orderService = {
  // ===================== CHECKOUT =====================
  async checkout(addressData) {
    try {
      const { data } = await api.post('/orders/checkout', { address: addressData });
      return data.data || data;
    } catch (error) {
      showToastError(getErrorMessage(error));
      throw error;
    }
  },

  // ===================== GET ORDERS =====================
  async getOrders() {
    try {
      const { data } = await api.get('/orders');
      return data.data || data;
    } catch (error) {
      throw error;
    }
  },
};
