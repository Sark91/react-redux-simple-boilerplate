export default class MinesGameField {
  constructor() {
    this.value = 0;
    this.visible = false;
    this.flag = false;
    this.mine = false;
  }

  isValueVisible() {
    return this.visible;
  }

  isMine() {
    return this.mine;
  }

  isFlag() {
    return this.flag;
  }

  isEmpty() {
    return !this.isMine() && !this.isFlag();
  }
};