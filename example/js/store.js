import {applyMiddleware, combineReducers, createStore} from 'redux';
import logger from 'redux-logger'
//import thunk from 'redux-thunk';

import chat from './reducers/user'


const rootReducer = combineReducers({
  chat
});

const middlewares = [
//  thunk,
  logger
]

const store = createStore(
  rootReducer,
  applyMiddleware(...middlewares),
);


export default store