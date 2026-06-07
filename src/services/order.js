import api, { showToastSuccess, showToastError, getErrorMessage } from './api';

export const orderService = {
  // ===================== CHECKOUT =====================
  async checkout(addressString, logisticServiceId, voucherCode = '', cartItemIDs = []) {
    try {
      const payload = {
        address: addressString,
        logistic_service_id: Number(logisticServiceId),
        voucher_code: voucherCode,
        cart_item_ids: cartItemIDs,
      };
      const { data } = await api.post('/orders/checkout', payload);
      return data.data || data;
    } catch (error) {
      showToastError(getErrorMessage(error));
      throw error;
    }
  },

  // ===================== ESTIMATE ORDER =====================
  async estimateOrder(logisticServiceId, voucherCode = '', cartItemIDs = []) {
    try {
      const payload = {
        logistic_service_id: Number(logisticServiceId),
        voucher_code: voucherCode,
        cart_item_ids: cartItemIDs,
      };
      const { data } = await api.post('/orders/estimate', payload);
      return data.data || data;
    } catch (error) {
      showToastError(getErrorMessage(error));
      throw error;
    }
  },

  // ===================== INITIATE PAYMENT =====================
  async initiatePayment(orderId) {
    try {
      const { data } = await api.post(`/orders/${orderId}/pay`);
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

  // ===================== GET ORDER BY ID =====================
  async getOrderById(id) {
    try {
      const { data } = await api.get(`/orders/${id}`);
      return data.data || data;
    } catch (error) {
      throw error;
    }
  },
};
