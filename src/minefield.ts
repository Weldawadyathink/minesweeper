export interface Cell {
  isBomb: boolean;
  isSwept: boolean;
  isFlagged: boolean;
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
          isFlagged: false,
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
    // Does nothing if value is outside of grid array
    if (x < 0 || x > this.grid.length - 1) {
      return this;
    }
    if (y < 0 || y > this.grid.length - 1) {
      return this;
    }
    if (this.grid[x][y] === undefined) {
      return this;
    }

    // Does nothing if cell is already flagged
    if (this.grid[x][y].isFlagged) {
      return this;
    }

    // Does nothing if cell is already swept
    if (this.grid[x][y].isSwept) {
      return this;
    }

    this.grid[x][y].isSwept = true;

    if (this.grid[x][y].isBomb) {
      return this;
    }

    if (this.grid[x][y].surroundingBombs === 0) {
      for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
          this.sweep(i, j);
        }
      }
    }

    return this;
  }

  public toggleFlag(x: number, y: number) {
    // Does nothing if value is outside of grid array
    if (x < 0 || x > this.grid.length - 1) {
      return this;
    }
    if (y < 0 || y > this.grid.length - 1) {
      return this;
    }
    if (this.grid[x][y] === undefined) {
      return this;
    }

    if (!this.grid[x][y].isSwept) {
      this.grid[x][y].isFlagged = !this.grid[x][y].isFlagged;
    }

    return this;
  }
}
