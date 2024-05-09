import axios from "axios";
import { Env } from "common/types";
const { NODE_ENV, PROD_BASE_URL, DEV_BASE_URL, APP_TOKEN } = process.env;

const axiosInstance = axios.create({
  baseURL: NODE_ENV === Env.Production ? PROD_BASE_URL : DEV_BASE_URL,
  headers: {
    "app-token": APP_TOKEN,
  },
});

export default axiosInstance;
