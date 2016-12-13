import { reducer as reduxAsyncConnect } from 'redux-async-connect';
import { createStore, combineReducers } from 'redux';
import game from 'client/reducers/game';

export default createStore(
  combineReducers({
    reduxAsyncConnect,
    game,
    debugReducer: (state = {}, action = null) => {
      console.log(action.type, action, state);
      return state;
    },
  }),
  window.__data
);
