import { sudoku9x9 } from './boardTypes';
import { Region, Cell, Board } from './types';
import { union, difference, notEmpty } from './utils';
import baseTemplate = require('./templates/base');

let easyBoard = [
  0, 4, 0, 8, 1, 2, 0, 0, 0,
  0, 0, 0, 4, 0, 0, 0, 7, 0,
  9, 0, 1, 0, 0, 0, 2, 0, 8,
  0, 0, 3, 0, 8, 5, 4, 6, 0,
  6, 0, 8, 0, 0, 0, 9, 0, 5,
  0, 5, 9, 6, 7, 0, 8, 0, 0,
  7, 0, 2, 0, 0, 0, 3, 0, 4,
  0, 1, 0, 0, 0, 9, 0, 0, 0,
  0, 0, 0, 5, 2, 7, 0, 8, 0,
];

let hardBoard = [
  2, 0, 0, 8, 0, 0, 0, 0, 9,
  0, 7, 0, 0, 0, 0, 0, 5, 0,
  0, 0, 0, 0, 1, 4, 0, 0, 2,
  6, 0, 0, 0, 0, 0, 0, 2, 0,
  8, 0, 2, 5, 3, 9, 6, 0, 4,
  0, 3, 0, 0, 0, 0, 0, 0, 8,
  9, 0, 0, 3, 2, 0, 0, 0, 0,
  0, 5, 0, 0, 0, 0, 0, 1, 0,
  1, 0, 0, 0, 0, 8, 0, 0, 3,
];

let board = sudoku9x9(easyBoard);
let boards = [board.toHtml(board)];

function getUsedNums(board: Board, region: Region) {
  return new Set(
    Array.from(region.cell_indexes)
    .map((index) => board.cells[index].value())
    .filter(notEmpty));
}

function initial() {
  board.cells.forEach((cell, index) => {
    if (cell.hasValue())
      return;
    let poss = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    for (let region of board.regions) {
      if (region.cell_indexes.has(index)) {
        poss = difference(poss, getUsedNums(board, region));
      }
    }
    cell.possibilities = poss;
  });
  boards.push(board.toHtml(board));
  return true;
}

function easy() {
  let ret = false;
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
      boards.push(board.toHtml(board, region));
      return true;
    }
  }

  return false;
}

initial();
while (easy()) ;

console.log(baseTemplate("", {title: "foo"}, ...boards));
