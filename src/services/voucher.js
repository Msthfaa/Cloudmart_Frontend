import api, { getErrorMessage, showToastError, showToastSuccess } from './api';

export const voucherService = {
  // Claim a voucher
  async claimVoucher(code) {
    try {
      const { data } = await api.post(`/vouchers/${code}/claim`);
      showToastSuccess('Voucher berhasil diklaim!');
      return data.data || data;
    } catch (error) {
      showToastError(getErrorMessage(error));
      throw error;
    }
  },

  // Get available vouchers for a store (optional usage)
  async getAvailableVouchers(storeId) {
    try {
      const { data } = await api.get('/vouchers', { params: { store_id: storeId } });
      return data.data || [];
    } catch (error) {
      throw error;
    }
  },

  // Get user's claimed vouchers
  async getMyVouchers() {
    try {
      const { data } = await api.get('/vouchers/mine');
      return data.data || [];
    } catch (error) {
      throw error;
    }
  }
};
