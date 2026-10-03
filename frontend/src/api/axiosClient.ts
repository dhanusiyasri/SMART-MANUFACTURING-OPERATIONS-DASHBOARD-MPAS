import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { APP_CONFIG } from '../config/app.config.js';

export interface ApiErrorResponse {
  success: false;
  error?: {
    code?: string;
    message?: string;
    details?: unknown;
  };
}

export const axiosClient: AxiosInstance = axios.create({
  baseURL: APP_CONFIG.API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request Interceptor: Attach authorization tokens or plant contextual headers
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('mpas_auth_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response Interceptor: Normalize API response structures and handle global 401/500 errors
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: AxiosError<ApiErrorResponse>) => {
    const errorMessage = error.response?.data?.error?.message || error.message || 'An unexpected API error occurred';
    return Promise.reject(new Error(errorMessage));
  }
);
