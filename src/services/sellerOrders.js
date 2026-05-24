import api from './api';
import { getErrorMessage } from './api';

export const sellerOrdersService = {
  async getOrders(status = '') {
    try {
      const response = await api.get(`/seller/orders?status=${status}`);
      return response.data.data || [];
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
  
  async getOrderById(id) {
    try {
      const response = await api.get(`/seller/orders/${id}`);
      return response.data.data || {};
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  async updateOrderStatus(id, status) {
    try {
      const response = await api.put(`/seller/orders/${id}/status`, { status });
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }
};
