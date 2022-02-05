import {
  CRYPTO_LIST_FAIL,
  CRYPTO_LIST_REQUEST,
  CRYPTO_LIST_RESET,
  CRYPTO_LIST_SUCCESS,
} from '../constants/crypto';

export const cryptoListReducer = (state = { cryptos: [] }, action) => {
  switch (action.type) {
    case CRYPTO_LIST_REQUEST:
      return { loading: true };

    case CRYPTO_LIST_SUCCESS:
      return { loading: false, cryptos: action.payload };

    case CRYPTO_LIST_FAIL:
      return { loading: false, error: action.payload };

    case CRYPTO_LIST_RESET:
      return { cryptos: [] };

    default:
      return state;
  }
};
