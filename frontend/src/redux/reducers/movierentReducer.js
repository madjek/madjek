import {
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
  MOVIE_SHOW,
} from '../types';

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
