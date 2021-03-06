import { sudoku9x9 } from './boardTypes';
import { Region, Cell, Board } from './types';
import { union, difference, notEmpty } from './utils';
import { pencilInitial, removeImpossibilities, lastCandidate } from './strategies';
import { slide, slideshow } from './templates/slideshow';

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

let testLastCandidate = [
  1, 2, 3, 4, 5, 6, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 8, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 8,
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
let strategies = [pencilInitial, removeImpossibilities, lastCandidate];

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

let slides: JSX.Element[] = [slide("Initial board", initialBoard.toHtml(initialBoard, initialBoard))];
let previousBoard = initialBoard;
for (let [text, board, region] of boards) {
  slides.push(slide(text, board.toHtml(previousBoard, board, region)));
  previousBoard = board;
}
slides.push(slide("Final board", board.toHtml(board, board)));

console.log(slideshow("Sudoku solver", slides));
