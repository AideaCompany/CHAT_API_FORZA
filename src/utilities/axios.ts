import axios from "axios";
import { getVariableSync } from "../config";

export const axiosInstance = axios.create({
  baseURL: `https://graph.facebook.com/${getVariableSync("VERSION")}`,
  headers: {
    Authorization: `Bearer ${getVariableSync("BEARER_TOKEN")}`,
  },
});

export const axiosInstanceBack = axios.create({
  baseURL: getVariableSync('BACKEND_URL')
});
