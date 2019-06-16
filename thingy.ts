import { sudoku9x9 } from './boardTypes';
import { Region, Cell, Board } from './types';
import { union, difference, notEmpty } from './utils';
import { pencilInitial, removeImpossibilities } from './strategies';
import baseTemplate = require('./templates/base');
import header = require('./templates/header');

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

let initialBoard = sudoku9x9(hardBoard);

let boards: [string, Board, Region?][] = [];
let strategies = [pencilInitial, removeImpossibilities];

let board = initialBoard.clone();
let changed = true;
while (changed) {
  changed = false;
  for (let strategy of strategies) {
    let strategyOut = strategy(board);
    if (notEmpty(strategyOut)) {
      let [text, newBoard, region] = strategyOut;
      board = newBoard.clone();
      boards.push([text, newBoard, region]);
      changed = true;
      break;
    }
  }
}

let html = boards.map(([text, board, region]) => [header(text), board.toHtml(board, region)]);

console.log(baseTemplate("", {title: "Sudoku solver"},
  header("Initial board"),
  initialBoard.toHtml(initialBoard),
  ...Array.prototype.concat.apply(html)));
