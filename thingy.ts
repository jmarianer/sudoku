import { Region, Cell, Board } from './types';

function union<T>(xs: Set<T>, ...yss: Set<T>[]) {
  return new Set(
    yss.reduce(
      (acc, set) => acc.filter(n => set.has(n)),
      Array.from(xs)));
}


function difference<T>(xs: Set<T>, ...yss: Set<T>[]) {
  return new Set(
    yss.reduce(
      (acc, set) => acc.filter(n => !set.has(n)),
      Array.from(xs)));
}

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
    return value !== null && value !== undefined;
}

import boardTemplate = require('./templates/board');
import baseTemplate = require('./templates/base');

function cell(i: number) {
  let cell = new Cell;
  if (i > 0)
    cell.possibilities = new Set([i]);
  else
    cell.possibilities = new Set();
  return cell;
}

function display(board: Board) {
  return baseTemplate("", {title: "foo"},
    //boardTemplate(board));
    ...board.regions.map((region) => boardTemplate(board, region)));
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

let initialBoard = [
  0, 4, 0, 8, 1, 2, 0, 0, 0,
  0, 0, 0, 4, 0, 0, 0, 7, 0,
  9, 0, 1, 0, 0, 0, 2, 0, 8,
  0, 0, 3, 0, 8, 5, 4, 6, 0,
  6, 0, 8, 0, 0, 0, 9, 0, 5,
  0, 5, 9, 6, 7, 0, 8, 0, 0,
  7, 0, 2, 0, 0, 0, 3, 0, 4,
  0, 1, 0, 0, 0, 9, 0, 0, 0,
  0, 0, 0, 5, 2, 7, 0, 8, 0,
]

board.cells = initialBoard.map(cell);
let boards = [boardTemplate(board)];

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
  boards.push(boardTemplate(board));
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
      boards.push(boardTemplate(board, region));
      return true;
    }
  }

  return false;
}

initial();
while (easy()) ;

console.log(baseTemplate("", {title: "foo"}, ...boards));
