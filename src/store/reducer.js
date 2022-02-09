import {
  GET_POSTS_FAILURE,
  GET_POSTS_SUCCESS,
  GET_POSTS_LOADING,
} from "./types";

let initialState = {
  posts: { loading: false, data: [] },
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: {
          loading: false,
          data: payload,
        },
      };
    case GET_POSTS_FAILURE:
      return {
        ...state,
        posts: {
          loading: false,
          data: [],
        },
      };
    case GET_POSTS_LOADING:
      return {
        ...state,
        posts: {
          loading: true,
          data: [],
        },
      };
    default:
      return state;
  }
};

export default reducer;
