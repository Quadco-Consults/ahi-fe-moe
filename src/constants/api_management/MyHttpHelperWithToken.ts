import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "https://ahni-erp-029252c2fbb9.herokuapp.com/api/v1/";

// Debug logging
console.log('MyHttpHelperWithToken - Environment check:', {
  env_var: process.env.NEXT_PUBLIC_BASE_URL,
  baseURL: baseURL,
  has_fallback: !!baseURL
});

const AxiosWithToken = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

AxiosWithToken.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    console.log('Request config:', {
      url: config.url,
      method: config.method,
      baseURL: config.baseURL,
      hasToken: !!token
    });

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn('No authentication token found');
    }

    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

AxiosWithToken.interceptors.response.use(
  (response) => {
    // Handle successful responses here
    return response;
  },
  async (error) => {
    // Log detailed error information for debugging
    console.error('HTTP Error Details:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url,
      method: error.config?.method,
      baseURL: error.config?.baseURL,
      fullError: error
    });

    if (error.response && error.response.status === 401) {
      console.log("Redirecting to login due to 401 error");
      window.location.href = "/auth/login";
      return Promise.reject(error);
    }

    // Handle undefined or network errors
    if (!error.response) {
      console.error('Network error or undefined response:', error.message);
    }

    return Promise.reject(error);
  }
);

export default AxiosWithToken;
