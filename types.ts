// tslint:disable:max-classes-per-file

export class Region {
  cell_indexes: Set<number> = new Set();
  name: string;
}

export class Cell {
  value?: number;
  possibilities: Set<number> = new Set();
}

export class Board {
  cells: Cell[] = [];
  regions: Region[] = [];
}
