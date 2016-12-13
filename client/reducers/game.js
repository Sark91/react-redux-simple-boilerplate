import {
  NEW_GAME,
  PROC_CELL,
} from 'client/reducers/actionTypes';

import MinesGame from 'common/MinesGame/MinesGame';

import _ from 'lodash';

let game = new MinesGame();

export const initialState = {
  gameStarted: false,
  map: [],
};

const reducer = (state = initialState, action = null) => {
  switch (action.type) {
    case NEW_GAME:
      game.initMap(action.payload);
      console.log(game);
      
      return {
        ...state,
        map: game.map,
      };

    case PROC_CELL:
      game.toggleField(action.payload);

      return {
        ...state,
        map: [...game.map],
      };

    default:
      return state;
  }
};

export default reducer;