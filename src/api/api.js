import axios from "axios";
import BASEURL from "@/config";

function axiosInstance() {
  const instance = axios.create({
    baseURL: `${BASEURL}`,
  });

  return instance;
}

export default axiosInstance;
