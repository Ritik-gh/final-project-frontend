import axiosInstance from "./api";

const apiServices = {
  async getPosts() {
    const response = await axiosInstance().get(`get-posts`);
    return response;
  },
  async getPost(id) {
    let response;
    if (window.localStorage.token) {
      response = await axiosInstance().get(
        `get-posts?postId=${id}&user=${window.localStorage.token}`
      );
    } else {
      response = await axiosInstance().get(`get-posts?postId=${id}`);
    }
    return response;
  },
};

export default apiServices;
