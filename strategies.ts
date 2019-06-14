import { Region, Cell, Board } from './types';
import { union, difference, notEmpty } from './utils';

function getUsedNums(board: Board, region: Region) {
  return new Set(
    Array.from(region.cell_indexes)
    .map((index) => board.cells[index].value())
    .filter(notEmpty));
}

export function pencilInitial(board: Board): [string, Board, Region | undefined] | undefined {
  if (board.cells.every(cell => cell.possibilities.size > 0))
    return;

  board.cells.forEach((cell, index) => {
    if (cell.hasValue())
      return;

    let poss = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    // TODO: Rewrite functionally
    for (let region of board.regions) {
      if (region.cell_indexes.has(index)) {
        poss = difference(poss, getUsedNums(board, region));
      }
    }
    cell.possibilities = poss;
  });
  return ["Pencil in all values", board, undefined];
}

export function removeImpossibilities(board: Board): [string, Board, Region] | undefined {
  for (let region of board.regions) {
    let usedNums = getUsedNums(board, region);
    let changed = false;

    for (let index of Array.from(region.cell_indexes)) {
      let cell = board.cells[index]
      if (!cell.hasValue()) {
        if (union(cell.possibilities, usedNums).size > 0) {
          changed = true;
          cell.possibilities = difference(cell.possibilities, usedNums);
        }
      }
    }

    if (changed) {
      return ["Remove impossibilities from " + region.name, board, region];
    }
  }
}
