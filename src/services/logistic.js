import api, { getErrorMessage } from './api';

export const logisticService = {
  async getLogistics() {
    try {
      const { data } = await api.get('/logistics');
      return data.data || data;
    } catch (error) {
      throw error;
    }
  }
};
