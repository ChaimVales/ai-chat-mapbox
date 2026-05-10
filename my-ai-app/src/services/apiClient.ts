import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 60_000,
  headers: { 'Content-Type': 'application/json' },
});

// Interceptor להוספת request id (לדיבוג)
apiClient.interceptors.request.use((config) => {
  config.headers['X-Request-Id'] = crypto.randomUUID();
  return config;
});

// Interceptor לשגיאות
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isCancel(error)) return Promise.reject(error);
    console.error('[api] error:', error?.response?.data || error.message);
    return Promise.reject(error);
  },
);
