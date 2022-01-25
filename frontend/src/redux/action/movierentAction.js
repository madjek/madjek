import axios from 'axios';
import {
  MOVIE_DETAILS_FAIL,
  MOVIE_DETAILS_REQUEST,
  MOVIE_DETAILS_SUCCESS,
  MOVIE_LIST_FAIL,
  MOVIE_LIST_MY_FAIL,
  MOVIE_LIST_MY_REQUEST,
  MOVIE_LIST_MY_SUCCESS,
  MOVIE_LIST_REQUEST,
  MOVIE_LIST_SUCCESS,
  MOVIE_ORDER_CREATE_FAIL,
  MOVIE_ORDER_CREATE_REQUEST,
  MOVIE_ORDER_CREATE_SUCCESS,
  MOVIE_SHOW,
} from '../types';
import { logout } from './userAction';

export const movieList = () => async (dispatch) => {
  try {
    dispatch({
      type: MOVIE_LIST_REQUEST,
    });

    const { data } = await axios.get(`/api/movierent`);

    dispatch({
      type: MOVIE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: MOVIE_LIST_FAIL,
      payload: message,
    });
  }
};

export const showMovie = (data) => async (dispatch) => {
  dispatch({ type: MOVIE_SHOW, payload: data });
};

export const getMovieDetails =
  ({ id }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: MOVIE_DETAILS_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`/api/movierent/orders/${id}`, config);

      dispatch({
        type: MOVIE_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: MOVIE_DETAILS_FAIL,
        payload: message,
      });
    }
  };

export const createMovieOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MOVIE_ORDER_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post(`/api/movierent/orders`, order, config);

    dispatch({
      type: MOVIE_ORDER_CREATE_SUCCESS,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: MOVIE_ORDER_CREATE_FAIL,
      payload: message,
    });
  }
};

export const listMyMovies = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: MOVIE_LIST_MY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `/api/movierent/myorders/${userInfo._id}`,
      config
    );

    dispatch({
      type: MOVIE_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: MOVIE_LIST_MY_FAIL,
      payload: message,
    });
  }
};
