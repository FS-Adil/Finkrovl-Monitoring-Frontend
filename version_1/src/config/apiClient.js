import axios from 'axios';

const apiClient = axios.create({
  // Пустой baseURL означает, что запросы пойдут на тот же origin (localhost:5173)
  // Vite proxy перехватит /api/* и перенаправит на http://localhost:8080
  baseURL: '',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => {
    console.log('[API] Ответ получен:', response.config.url);
    return response.data;
  },
  (error) => {
    console.warn('[API] Ошибка запроса:', error.config?.url, error.message);
    return Promise.reject(error);
  }
);

export default apiClient;