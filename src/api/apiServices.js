import axiosInstance from "./api";

const apiServices = {
  async getPosts() {
    const response = await axiosInstance().get(`get-posts`);
    return response;
  },
};

export default apiServices;
