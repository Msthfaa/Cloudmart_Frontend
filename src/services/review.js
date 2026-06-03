import api from './api';

export const reviewService = {
  // Create a review for an order item
  async createReview(itemId, formData) {
    try {
      const response = await api.post(`/orders/items/${itemId}/review`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  // Get product reviews
  async getProductReviews(productId) {
    try {
      const response = await api.get(`/products/${productId}/reviews`);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  // Get all store reviews (Seller)
  async getStoreReviews() {
    try {
      const response = await api.get('/seller/reviews');
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  // Reply to a review (Seller)
  async replyReview(reviewId, replyText) {
    try {
      const response = await api.put(`/seller/reviews/${reviewId}/reply`, {
        reply: replyText,
      });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
};
