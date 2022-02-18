import {
  NEWS_LIST_FAIL,
  NEWS_LIST_REQUEST,
  NEWS_LIST_SUCCESS,
  SEARCH_NEWS_FAIL,
  SEARCH_NEWS_REQUEST,
  SEARCH_NEWS_SUCCESS,
} from '../constants/news';

export const newsListReducer = (state = { news: [] }, action) => {
  switch (action.type) {
    case NEWS_LIST_REQUEST:
      return { loading: true, news: [] };
    case NEWS_LIST_SUCCESS:
      return { loading: false, news: action.payload };
    case NEWS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const searchNewsReducer = (state = { news: [] }, action) => {
  switch (action.type) {
    case SEARCH_NEWS_REQUEST:
      return { loading: true, news: [] };
    case SEARCH_NEWS_SUCCESS:
      return { loading: false, news: action.payload };
    case SEARCH_NEWS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
