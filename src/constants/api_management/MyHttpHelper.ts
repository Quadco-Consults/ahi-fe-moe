import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "https://ahni-erp-029252c2fbb9.herokuapp.com/api/v1/";

// Debug logging
console.log('MyHttpHelper - Environment check:', {
  env_var: process.env.NEXT_PUBLIC_BASE_URL,
  baseURL: baseURL,
  all_env: Object.keys(process.env).filter(key => key.startsWith('NEXT_PUBLIC'))
});

const Axios = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 60000,
});

export default Axios;
