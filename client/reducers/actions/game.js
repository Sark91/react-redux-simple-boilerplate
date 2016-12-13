import {
  NEW_GAME,
  PROC_CELL,
  FLAG_CELL,
} from 'client/reducers/actionTypes';

export const newGame = (width, height, mines) => ({
  type: NEW_GAME,
  payload: { width, height, mines },
});

export const procCell = (row, col) => ({
  type: PROC_CELL,
  payload: { row, col },
});

export const flagCell = (row, col) => ({
  type: FLAG_CELL,
  payload: { row, col },
});
