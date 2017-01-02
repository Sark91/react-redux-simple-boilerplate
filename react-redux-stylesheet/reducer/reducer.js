const {
  REGISTER_STYLESHEET,
  REGISTER_VARIABLE,
  REGISTER_METHOD,
} = require('./actionTypes');

const initialState = {
  variables: {},
  classes: {},
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case REGISTER_METHOD:
      // refresh css
      return Object.assign({}, state);

    case REGISTER_VARIABLE:
      // refresh css
      return {
        ...state,
      };

    case REGISTER_STYLESHEET:
      // rebuild css
      return {
        ...state,
      };

    default:
      return state;
  }
};

module.exports = reducer;
module.exports.initialState = initialState;