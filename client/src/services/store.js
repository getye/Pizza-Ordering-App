import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import userReducer from './reducer'; // Import your reducer

// Combine reducers if you have more than one reducer
const rootReducer = combineReducers({
  user: userReducer,
});

// Create the Redux store with middleware
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
