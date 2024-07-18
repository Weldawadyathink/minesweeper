interface Cell {
  isBomb: boolean;
  isSwept: boolean;
  surroundingBombs: number;
}

export class MineField {
  grid: Array<Array<Cell>>;

  constructor(sizex: number = 0, sizey: number = 0, bombCount: number = 0) {
    this.grid = new Array(sizex);
    for (let i = 0; i < sizex; i++) {
      this.grid[i] = new Array(sizey);
      for (let j = 0; j < sizey; j++) {
        this.grid[i][j] = {
          isBomb: false,
          isSwept: false,
          surroundingBombs: 0,
        };
      }
    }

    // Randomly place bombs on the grid
    for (let b = 0; b < bombCount; ) {
      const x = Math.floor(Math.random() * sizex),
        y = Math.floor(Math.random() * sizey);

      if (!this.grid[x][y].isBomb) {
        this.grid[x][y].isBomb = true;
        b++;
      }
    }

    // Calculate the number of surrounding bombs for each cell
    for (let i = 0; i < sizex; i++) {
      for (let j = 0; j < sizey; j++) {
        if (this.grid[i][j].isBomb) continue;

        let count = 0;
        for (const x of [i - 1, i, i + 1]) {
          for (const y of [j - 1, j, j + 1]) {
            if (x >= 0 && x < sizex && y >= 0 && y < sizey) {
              if (this.grid[x][y].isBomb) count++;
            }
          }
        }

        this.grid[i][j].surroundingBombs = count;
      }
    }
  }

  public clone() {
    const returnval = new MineField();
    returnval.grid = structuredClone(this.grid);
    return returnval;
  }

  public sweep(x: number, y: number) {
    const game = this.clone();
    game.grid[x][y].isSwept = true;
    return game;
  }
}
