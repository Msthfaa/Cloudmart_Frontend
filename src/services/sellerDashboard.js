import api from './api';
import { getErrorMessage } from './api';

export const sellerDashboardService = {
  async getSummary() {
    try {
      const response = await api.get('/seller/dashboard');
      return response.data.data || { total_orders: 0, pending_orders: 0, total_revenue: 0, total_products: 0, low_stock_items: 0 };
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }
};
