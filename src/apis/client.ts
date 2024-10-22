/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-catch */
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { useAuthStore } from "../store";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const refreshToken = async () => {
  await axios.post(
    `${import.meta.env.VITE_BACKEND_API_URL}/auth/refresh`,
    {},
    {
      withCredentials: true,
    }
  );
};

const requestInterceptor = (request: any) => {
  return request;
};

const requestErrorInterceptor = (error: AxiosError) => {
  // console.log(error);
  throw error;
};

const responseInterceptor = (response: AxiosResponse) => {
  return response;
};

// Response error interceptor with TypeScript fixes
const responseErrorInterceptor = async (error: AxiosError) => {
  const originalRequest = error.config as AxiosRequestConfig & {
    _isRetry?: boolean;
  };

  // Check if the error is due to an unauthorized status (401)
  if (
    error.response &&
    error.response.status === 401 &&
    !originalRequest._isRetry
  ) {
    originalRequest._isRetry = true;

    try {
      // Attempt to refresh the token
      await refreshToken();

      // Resend the original request with the new token
      return axiosInstance(originalRequest);
    } catch (err) {
      // Log the error and log the user out
      console.error("Token refresh error", err);
      useAuthStore.getState().logout();
      return Promise.reject(err);
    }
  }

  // If the error is not related to 401 or cannot be handled, reject the promise
  return Promise.reject(error);
};

axiosInstance.interceptors.request.use(
  requestInterceptor,
  requestErrorInterceptor
);
axiosInstance.interceptors.response.use(
  responseInterceptor,
  responseErrorInterceptor
);

const api = (axiosInstance: AxiosInstance) => ({
  get: (url: string, config?: AxiosRequestConfig) =>
    requestWrapper(axiosInstance.get(url, config)),
  delete: (url: string, config?: AxiosRequestConfig) =>
    requestWrapper(axiosInstance.delete(url, config)),
  post: (url: string, body?: any, config?: AxiosRequestConfig) =>
    requestWrapper(axiosInstance.post(url, body, config)),
  patch: (url: string, body: any, config?: AxiosRequestConfig) =>
    requestWrapper(axiosInstance.patch(url, body, config)),
  put: (url: string, body: any, config?: AxiosRequestConfig) =>
    requestWrapper(axiosInstance.put(url, body, config)),
});

const requestWrapper = async (request: Promise<AxiosResponse<any, any>>) => {
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api(axiosInstance);
