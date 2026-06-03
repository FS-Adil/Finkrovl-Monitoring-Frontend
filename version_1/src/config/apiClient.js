import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://192.168.0.248:8081',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Интерцептор для обработки ошибок
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error.message);
    return Promise.reject(error);
  }
);

export default apiClient;