import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from './reducers/userReducer';
import {
  movieCreditsReducer,
  movieDetailsReducer,
  movieListMyReducer,
  movieListReducer,
  movieOrderCreateReducer,
  movieReturnReducer,
} from './reducers/movierentReducer';

const reducer = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,

  movieCredits: movieCreditsReducer,
  movieList: movieListReducer,
  movieListMy: movieListMyReducer,
  movieOrderCreate: movieOrderCreateReducer,
  movieDetails: movieDetailsReducer,
  returnMovie: movieReturnReducer,
});

const movieFromStorage = localStorage.getItem('chosenMovie')
  ? JSON.parse(localStorage.getItem('chosenMovie'))
  : [];

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  movieDetails: { movie: movieFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
