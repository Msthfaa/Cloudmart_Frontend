import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', 
});

export const authService = {
  register(userData) {
    return api.post('/api/v1/auth/register', userData);
  },
  login(credentials) {
    return api.post('/api/v1/auth/login', credentials);
  }
};