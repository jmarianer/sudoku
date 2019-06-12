class Region {
  cell_indexes: Set<number> = new Set();
  name: string;
}

class Cell {
  value?: number;
  possibilities: Set<number> = new Set();
}

class Board {
  cells: Cell[] = [];
  regions: Region[] = [];
}

function display(board: Board) {
  let s = "";

  for (let region of board.regions) {
    s += region.name + ":\n";
    for (let i=0; i<81; i++) {
      if (region.cell_indexes.has(i))
        s += "X";
      else
        s += "o";

      if (i % 9 == 8)
        s += "\n";
    }
    s += "\n";
  }

  return s;
}

const range9: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const block: number[] = [0, 1, 2, 9, 10, 11, 18, 19, 20];
const block_start: number[] = [0, 3, 6, 27, 30, 33, 54, 57, 60];

let board = new Board;
for (let i = 0; i < 9; i++) {
  let region = new Region;
  region.name = "Row " + i;
  region.cell_indexes = new Set(range9.map((j)=>j+i*9));
  board.regions.push(region);

  region = new Region;
  region.name = "Column " + i;
  region.cell_indexes = new Set(range9.map((j)=>i+j*9));
  board.regions.push(region);

  region = new Region;
  region.name = "Block " + i;
  region.cell_indexes = new Set(block.map((j)=>j+block_start[i]));
  board.regions.push(region);
}

console.log(display(board));
