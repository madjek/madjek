import axios from 'axios';
import {
  CRYPTO_LIST_FAIL,
  CRYPTO_LIST_REQUEST,
  CRYPTO_LIST_SUCCESS,
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
