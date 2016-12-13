export default class MinesGameField {
  static types = {
    MINE: 'MINE',
    EMPTY: 'EMPTY',
  };

  constructor(type = MinesGameField.types.EMPTY, value = 0) {
    this.type = type;
    this.value = value;
    this.visible = false;
  }
};