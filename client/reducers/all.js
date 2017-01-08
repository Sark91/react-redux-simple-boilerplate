import { createStore, combineReducers } from 'redux';

export default createStore(
  combineReducers({
    debugReducer: (state = {}, action = null) => {
      // eslint-disable-next-line no-console
      console.log(action.type, action, state);
      return state;
    },
  }),
  window.__data,
);
