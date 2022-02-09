import axios from "axios";
import BASEURL from "@/config";

function axiosInstance() {
  const instance = axios.create({
    baseURL: `${BASEURL}`,
  });

  if (window.localStorage.token) {
    instance.defaults.headers.auth = window.localStorage.token;
  }

  return instance;
}

export default axiosInstance;
