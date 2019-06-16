import boardTemplate = require('./templates/9x9board');
import { Region, Cell, Board } from './types';
import { range } from './utils';

export function sudoku9x9(elements: number[]) {
  const blockDeltas: number[] = [0, 1, 2, 9, 10, 11, 18, 19, 20];
  const blockStarts: number[] = [0, 3, 6, 27, 30, 33, 54, 57, 60];

  let board = new Board;
  range(9).forEach((i) => {
    let region = new Region;
    region.name = "Row " + (i+1);
    region.cell_indexes = new Set(range(9).map((j) => j+i*9));
    board.regions.push(region);

    region = new Region;
    region.name = "Column " + (i+1);
    region.cell_indexes = new Set(range(9).map((j) => i+j*9));
    board.regions.push(region);

    region = new Region;
    region.name = "Block " + (i+1);
    region.cell_indexes = new Set(blockDeltas.map((j) => j+blockStarts[i]));
    board.regions.push(region);
  });

  board.cells = elements.map((i) => {
    let cell = new Cell;
    if (i > 0)
      cell.possibilities = new Set([i]);
    else
      cell.possibilities = new Set();
    return cell;
  });

  board.toHtml = boardTemplate;

  return board;
}
