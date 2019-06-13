import { Region, Cell, Board } from '../types';
import * as React from './noreact';

const possCells: number[][] = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
function cellToTd(cell: Cell, className: string, r: number, c: number) {
  className += " r" + r + " c" + c
  if (cell.possibilities.size == 1) {
    return <td class={ className }>{Array.from(cell.possibilities.values())[0]}</td>
  }
  return <td class={ className }>
    <table class="possibilities">
    { possCells.map((row) =>
      <tr>
      { row.map((poss) =>
        <td> { cell.possibilities.has(poss) ? poss : "" } </td>
      )}
      </tr>
    )}
    </table>
  </td>;
}

const range9: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const boardCells: number[][] = range9.map((i)=>range9.map((j)=>i*9+j));

export = (board: Board, region?: Region) =>
  <table class="sudoku">
  { boardCells.map((row, r) =>
    <tr>
    { row.map((index, c) =>
      cellToTd(board.cells[index],
        (region && region.cell_indexes.has(index)) ? "highlighted" : "",
        r, c)) }
    </tr>
  )}
  </table>;
