import {
  ADD_COIN_PORTFOLIO_FAIL,
  ADD_COIN_PORTFOLIO_REQUEST,
  ADD_COIN_PORTFOLIO_RESET,
  ADD_COIN_PORTFOLIO_SUCCESS,
  CHART_FAIL,
  CHART_REQUEST,
  COIN_LIST_MY_FAIL,
  COIN_LIST_MY_REQUEST,
  COIN_LIST_MY_RESET,
  COIN_LIST_MY_SUCCESS,
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

export const addCoinPortfolioReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_COIN_PORTFOLIO_REQUEST:
      return { loading: true };

    case ADD_COIN_PORTFOLIO_SUCCESS:
      return { loading: false, success: true, coin: action.payload };

    case ADD_COIN_PORTFOLIO_FAIL:
      return { loading: false, error: action.payload };

    case ADD_COIN_PORTFOLIO_RESET:
      return {};

    default:
      return state;
  }
};

export const coinListMyReducer = (state = { coins: [] }, action) => {
  switch (action.type) {
    case COIN_LIST_MY_REQUEST:
      return { loading: true };

    case COIN_LIST_MY_SUCCESS:
      return { loading: false, coins: action.payload };

    case COIN_LIST_MY_FAIL:
      return { loading: false, error: action.payload };

    case COIN_LIST_MY_RESET:
      return { coins: [] };

    default:
      return state;
  }
};
