import { API_URL } from '@/config/config';
import { logError } from '@/utils/logError';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});


axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      logError('Not Authorized');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
