import axios from 'axios';
import {
  NEWS_LIST_FAIL,
  NEWS_LIST_REQUEST,
  NEWS_LIST_SUCCESS,
  SEARCH_NEWS_FAIL,
  SEARCH_NEWS_REQUEST,
  SEARCH_NEWS_SUCCESS,
} from '../constants/news';

export const listNews = (city, lang) => async (dispatch) => {
  try {
    dispatch({ type: NEWS_LIST_REQUEST });

    const config = {
      headers: {
        'x-rapidapi-host': 'free-news.p.rapidapi.com',
        'x-rapidapi-key': process.env.REACT_APP_X_RAPIDAPI_KEY,
      },
    };

    const { data } = await axios.get(
      `https://free-news.p.rapidapi.com/v1/search?q=${city}&lang=${lang}&page=1&page_size=24`,
      config
    );

    dispatch({
      type: NEWS_LIST_SUCCESS,
      payload: data.articles,
    });
  } catch (error) {
    dispatch({
      type: NEWS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const searchNews = (query, lang) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_NEWS_REQUEST });

    const config = {
      headers: {
        'x-rapidapi-host': 'free-news.p.rapidapi.com',
        'x-rapidapi-key': process.env.REACT_APP_X_RAPIDAPI_KEY,
      },
    };

    const { data } = await axios.get(
      `https://free-news.p.rapidapi.com/v1/search?q=${query}&lang=${lang}&page=1&page_size=24`,
      config
    );

    dispatch({
      type: SEARCH_NEWS_SUCCESS,
      payload: data.articles,
    });
  } catch (error) {
    dispatch({
      type: SEARCH_NEWS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
