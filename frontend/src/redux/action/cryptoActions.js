import axios from 'axios';
import {
  ADD_COIN_PORTFOLIO_FAIL,
  ADD_COIN_PORTFOLIO_REQUEST,
  ADD_COIN_PORTFOLIO_SUCCESS,
  CHART_FAIL,
  CHART_REQUEST,
  COIN_LIST_MY_FAIL,
  COIN_LIST_MY_REQUEST,
  COIN_LIST_MY_SUCCESS,
  CRYPTO_DETAILS_FAIL,
  CRYPTO_DETAILS_REQUEST,
  CRYPTO_DETAILS_SUCCESS,
  CRYPTO_LIST_FAIL,
  CRYPTO_LIST_REQUEST,
  CRYPTO_LIST_SUCCESS,
  DAY_CHART_SUCCESS,
  MONTH_CHART_SUCCESS,
  WEEK_CHART_SUCCESS,
} from '../constants/crypto';
import { logout } from './userAction';

export const cryptoList = () => async (dispatch) => {
  try {
    dispatch({
      type: CRYPTO_LIST_REQUEST,
    });

    const { data } = await axios.get(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc'
    );

    dispatch({
      type: CRYPTO_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: CRYPTO_LIST_FAIL,
      payload: message,
    });
  }
};

export const getCryptoDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: CRYPTO_DETAILS_REQUEST,
    });
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}`
    );

    dispatch({
      type: CRYPTO_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: CRYPTO_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const monthChart = (id) => async (dispatch) => {
  try {
    dispatch({
      type: CHART_REQUEST,
    });
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30&interval=daily`
    );
    dispatch({
      type: MONTH_CHART_SUCCESS,
      payload: data.prices,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: CHART_FAIL,
      payload: message,
    });
  }
};

export const weekChart = (id) => async (dispatch) => {
  try {
    dispatch({
      type: CHART_REQUEST,
    });
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7&interval=daily`
    );

    dispatch({
      type: WEEK_CHART_SUCCESS,
      payload: data.prices,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: CHART_FAIL,
      payload: message,
    });
  }
};

export const dayChart = (id) => async (dispatch) => {
  try {
    dispatch({
      type: CHART_REQUEST,
    });
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=1&interval=hourly`
    );

    dispatch({
      type: DAY_CHART_SUCCESS,
      payload: data.prices,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: CHART_FAIL,
      payload: message,
    });
  }
};

export const addCoinPortfolio = (coin) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_COIN_PORTFOLIO_REQUEST,
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

    await axios.post(`/api/cryptoinfo/portfolio`, coin, config);

    dispatch({
      type: ADD_COIN_PORTFOLIO_SUCCESS,
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
      type: ADD_COIN_PORTFOLIO_FAIL,
      payload: message,
    });
  }
};

export const listMyCoins = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: COIN_LIST_MY_REQUEST,
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
      `/api/cryptoinfo/myportfolio/${userInfo._id}`,
      config
    );

    dispatch({
      type: COIN_LIST_MY_SUCCESS,
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
      type: COIN_LIST_MY_FAIL,
      payload: message,
    });
  }
};

export const getCurrentPrice = async (id) => {
  console.log(id);
  // return id;
  try {
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`
    );
    // console.log(data);

    return data[Object.keys(data)[0]]?.usd;
    // return data[Object.keys(data)[0]]?.usd;
  } catch (error) {
    console.log(error);
  }
  // console.log(data[Object.keys(data)[0]]?.usd);
};
