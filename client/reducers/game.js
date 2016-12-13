import {
  NEW_GAME,
  PROC_CELL,
  FLAG_CELL,
} from 'client/reducers/actionTypes';

import MinesGame from 'common/MinesGame/MinesGame';

const game = new MinesGame();

export const initialState = {
  gameStarted: false,
  map: [],
};

const reducer = (state = initialState, action = null) => {
  switch (action.type) {
    case NEW_GAME:
      game.initMap(action.payload);

      return {
        ...state,
        map: [...game.map],
      };

    case PROC_CELL:
      game.toggleField(action.payload);

      return {
        ...state,
        map: [...game.map],
      };

    case FLAG_CELL:
      game.toggleFlag(action.payload);

      return {
        ...state,
        map: [...game.map],
      };

    default:
      return state;
  }
};

export default reducer;