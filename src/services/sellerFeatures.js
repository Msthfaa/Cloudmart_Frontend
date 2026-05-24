import api from './api';
import { getErrorMessage } from './api';

export const sellerFeaturesService = {
  // ===================== CATEGORIES =====================
  async getCategories() {
    try {
      const response = await api.get('/seller/categories');
      return response.data.data || [];
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
  async createCategory(data) {
    try {
      const response = await api.post('/seller/categories', data);
      return response.data.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
  async updateCategory(id, data) {
    try {
      const response = await api.put(`/seller/categories/${id}`, data);
      return response.data.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
  async deleteCategory(id) {
    try {
      const response = await api.delete(`/seller/categories/${id}`);
      return response.data.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  // ===================== PRODUCTS =====================
  async getProducts() {
    try {
      const response = await api.get('/seller/products');
      return response.data.data || [];
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
  async createProduct(data) {
    try {
      const response = await api.post('/seller/products', data);
      return response.data.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
  async updateProduct(id, data) {
    try {
      const response = await api.put(`/seller/products/${id}`, data);
      return response.data.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
  async deleteProduct(id) {
    try {
      const response = await api.delete(`/seller/products/${id}`);
      return response.data.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  // ===================== VARIANTS =====================
  async getVariants(productId) {
    try {
      const response = await api.get(`/seller/products/${productId}/variants`);
      return response.data.data || [];
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
  async addVariant(productId, data) {
    try {
      const response = await api.post(`/seller/products/${productId}/variants`, data);
      return response.data.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
  async updateVariant(variantId, data) {
    try {
      const response = await api.put(`/seller/variants/${variantId}`, data);
      return response.data.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
  async deleteVariant(variantId) {
    try {
      const response = await api.delete(`/seller/variants/${variantId}`);
      return response.data.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  // ===================== VOUCHERS =====================
  async getVouchers() {
    try {
      const response = await api.get('/seller/vouchers');
      return response.data.data || [];
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
  async createVoucher(data) {
    try {
      const response = await api.post('/seller/vouchers', data);
      return response.data.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
  async updateVoucher(id, data) {
    try {
      const response = await api.put(`/seller/vouchers/${id}`, data);
      return response.data.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
  async deleteVoucher(id) {
    try {
      const response = await api.delete(`/seller/vouchers/${id}`);
      return response.data.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  // ===================== LOGISTICS =====================
  async getLogistics() {
    try {
      const response = await api.get('/seller/logistics');
      return response.data.data || [];
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
  async createLogistic(data) {
    try {
      const response = await api.post('/seller/logistics', data);
      return response.data.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
  async updateLogistic(id, data) {
    try {
      const response = await api.put(`/seller/logistics/${id}`, data);
      return response.data.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
  async deleteLogistic(id) {
    try {
      const response = await api.delete(`/seller/logistics/${id}`);
      return response.data.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  // Logistics Services
  async addLogisticService(logisticId, data) {
    try {
      const response = await api.post(`/seller/logistics/${logisticId}/services`, data);
      return response.data.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
  async updateLogisticService(serviceId, data) {
    try {
      const response = await api.put(`/seller/logistics/services/${serviceId}`, data);
      return response.data.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
  async deleteLogisticService(serviceId) {
    try {
      const response = await api.delete(`/seller/logistics/services/${serviceId}`);
      return response.data.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  // ===================== PAYMENT CONFIGS =====================
  async getPaymentConfigs() {
    try {
      const response = await api.get('/seller/payment-configs');
      return response.data.data || [];
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
  async createPaymentConfig(data) {
    try {
      const response = await api.post('/seller/payment-configs', data);
      return response.data.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
  async deletePaymentConfig(id) {
    try {
      const response = await api.delete(`/seller/payment-configs/${id}`);
      return response.data.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  // Banks for Payment Configs
  async addBankToPaymentConfig(configId, data) {
    try {
      const response = await api.post(`/seller/payment-configs/${configId}/banks`, data);
      return response.data.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
  async deleteBankFromPaymentConfig(bankId) {
    try {
      const response = await api.delete(`/seller/payment-configs/banks/${bankId}`);
      return response.data.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }
};
