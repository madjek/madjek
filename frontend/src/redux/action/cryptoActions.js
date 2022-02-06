import axios from 'axios';
import {
  CHART_FAIL,
  CHART_REQUEST,
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
    console.log('ID ' + id);
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

const formatData = (data) => {
  return data.map((el) => {
    return {
      t: el[0],
      y: el[1].toFixed(2),
    };
  });
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
