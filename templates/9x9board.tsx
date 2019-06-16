import { Region, Cell, Board } from '../types';
import { range } from '../utils';
import * as React from './noreact';

const possCells: number[][] = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
function cellToTd(previousCell: Cell, cell: Cell, className: string, r: number, c: number) {
  className += " r" + r + " c" + c
  if (cell.hasValue() && previousCell.hasValue()) {
    return <td class={ className }>{ cell.value() }</td>
  }
  return <td class={ className }>
    <table class="possibilities">
    { possCells.map((row) =>
      <tr>
      { row.map((poss) =>
        <td>
        { cell.possibilities.has(poss) ? poss :
          previousCell.possibilities.has(poss) ? poss + "&#x338;" :
          "" }
        </td>
      )}
      </tr>
    )}
    </table>
  </td>;
}

const boardCells: number[][] = range(9).map((i) => range(9).map((j) => i*9+j));

export = (previousBoard: Board, board: Board, region?: Region) =>
  <table class="sudoku">
  { boardCells.map((row, r) =>
    <tr>
    { row.map((index, c) =>
      cellToTd(previousBoard.cells[index], board.cells[index],
        (region && region.cell_indexes.has(index)) ? "highlighted" : "",
        r, c)) }
    </tr>
  )}
  </table>;
