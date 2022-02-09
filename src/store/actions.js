import {
  GET_POSTS_FAILURE,
  GET_POSTS_SUCCESS,
  GET_POSTS_LOADING,
  GET_POST_FAILURE,
  GET_POST_SUCCESS,
  GET_POST_LOADING,
} from "./types";
import apiServices from "@/api/apiServices";

export const getPosts = () => {
  return async function getPostsThunk(dispatch) {
    dispatch({
      type: GET_POSTS_LOADING,
    });
    try {
      const response = await apiServices.getPosts();
      dispatch({
        type: GET_POSTS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_POSTS_FAILURE,
      });
    }
  };
};

export const getPost = (id) => {
  return async function getPostThunk(dispatch) {
    dispatch({
      type: GET_POST_LOADING,
    });
    try {
      const response = await apiServices.getPost(id);
      dispatch({
        type: GET_POST_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_POST_FAILURE,
      });
    }
  };
};
