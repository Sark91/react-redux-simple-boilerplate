import MinesGameField from './MinesGameField';

export default class MinesGame {
  constructor() {
    this.map = [];
  }

  initMap({width, height, mines}) {
    const map = [];
    const targetWidth = parseInt(width);
    const targetHeight = parseInt(height);
    let minesToEnd = Math.min(width * height, Math.max(parseInt(mines), 1));

    for (let y = 0; y < targetHeight; y++) {
      const row = [];

      for (let x = 0; x < targetWidth; x++) {
        row.push(new MinesGameField());
      }

      map.push(row);
    }

    while (minesToEnd) {
      const randX = parseInt(Math.random() * width);
      const randY = parseInt(Math.random() * height);

      if (map[randY][randX].type === MinesGameField.types.EMPTY) {
        map[randY][randX].type = MinesGameField.types.MINE;

        for (let y = randY - 1; y !== randY + 2; y++) {
          for (let x = randX - 1; x !== randX + 2; x++) {
            if (map[y] && map[y][x]) {
              map[y][x].value++;
            }
          }
        }

        minesToEnd--;
      }
    }

    this.width = targetWidth;
    this.height = targetHeight;
    this.mines = mines;
    this.fields = targetHeight * targetWidth;
    this.map = map;
  }
  
  toggleField({row, col}) {
    const map = this.map;
    const field = map[row][col];

    if (field.type === MinesGameField.types.MINE) {
      throw new Error('You died');
    }

    field.visible = true;
    this.fields--;

    let y = Math.max(0, row - 1);
    const endY = Math.min(this.height - 1, row + 1);

    let x = Math.max(0, col - 1);
    const endX = Math.min(this.width - 1, col + 1);

    // debugger;
    if (!field.value) {
      for (; y <= endY; y++) {
        if (!map[y][col].visible && map[y][col].type === MinesGameField.types.EMPTY) {
          this.toggleField({row: y, col});
        }
      }

      for (; x <= endX; x++) {
        if (!map[row][x].visible && map[row][x].type === MinesGameField.types.EMPTY) {
          this.toggleField({row, col: x});
        }
      }
    }
  }
}