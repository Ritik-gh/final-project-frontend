import {
  GET_POSTS_FAILURE,
  GET_POSTS_SUCCESS,
  GET_POSTS_LOADING,
  GET_POST_FAILURE,
  GET_POST_SUCCESS,
  GET_POST_LOADING,
} from "./types";

let initialState = {
  posts: { loading: false, data: [] },
  post: {
    loading: false,
    data: {},
    bidderDetails: {},
  },
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
    case GET_POST_SUCCESS:
      let bidderDetails = false;
      if (payload.bidderDetails) {
        bidderDetails = true;
      }
      return {
        ...state,
        post: {
          loading: false,
          data: bidderDetails ? payload.post : payload,
          bidderDetails: bidderDetails ? payload.bidderDetails : {},
        },
      };
    case GET_POST_FAILURE:
      return {
        ...state,
        post: {
          loading: false,
          data: {},
          bidderDetails: {},
        },
      };
    case GET_POST_LOADING:
      return {
        ...state,
        post: {
          loading: true,
          data: {},
          bidderDetails: {},
        },
      };
    default:
      return state;
  }
};

export default reducer;
