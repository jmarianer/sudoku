// tslint:disable:max-classes-per-file

export class Region {
  cell_indexes: Set<number> = new Set();
  name: string;
}

export class Cell {
  possibilities: Set<number> = new Set();
  hasValue() {
    return (this.possibilities.size == 1);
  }
  value() {
    if (this.possibilities.size == 1) {
      return Array.from(this.possibilities.values())[0]
    }
  }
}

export class Board {
  cells: Cell[] = [];
  regions: Region[] = [];
}
