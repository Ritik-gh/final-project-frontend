import {
  GET_POSTS_FAILURE,
  GET_POSTS_SUCCESS,
  GET_POSTS_LOADING,
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
