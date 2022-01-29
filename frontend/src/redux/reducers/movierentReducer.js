import {
  BUY_MOVIE_CREDITS_FAIL,
  BUY_MOVIE_CREDITS_SUCCESS,
  MOVIE_CREDITS,
  MOVIE_DETAILS_FAIL,
  MOVIE_DETAILS_REQUEST,
  MOVIE_DETAILS_SUCCESS,
  MOVIE_LIST_FAIL,
  MOVIE_LIST_MY_FAIL,
  MOVIE_LIST_MY_REQUEST,
  MOVIE_LIST_MY_RESET,
  MOVIE_LIST_MY_SUCCESS,
  MOVIE_LIST_REQUEST,
  MOVIE_LIST_RESET,
  MOVIE_LIST_SUCCESS,
  MOVIE_ORDER_CREATE_FAIL,
  MOVIE_ORDER_CREATE_REQUEST,
  MOVIE_ORDER_CREATE_RESET,
  MOVIE_ORDER_CREATE_SUCCESS,
  MOVIE_RETURN_FAIL,
  MOVIE_RETURN_REQUEST,
  MOVIE_RETURN_SUCCESS,
  MOVIE_SHOW,
} from '../constants/movierent';

export const movieListReducer = (state = { movies: [] }, action) => {
  switch (action.type) {
    case MOVIE_LIST_REQUEST:
      return { loading: true };

    case MOVIE_LIST_SUCCESS:
      return { loading: false, movies: action.payload };

    case MOVIE_LIST_FAIL:
      return { loading: false, error: action.payload };

    case MOVIE_LIST_RESET:
      return { movies: [] };

    default:
      return state;
  }
};

export const movieDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case MOVIE_SHOW:
      return { movie: action.payload };

    case MOVIE_DETAILS_REQUEST:
      return { loading: true };

    case MOVIE_DETAILS_SUCCESS:
      return { loading: false, movie: action.payload };

    case MOVIE_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const movieListMyReducer = (state = { movies: [] }, action) => {
  switch (action.type) {
    case MOVIE_LIST_MY_REQUEST:
      return { loading: true };

    case MOVIE_LIST_MY_SUCCESS:
      return { loading: false, movies: action.payload };

    case MOVIE_LIST_MY_FAIL:
      return { loading: false, error: action.payload };

    case MOVIE_LIST_MY_RESET:
      return { movies: [] };

    default:
      return state;
  }
};

export const movieOrderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case MOVIE_ORDER_CREATE_REQUEST:
      return { loading: true };

    case MOVIE_ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload };

    case MOVIE_ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload };

    case MOVIE_ORDER_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

export const movieReturnReducer = (state = {}, action) => {
  switch (action.type) {
    case MOVIE_RETURN_REQUEST:
      return { loading: true };

    case MOVIE_RETURN_SUCCESS:
      return { loading: false, success: true };

    case MOVIE_RETURN_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const movieCreditsReducer = (state = {}, action) => {
  switch (action.type) {
    case MOVIE_CREDITS:
      return { credits: action.payload };

    case BUY_MOVIE_CREDITS_SUCCESS:
      return { success: true };

    case BUY_MOVIE_CREDITS_FAIL:
      return { error: action.payload };

    default:
      return state;
  }
};
