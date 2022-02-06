import {
  CHART_FAIL,
  CHART_REQUEST,
  CRYPTO_DETAILS_FAIL,
  CRYPTO_DETAILS_REQUEST,
  CRYPTO_DETAILS_SUCCESS,
  CRYPTO_LIST_FAIL,
  CRYPTO_LIST_REQUEST,
  CRYPTO_LIST_RESET,
  CRYPTO_LIST_SUCCESS,
  DAY_CHART_SUCCESS,
  MONTH_CHART_SUCCESS,
  WEEK_CHART_SUCCESS,
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

export const cryptoDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case CRYPTO_DETAILS_REQUEST:
      return { loading: true };

    case CRYPTO_DETAILS_SUCCESS:
      return { loading: false, crypto: action.payload };

    case CRYPTO_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const cryptoChartsReducer = (
  state = { month: {}, week: {}, day: {} },
  action
) => {
  switch (action.type) {
    case CHART_REQUEST:
      return { loading: true };

    case MONTH_CHART_SUCCESS:
      return { ...state, loading: false, month: action.payload };

    case WEEK_CHART_SUCCESS:
      return { ...state, loading: false, week: action.payload };

    case DAY_CHART_SUCCESS:
      return { ...state, loading: false, day: action.payload };

    case CHART_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};