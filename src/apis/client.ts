/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-catch */
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

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

const responseErrorInterceptor = (error: AxiosError) => {
  // console.log(error);
  throw error;
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
