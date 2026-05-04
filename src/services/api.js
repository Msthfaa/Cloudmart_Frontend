import axios from 'axios';
import Swal from 'sweetalert2';

// ===================== AXIOS INSTANCE =====================
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ===================== REQUEST INTERCEPTOR =====================
// Otomatis menambahkan Bearer token di setiap request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ===================== RESPONSE INTERCEPTOR =====================
// Handle 401 Unauthorized secara global
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Jika 401 dan belum pernah retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          // Coba refresh token
          const { data } = await axios.post('/api/login', {
            refresh_token: refreshToken,
          });
          const responseData = data.data; // Backend membungkus di dalam properti `data`
          localStorage.setItem('access_token', responseData.access_token);
          if (responseData.refresh_token) {
            localStorage.setItem('refresh_token', responseData.refresh_token);
          }
          originalRequest.headers.Authorization = `Bearer ${responseData.access_token}`;
          return api(originalRequest);
        } catch (refreshError) {
          // Refresh gagal → logout
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      } else {
        // Tidak ada refresh token → logout
        localStorage.removeItem('access_token');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

// ===================== HELPER: Toast Notification =====================
export const showToastSuccess = (message) => {
  Swal.fire({
    icon: 'success',
    title: message,
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
  });
};

export const showToastError = (message) => {
  Swal.fire({
    icon: 'error',
    title: message,
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3500,
    timerProgressBar: true,
  });
};

export const getErrorMessage = (error) => {
  if (error.response?.data?.message) return error.response.data.message;
  if (error.response?.data?.error) return error.response.data.error;
  if (error.message) return error.message;
  return 'Terjadi kesalahan yang tidak diketahui';
};

export default api;
