import axiosInstance from "./api";

export const get_posts = () => {
  return axiosInstance().get(`get-posts`);
};

export const get_post = (id) => {
  if (window.localStorage.token) {
    return axiosInstance().get(
      `get-posts?postId=${id}&user=${window.localStorage.token}`
    );
  } else {
    return axiosInstance().get(`get-posts?postId=${id}`);
  }
};

export const post_ad = (data) => {
  return axiosInstance().post(`post-ad`, {
    method: "POST",
    body: data,
  });
};

export const login = (email, password) => {
  return axiosInstance().post(`login`, {
    email: email,
    password: password,
  });
};
