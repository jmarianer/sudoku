// tslint:disable:max-classes-per-file
import * as React from './templates/noreact';

export class Region {
  cell_indexes: Set<number> = new Set();
  name: string;

  clone() {
    let that = new Region;
    that.cell_indexes = new Set(this.cell_indexes);
    that.name = this.name;
    return that;
  }
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
  clone() {
    let that = new Cell;
    that.possibilities = new Set(this.possibilities);
    return that;
  }
}

export class Board {
  cells: Cell[] = [];
  regions: Region[] = [];
  toHtml: (pb: Board, b: Board, r?: Region) => JSX.Element;

  clone() {
    let that = new Board;
    that.cells = this.cells.map(c => c.clone());
    that.regions = this.regions.map(r => r.clone());
    that.toHtml = this.toHtml;
    return that;
  }
}
