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

      if (map[randY][randX].isEmpty()) {
        map[randY][randX].mine = true;

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
    this.allFieldsIsHidden = true;
    this.map = map;
  }
  
  toggleFlag({row, col}) {
    const field = this.map[row][col];
    field.flag = !field.flag;
  }
  
  
  toggleField({row, col}) {
    const map = this.map;
    const field = map[row][col];

    if (field.isMine()) {
      if (this.allFieldsIsHidden) {

        // reinit map if first click is on mine to prevent from die on first click
        // its stupid, because if youre unlucky, you can wait and wait
        //@todo: change this to random map after first click
        this.initMap({
          width: this.width,
          height: this.height,
          mines: this.mines,
        });

        this.toggleField({ row, col });

        return;
      }

      throw new Error('You died');
    }

    field.visible = true;
    this.allFieldsIsHidden = false;
    this.fields--;

    const startY = Math.max(0, row - 1);
    const endY = Math.min(this.height - 1, row + 1);

    const startX = Math.max(0, col - 1);
    const endX = Math.min(this.width - 1, col + 1);

    if (!field.value) {
      for (let y = startY; y <= endY; y++) {
        for (let x = startX; x <= endX; x++) {
          if (!map[y][x].isValueVisible() && map[y][x].isEmpty()) {
            this.toggleField({ row: y, col: x });
          }
        }
      }
    }
  }
}
